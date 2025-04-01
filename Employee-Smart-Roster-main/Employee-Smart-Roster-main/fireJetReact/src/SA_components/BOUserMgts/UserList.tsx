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
        setUser, } = UserController;
// import functions needed from CompanyController
const { getCompanies, } = CompanyController;
// import functions needed from SubscribtionController
const { getSubscriptionTransactions, 
        getSubsTransForACompany,
        getSortedSubsTransactions } = SubscribtionController;

const BOUserList = ({boUsers = []}: BOListProps) => {
    // console.log(boUsers)
    const { showAlert } = useAlert();
    const [ selectedSubsStatus, setSelectedSubsStatus ] = useState('Subscribed');
    const [ selectedAccStatus, setSelectedAccStatus ] = useState('Activated');
    const [ searchedInput, setSearchedInput ] = useState('Subscribed');
    const [ companies, setCompanies ] = useState<any>([]);
    const [ error, setError ] = useState("");

    const fetchCompaniesData = async() => {
        try{
            const companies = getCompanies();
            // setCompanies(Array.isArray(companies) ? companies : []);
            // console.log(companies);
            const transactions = getSubscriptionTransactions();
            // console.log(transactions);

            const fullCompaniesData = companies.map(company => {
                // console.log(company)
                // Get all transactions for current company
                const transactionsForACompany = getSubsTransForACompany(transactions, company.cID);
                // console.log(transactions)
                // Get latest transactions for current company
                const sortedTransactions = getSortedSubsTransactions(transactionsForACompany);
                // console.log(latestTransaction)
                const userOwnesThisCompany = getUserOwnesCompany(boUsers, company.cID)
                return {
                    ...company, // All data for current company
                    transactions: sortedTransactions, // return latest transaction
                    owner: userOwnesThisCompany, // return owner 
                }
            })
            setCompanies(Array.isArray(fullCompaniesData) ? fullCompaniesData : []);
        } catch(error) {
            setError(`${error}`);
            setCompanies([]);
        }

        if(error)
            showAlert(
                "fetchCompaniesData in BOUserList",
                '',
                error,
                { type: 'error' }
            )
    }
    // Auto trigger when companies length change
    useEffect(() => { fetchCompaniesData(); }, [companies.length]);
    // useEffect(() => {console.log(companies)})   // Debug to check the latest json Object
    
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
                <div className="dropdown-container">
                    <select 
                        value={selectedSubsStatus}
                        onChange={(e) => setSelectedSubsStatus(e.target.value)}
                    >
                    <option value="Subscribed">Subscribed</option>
                    <option value="Unsubscribed">Unsubscribed</option>
                    <option value="Cancelled Subs">Cancelled Subs</option>
                    </select>
                </div>
            </div>
            <div className="App-filter-container account-status">
                <p className='App-filter-title'>Account Status</p>
                {/* Account Status dropdown */}
                <div className="dropdown-container">
                    <select 
                        value={selectedAccStatus}
                        onChange={(e) => setSelectedAccStatus(e.target.value)}
                    >
                        <option value="Activated" className='dropdown-option'>Activated</option>
                        <option value="Suspended" className='dropdown-option'>Suspended</option>
                    </select>
                </div>
            </div>
            <div className="App-filter-container uen-company-name">
                <p className='App-filter-title'>UEN/Comapany Name</p>
                <input type='text' 
                    className='search-input'
                    placeholder='Search UEN / Company Name' 
                    onChange={(e) => setSearchedInput(e.target.value)}
                />
            </div>
        </div>
        {/* Desktop Table */}
        <BOUserList_t 
            companies={companies}
            onUpdate={handleDataUpdate} />

        {/* Tablet and Mobile Table */}
        <BOUserList_m companies={companies} />
        </>
    )
}

interface BOListProps {
    boUsers?: any;
}

export default BOUserList;