import { useState, useEffect } from 'react'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import { generateSGDateTimeForPaymentRequestRef, SUB_STATUS } from '../../controller/Variables'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton'
import SubscribtionController from '../../controller/SubscribtionController'

import { GoAlertFill } from '../../../public/Icons.js'
import '../../BO_pages/SubsManagement/SubsMgts.css'
import '../../../public/styles/common.css'

interface SubsPlansProps {
    displaySubsPlans: boolean;
    onSubsPlans: any;
    currentPlan?: any;
    company: any;
    user: any;
    updateCancelSubs?: (updatedData: any) => void;
}

const { getSubsPlans, makeSubsPayment, cancelSubscription } = SubscribtionController

const SubsPlan = ({ 
    displaySubsPlans = false, onSubsPlans, user, company, updateCancelSubs
}: SubsPlansProps) => {
    const { showAlert } = useAlert();
    const [ allSubsPlans, setAllSubsPlans ] = useState<any[]>([]);
    const [ selectedPlan, setSelectedPlan ] = useState<any>();
    const [ employeeLength, setEmployeeLength ] = useState<number>(0);
    const [ reasonOfUnsubscribe, setReasonOfUnsubscribe ] = useState<string>('')
    const [ showConfirmation, setShowConfirmation ] = useState(false);

    const fetchSubsPlans = async() => {
        try {
            let data = await getSubsPlans();
            data = data.SubscriptionPlan
            // console.log(data)
            setAllSubsPlans(data)
        } catch (error) {
            showAlert(
                "fetchSubsPlans",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )   
        }
    }
    useEffect(() => { fetchSubsPlans() }, [displaySubsPlans, user])

    // Prompt user confirmation for update
    function toggleConfirmation (plan: any) {
        setSelectedPlan(plan)
        setShowConfirmation(!showConfirmation)
    }

    const triggerCreatePaymentRequest = async() => {
        try {
            const today = generateSGDateTimeForPaymentRequestRef(new Date ())
            const ref = today + company.UEN
            const response = await makeSubsPayment(
                ref, selectedPlan.price, user.email, company, 
                onSubsPlans.cID, selectedPlan.subscription_plan_id
            )
            console.log(response)
        } catch(error) {
            showAlert(
                "triggerMakePayment",
                "Payment Request Create Error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            ) 
        }
    }

    const triggerCancelSubscription = async() => {
        try {
            const response = await cancelSubscription(onSubsPlans.subsTransID, reasonOfUnsubscribe)
            // console.log(response)
            if(response.message === 'Subscription Transaction Status successfully cancelled') {
                const updatedData = {
                    ...onSubsPlans,
                    subsStatus: SUB_STATUS[3],
                    reasonOfCancel: reasonOfUnsubscribe
                }
                toggleConfirmation([])
                showAlert(
                    "Subscription Plan Cancelled",
                    `${reasonOfUnsubscribe}`,
                    ``,
                    { type: 'success' }
                );
                if(updateCancelSubs)
                    updateCancelSubs(updatedData)
            }

        } catch(error) {
            showAlert(
                "triggerCancelSubscription",
                "Cancel Subscription Plan Error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            ) 
        }
    }

    if (showConfirmation && selectedPlan) return (
        <div className="App-popup" onClick={() => toggleConfirmation({})}>
            <div className="App-popup-prompt-content confirm-create-edit-emp-completion" onClick={(e) => e.stopPropagation()}>
                {selectedPlan.price === "0.00" ? (
                    <>
                    <h3 className="App-prompt-confirmation-title App-header">
                        Confirm Unsubscribe?
                    </h3>
                    <span className='subs-plan-warning-message-text'>
                        <GoAlertFill />
                        All employees beyond the first 5 will be suspended.
                    </span>
                    <input type='text' 
                        placeholder='Reason of Unsubscribe' 
                        value={reasonOfUnsubscribe}
                        onChange={(e) => setReasonOfUnsubscribe(e.target.value)}
                        required
                    />
                    </>
                ) : (
                    <>
                    <h3 className="App-prompt-confirmation-title App-header">
                        {selectedPlan.subscription_name}
                    </h3>
                    <span>{selectedPlan.subscription_plan_description}</span>
                    </>
                )}
                {selectedPlan.subscription_name === 'Basic Plan' && employeeLength > 20 && (
                    <span className='subs-plan-warning-message-text'>
                        <GoAlertFill />
                        All employees beyond the first 20 will be suspended.
                    </span>
                )}
                <div className="btns-grp">
                    {selectedPlan.price === "0.00" ? (
                        <PrimaryButton 
                            text="Confirm" 
                            disabled={!reasonOfUnsubscribe}
                            onClick={() => triggerCancelSubscription()}
                        />
                    ) : (
                        <PrimaryButton 
                            text="Confirm" 
                            onClick={() => triggerCreatePaymentRequest()}
                        />
                    )}
                    <SecondaryButton 
                        text="Cancel" 
                        onClick={() => toggleConfirmation({})}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <>
        {(allSubsPlans && company) ? (
            <div className='subscription-plan-container'>
                <h3 className='App-header'>Subscription Plans</h3>
                <div className="subs-plan-container">
                    {allSubsPlans.map((subsPlan: any, index: number) => (
                        <div key={subsPlan.subsPlanID} 
                            className={`subs-plan-detail 
                                        ${index % 2 === 1 ? 'odd-row' : ''}`}
                            onClick={() => toggleConfirmation(subsPlan)}
                        >
                            <h4>{subsPlan.subscription_name}</h4> 
                            <p className="main-data">{subsPlan.subscription_plan_description}</p>
                        </div>
                    ))}
                </div>
            </div>
        ):(<p>Loading...</p>)}
        </>
    )
}

export default SubsPlan