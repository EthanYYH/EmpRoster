import { useEffect, useState } from 'react'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import { useAuth } from '../../AuthContext'
import CompanyController from '../../controller/CompanyController'

import { FaRegBuilding } from "react-icons/fa";
import { FaRegEdit } from '../../../public/Icons.js'
import './stlye.css'
import '../../../public/styles/common.css'
import CPContents from "./CPContents"

const { getCompany } = CompanyController;

const BOCompanyProfile = () => {
    const { user } = useAuth();
    const { showAlert } = useAlert();
    const [ companyInfo, setCompanyInfo ] = useState<any>([])

    const fetchCompanyProfile = async() => {
        if (!user?.UID) return;
        try {
            const data = await getCompany(user?.UID);
            console.log(data)
            setCompanyInfo(data);
        } catch (error) {
            showAlert(
                "fetchCompanyProfile",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }
    useEffect(() => {
        if(user?.UID)
            fetchCompanyProfile();
    }, [user?.UID])

    if(!companyInfo) return "Loading..."

    return (
        <div className="content">
            <h1>My Company</h1>
            <div className="main-content">
                <div className="company-profile">
                    <div className="company-profile-title">
                        <FaRegBuilding className='company-profile-icon'/>
                        <FaRegEdit className='edit-company-profile'/>
                    </div>
                    <div className="company-profile-data uen">
                        <p className="title">UEN</p>
                        <p className="main-data">{companyInfo?.UEN}</p>
                    </div>
                    <div className="company-profile-data company-name">
                        <p className="title">Comapany Name</p>
                        <p className="main-data">{companyInfo?.bizName}</p>
                    </div>
                    <div className="company-profile-data company-address">
                        <p className="title">Address</p>
                        <p className="main-data">{companyInfo?.address}</p>
                    </div>
                    <div className="company-profile-data company-contact">
                        <p className="title">Contact Number</p>
                        <p className="main-data">{companyInfo?.contactNo}</p>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default BOCompanyProfile;