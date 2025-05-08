import { useState, useEffect } from 'react'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import { formatDateTime } from '../../controller/Variables.js'
import SubsTrans_t from './components/SubsTrans_t'
import SubscribtionController from '../../controller/SubscribtionController'

import './SubsTrans.css'
import '../../../public/styles/common.css'

const { saGetSubscriptionTransactions, filterTransactionsBaseOnPlan } = SubscribtionController
const SubsTransactions = () => {
    const { showAlert } = useAlert()
    const [ allTransactions, setAllTransactions ] = useState<any>([]);
    const [ displayTrans, setDisplayTrans ] = useState<any>([])

    const fetchAllTransactions = async () => {
        try {
            let response = await saGetSubscriptionTransactions();
            // console.log(response)
            if(response.message === 'Succesfully retrieved Subscription Details'){
                response = response.SubscriptionDetails || []
                setAllTransactions(response);
                
                let filterOutFreePlan = filterTransactionsBaseOnPlan(response, 2)
                filterOutFreePlan = filterOutFreePlan || [];
                // console.log(filterOutFreePlan)

                filterOutFreePlan = filterOutFreePlan.map((trans: any) => {
                    return {
                        ...trans,
                        startDate: formatDateTime(trans.startDate),
                        endDate: formatDateTime(trans.endDate)
                    }
                })
                setDisplayTrans(filterOutFreePlan);
            }
        } catch (error) {
            showAlert(
                "fetchAllTransactions",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    };
    // Auto trigger when allRegisRequest length change
    useEffect(() => { 
        fetchAllTransactions();
    }, [allTransactions.length]); 

    return(
        <div className="App-content">
            <div className="content">
                <h1>View Subscription Transactions</h1>
                {allTransactions.length > 0 ? (
                    <>
                    <SubsTrans_t transactions={displayTrans}/>
                    </>
                ):(
                    <span>No Subscription Transactions Match...</span>
                )}
            </div>
        </div>
    )
}

export default SubsTransactions;