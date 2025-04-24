import { useState, useEffect } from 'react';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import { formatPhoneNumber } from '../../controller/Variables.js';
import CompanyController from '../../controller/CompanyController.js';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';

import { IoClose, GoAlertFill, TiTick } from '../../../public/Icons.js'
import './EditCompanyPr.css'
import '../../../public/styles/common.css'

interface EditCompanyPrProps {
    companyData: any;
    onClose: () => void;
    onUpdate?: (updatededData: any) => void
}

const { validateVirtualPhoneNo, updateCompanyProfile } = CompanyController

const EditCompanyProfile = ({ companyData, onClose, onUpdate }: EditCompanyPrProps) => {
    // console.log(companyData)
    const { showAlert } = useAlert();
    const [ companyInfo, setCompanyInfo ] = useState<any>({
        UID: '',
        bizName: '',
        UEN: '',
        address: '',
        contactNo: '',
    });
    const [ contactErr, setContactErr ] = useState<string>('');
    const [ promptConfirmUpdateCompPr, setPromptConfirmUpdateCompPr ] = useState(false)

    // Set default value for company profile data
    useEffect(() => {
        setCompanyInfo(companyData);
    }, [companyData])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        // console.log(event)
        if (name === 'contactNo'){
            const formattedNumber = formatPhoneNumber(value)
            // console.log(formattedNumber)
            setCompanyInfo((prevData: any) => ({
                ...prevData,
                contactNo: formattedNumber,
            }))
        } else {
            setCompanyInfo((prevData: any) => ({
                ...prevData,
                [name]: [value] 
            }))
        }
    }

    function triggerPhoneValidation(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        // Format the phone number with spaces
        const formattedNumber = formatPhoneNumber(event.target.value);
        // console.log(formattedNumber)
        handleInputChange(event)

        const error = validateVirtualPhoneNo(formattedNumber);
        setContactErr(error)
    }

    function togglePromptConfirmUpdateCompPr () {
        setPromptConfirmUpdateCompPr(!promptConfirmUpdateCompPr)
    }

    //  Update Company Profile
    const triggerEditComPr = async() => {
        // Preproccessing -> If contact number is not change.
        if(companyInfo.contactNo === companyData.contactNo) {
            const formattedNumber = formatPhoneNumber(String(companyInfo.contactNo))
            setCompanyInfo((prevData: any) => ({
                ...prevData,
                contactNo: formattedNumber,
            }))
        }
        try {
            const response = await updateCompanyProfile(companyInfo)
            // console.log(response)

            if(response.message === 'Company details successfully updated') {
                if(onUpdate)
                    onUpdate(companyInfo)
                
                if(onClose)
                    onClose()

                togglePromptConfirmUpdateCompPr()
            }
        } catch (error) {
            showAlert(
                "triggerEditComPr",
                `Failed to Update Company Profile`,
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }

    if (promptConfirmUpdateCompPr) return (
        <div className="App-popup" onClick={togglePromptConfirmUpdateCompPr}>
            <div className="App-popup-prompt-content confirm-update-company-profile-container" onClick={(e) => e.stopPropagation()}>
                <h3 className="App-prompt-confirmation-title App-header">
                    Confirm The New Company Information
                </h3>

                <div className="confirm-company-info-data">
                    <p className="title">Address</p>
                    <p className="main-data">{companyInfo.address}</p>
                </div>

                <div className="confirm-company-info-data">
                    <p className="title">Contact No</p>
                    <p className="main-data">{companyInfo.contactNo}</p>
                </div>

                <div className="confirm-update-company-profile-button-grp">
                    <PrimaryButton 
                        text='Confirm Update'
                        onClick={() => triggerEditComPr()}
                    />
                    <SecondaryButton
                        text='Cancel'
                        onClick={togglePromptConfirmUpdateCompPr}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className="App-popup" onClick={onClose}>
            <div className='App-popup-content' onClick={(e) => e.stopPropagation()}>
                <div className="App-header">
                    <h1>Edit Company Profile</h1>
                    <IoClose className="icons" onClick={onClose}/>
                </div>

                {/* Input Company Address */}
                <div className='forms-input'>
                    <strong>
                        Address <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='text' 
                            name='address'
                            placeholder='Company address' 
                            value={companyInfo.address}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </div>
                </div>
                {/* Input Contact Number */}
                <div className='forms-input'>
                    <strong>
                        Contact Number <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='tel' 
                            name='contactNo'
                            placeholder='6123 4567' 
                            value={formatPhoneNumber(String(companyInfo.contactNo))}
                            onChange={(e) => triggerPhoneValidation(e)}
                            required
                        />
                    </div>
                    {contactErr && (
                        <span className='error-message'>
                            <GoAlertFill /> 
                            <span className='error-message-text'>{contactErr}</span>
                        </span>
                    )}
                    {!contactErr && companyInfo.contactNo && (
                        <span className='valid-message'>
                            <TiTick className='valid-icon'/>Valid Company Contact No.
                        </span>
                    )}
                </div>
                <PrimaryButton
                    text='Update'
                    onClick={togglePromptConfirmUpdateCompPr}
                    disabled = {!companyInfo.address || !companyInfo.contactNo}
                />
            </div>
        </div>
    )
}
export default EditCompanyProfile;
