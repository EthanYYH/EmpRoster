import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import { formatDateTime, SUB_STATUS } from '../../controller/Variables'
import SubsPlan from '../../BO_components/SubsPlan/SubsPlan'
import SubsTransactions_t from '../../BO_components/SubsPlan/SubTrans_t'
import SubsTransactions_m from '../../BO_components/SubsPlan/SubTrans_m'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import SubscribtionController from '../../controller/SubscribtionController'
import CompanyController from '../../controller/CompanyController'

import { GrSchedules } from "react-icons/gr";
import { FaChevronCircleDown, FaChevronCircleUp, FaRegListAlt } from '../../../public/Icons.js'
import './SubsMgts.css'
import '../../../public/styles/common.css'

const { boGetSubscriptionTransactions, getSortedSubsTransactions } = SubscribtionController
const { getCompany } = CompanyController

const SubsMgts = () => {
    const { showAlert } = useAlert();
    const { user } = useAuth();
    const [ subsTrans, setSubsTrans ] = useState<any>([]);
    const [ onSubs, setOnSubs ] = useState<any>()
    const [ company, setCompany ] = useState<any>();
    const [ showSubsPlan, setShowSubsPlan ] = useState(false)

    const fetchBoSubsTransaction = async() => {
        try {
            let company = await getCompany(user?.UID)
            // console.log(company)
            setCompany(company)

            let data = await boGetSubscriptionTransactions(company.UEN);
            data = data.BOSubscribedPlan || [];
            
            if (data.length > 0) {
                data = await getSortedSubsTransactions(data);
                // console.log("Before filter out the free plan: \n", data)
                if (data[0].subscription_name === 'Free' && data[0].startDate >= new Date()) {
                    setOnSubs(data[1])
                } else { // 
                    data = data.filter((transaction: any) => {
                        return transaction.subscription_name !== 'Free' 
                                // && transaction.subsStatus === SUB_STATUS[0]
                    })
                    // let onSubsPlan = data[0]
                    // onSubsPlan = {
                    //     ...onSubsPlan,
                    //     startDate: data[0].startDate,
                    //     endDate: data[data.length-1].endDate
                    // }
                    setOnSubs(data[0])
                    // console.log(data)
                    setSubsTrans(Array.isArray(data) ? data : [])
                }
            }
        } catch(error) {
            showAlert(
                "fetchBoSubsTransaction",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )   
        }
    }
    useEffect(() => {fetchBoSubsTransaction()}, [user])

    function toggleShowSubsPlan() {
        setShowSubsPlan(!showSubsPlan)
    }

    function handleSubsUpdate (updatedData: any) {
        const updatedItem = subsTrans.map((data:any) => 
            data.subsTransID === updatedData.subsTransID
            ? updatedData
            : data
          )
          setSubsTrans(updatedItem);
          setOnSubs(updatedData)
    }

    return (
        <div className='content'>
            <div className='sub-management-header'>
                <h1>Subscription Management</h1>
                <button className='view-subs-plan-button'
                    onClick={() => toggleShowSubsPlan()}
                >
                    {showSubsPlan ? (
                        <FaChevronCircleUp />
                    ):(
                        <FaChevronCircleDown />
                    )}
                     View Subscription Plans
                </button>
            </div>
            {showSubsPlan && 
                <SubsPlan 
                    displaySubsPlans={true}
                    onSubsPlans={onSubs}
                    user={user}
                    company={company}
                    updateCancelSubs={handleSubsUpdate}
                />
            }
            {/* Display Subscriping Plan */}
            {onSubs && (
            <div className="subscribed-plan-container card">
                <h3>Subscribed Plan: {onSubs.subscription_name}</h3>
                <div className="subscribed-plan-data plan-description even-row">
                    <p className="title"><FaRegListAlt /></p>
                    <p className="main-data">{onSubs.subscription_plan_description}</p>
                </div>
                {onSubs.subscription_name !== 'Free' && (
                    <>
                    <div className="subscribed-plan-data plan-description">
                        <p className="title"><GrSchedules /></p>
                        <p className="main-data">
                            {formatDateTime(String(onSubs.startDate))} ~&nbsp;
                            {formatDateTime(String(onSubs.endDate))}
                        </p>
                    </div>
                    </>
                )}
            </div>
            )}
            {subsTrans.length > 0 
                ? (
                <>
                    <SubsTransactions_t subsTrans={subsTrans}/>
                    <SubsTransactions_m subsTrans={subsTrans}/>
                </>
                ) : (<span>No Transaction History...</span>)
            }
        </div>
    )
}

export default SubsMgts