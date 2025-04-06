import { useState, useEffect } from 'react';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import CompanyController from '../../controller/CompanyController';
import SubscribtionController from '../../controller/SubscribtionController';
import UserController from '../../controller/User/UserController';
import BOUserList_t from './BOUserList_t';
import BOUserList_m from './BOUserList_m';
import './UserList.css';
import '../../../public/styles/common.css';

// import functions needed from UserController
const { getUserOwnesCompany,
        setUser,
        handleUserAccStatusFilter, } = UserController;
// import functions needed from CompanyController
const { getCompanies,
        getCompany,
        handleFilterUENBizName, } = CompanyController;
// import functions needed from SubscribtionController
const { getSubscriptionTransactions, 
        getSubsTransForACompany,
        getSortedSubsTransactions,
        handleFilterSubsStatus, } = SubscribtionController;

const SubscribingStatus = ['Subscribed', 'Pending Payment', 'Unsubscribed', 'Cancelled Subscription']
const IsAccSuspended = ['Activated', 'Suspended']

const BOUserList = ({boUsers = []}: BOListProps) => {
    // console.log(boUsers)
    const { showAlert } = useAlert();
    const [ filterSubsStatus, setFilterSubsStatus ] = useState(SubscribingStatus[0]);
    const [ filterAccStatus, setFilterAccStatus ] = useState(IsAccSuspended[0]);
    const [ filterUENOBizName, setFilterUENOBizName ] = useState('');
    const [ allCompanies, setAllCompanies ] = useState<any>([])
    const [ companies, setCompanies ] = useState<any>([]);  // Data to Display

    const fetchCompaniesData = async() => {
        if(!boUsers) return; // If no boUsers return nothing
        try{
            const companyOwnes = boUsers.map(async (user: any) => {
                try {
                    const company = await getCompany(user.UID);
                    return {
                        ...company,
                        owner: user,
                    }
                } catch(error) {
                    showAlert(
                        `Error fetching company`,
                        `UID: ${user.UID}: `,
                        {error}.toString(),
                        { type: 'error' }
                    )
                    return null;
                }
            })
            // const companies = getCompanies();
            // // setCompanies(Array.isArray(companies) ? companies : []);
            // const transactions = getSubscriptionTransactions();
            // // console.log(transactions);

            // const fullCompaniesData = companies.map(company => {
            //     // Get all transactions for current company
            //     const transactionsForACompany = getSubsTransForACompany(transactions, company.cID);
            //     // Get latest transactions for current company
            //     const sortedTransactions = getSortedSubsTransactions(transactionsForACompany);
            //     // console.log(latestTransaction)
            //     const userOwnesThisCompany = getUserOwnesCompany(boUsers, company.cID)
            //     return {
            //         ...company, // All data for current company
            //         transactions: sortedTransactions, // return latest transaction
            //         owner: userOwnesThisCompany, // return owner 
            //     }
            // })
            // setAllCompanies(Array.isArray(fullCompaniesData) ? fullCompaniesData : []);
            
        } catch(error) {
            setCompanies([]);
            showAlert(
                "Fetch Company Data Error",
                'Failed to fetch company data BOUserList',
                {error}.toString(),
                { type: 'error' }
            )
        }
    }
    // Auto trigger when companies length change
    useEffect(() => { fetchCompaniesData(); }, [boUsers]);
    // useEffect(() => {console.log(companies)})   // Debug to check the latest json Object
    
    const triggerFilterSubsStatus = async () => {
        // console.log(allCompanies)
        try {
            // Fiter with Subscribing Status
            let filtered = handleFilterSubsStatus(allCompanies, filterSubsStatus);
            // Filter with Business Owner Acc Status
            filtered = handleUserAccStatusFilter(filtered, filterAccStatus);
            // Filter with UEN or BizName
            filtered = handleFilterUENBizName(filtered, filterUENOBizName);
            setCompanies(filtered);
        } catch (error) {
            showAlert(
                "Filter Subscription / Account Status Error", 
                "Failed to apply filter", 
                {error}.toString(), 
                { type: 'error' });
        }
    }
    // Auto trigger when filter subscription status, account status, and all companies data change
    useEffect(() => { triggerFilterSubsStatus(); }, [filterSubsStatus, filterAccStatus, filterUENOBizName, allCompanies])

    const handleDataUpdate = (updatedData:any) => {
        const updatedItem = boUsers.map((data:any) => 
            data.UID === updatedData.owner[0]?.UID
            ? updatedData.owner[0]
            : data
        )
        setUser(updatedItem)
    }

    return (
        <>
        <div className="App-filter-search-component">
            <div className="App-filter-container subscription-status">
                <p className='App-filter-title'>Subscription Status</p>
                {/* Subscription Status dropdown */}
                <select 
                    value={filterSubsStatus}
                    onChange={(e) => setFilterSubsStatus(e.target.value)}
                >
                {SubscribingStatus.map(status => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
                </select>
            </div>
            <div className="App-filter-container account-status">
                <p className='App-filter-title'>Account Status</p>
                {/* Account Status dropdown */}
                <select 
                    value={filterAccStatus}
                    onChange={(e) => setFilterAccStatus(e.target.value)}
                >
                {IsAccSuspended.map(accStatus => (
                    <option key={accStatus} value={accStatus}>
                        {accStatus}
                    </option>
                ))}
                </select>
            </div>
            <div className="App-filter-container uen-company-name">
                <p className='App-filter-title'>UEN/Comapany Name</p>
                <input type='text' 
                    className='search-input'
                    placeholder='Search UEN / Company Name' 
                    onChange={(e) => setFilterUENOBizName(e.target.value)}
                />
            </div>
        </div>
        {/* Desktop Table */}
        <BOUserList_t 
            companies={companies}
            onUpdate={handleDataUpdate} />

        {/* Tablet and Mobile Table */}
        <BOUserList_m 
            companies={companies}
            onUpdate={handleDataUpdate} />
        </>
    )
}

interface BOListProps {
    boUsers?: any;
}

export default BOUserList;