import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import SubsPlan from '../../BO_components/SubsPlan/SubsPlan'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import SubscribtionController from '../../controller/SubscribtionController'

import { FaChevronCircleDown, FaChevronCircleUp } from '../../../public/Icons.js'
import './SubsMgts.css'
import '../../../public/styles/common.css'

const { boGetSubscriptionTransactions } = SubscribtionController

const SubsMgts = () => {
    const { showAlert } = useAlert();
    const { user } = useAuth();
    const [ subsTrans, setSubsTrans ] = useState<any[]>([]);
    const [ showSubsPlan, setShowSubsPlan ] = useState(false)

    const fetchBoSubsTransaction = async() => {
        try {
            let data = await boGetSubscriptionTransactions(user?.UID);
            console.log(data)

        } catch(error) {

        }
    }
    // useEffect(() => {fetchBoSubsTransaction()}, [user])

    function toggleShowSubsPlan() {
        setShowSubsPlan(!showSubsPlan)
    }

    // if(showSubsPlan) return (<SubsPlan />)

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
                    user={user}
                />}
        </div>
    )
}

export default SubsMgts