import { useState, useEffect } from 'react'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton'
import SubscribtionController from '../../controller/SubscribtionController'
import UserController from '../../controller/User/UserController'

import '../../BO_pages/SubsManagement/SubsMgts.css'
import '../../../public/styles/common.css'

interface SubsPlansProps {
    displaySubsPlans: boolean;
    currentPlan?: any;
    company: any;
    user: any;
}

const { getSubsPlans, makeSubsPayment } = SubscribtionController
const { boGetUserProfile } = UserController

const SubsPlan = ({ displaySubsPlans = false, user, company}: SubsPlansProps) => {
    const { showAlert } = useAlert();
    const [ allSubsPlans, setAllSubsPlans ] = useState<any[]>([]);
    const [ thisUser, setThisUser ] = useState<any>();
    const [ selectedPlan, setSelectedPlan ] = useState<any>();
    const [ showConfirmation, setShowConfirmation ] = useState(false);

    const fetchSubsPlans = async() => {
        try {
            let data = await getSubsPlans();
            data = data.SubscriptionPlan
            // console.log(data)
            setAllSubsPlans(data)

            let boProfile = await boGetUserProfile(user.UID)
            boProfile = boProfile.BOProfile
            // console.log(boProfile[0])
            setThisUser(boProfile[0])
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

    const triggerMakePayment = async() => {
        try {
            const response = await makeSubsPayment(
                selectedPlan, user.email, thisUser.fullName, company
            )
            console.log(response)

        } catch(error) {

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
                    <span>All employees will be suspended except the first 5 employee.</span>
                    </>
                ) : (
                    <>
                    <h3 className="App-prompt-confirmation-title App-header">
                        {selectedPlan.subscription_name}
                    </h3>
                    </>
                )}
                <div className="btns-grp">
                    {selectedPlan.price === "0.00" ? (
                        <PrimaryButton 
                            text="Confirm" 
                            // onClick={() => triggerUpdateEmpAcc()}
                        />
                    ) : (
                        <PrimaryButton 
                            text="Confirm" 
                            onClick={() => triggerMakePayment()}
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
        {(allSubsPlans && company && thisUser) ? (
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