import { useState } from 'react'
import { IoClose, GiRotaryPhone } from '../../../public/Icons.js'
import { useAlert } from '../../components/PromptAlert/AlertContext.js'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton.js'
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton'
import '../../components/UserMgt/UserDetail.css'
import './BODetail.css'
import '../../../public/styles/common.css'

const BODetail = ({company = [], onClose, onUpdate }: BODetailProps) => {
    // console.log(company)
    const { showAlert } = useAlert()
    const [ suspend, setSuspend ] = useState(false);
    const [ reasonSuspend, setReasonSuspend ] = useState("");
    const [ error, setError ] = useState("");

    const handleSuspendUser = () => {
        try {
            // Set updated data as old data
            const updatedData = {
                ...company,
                lastUpdate: new Date().toISOString(),   // Add last update date time
            }

            updatedData.owner[0].isSuspended = true
            updatedData.owner[0].reasonOfSuspend = reasonSuspend

            if(onUpdate)
                onUpdate(updatedData)

            if(onClose)
                onClose()

        } catch (error) {
            setError(`${error}`)
        }

        if(error)
            showAlert(
                'BODetail: suspend user fail',
                '',
                error,
                { type: 'error' }
            )
    }

    const handleCancelSuspend = () => {
        setReasonSuspend("")
        setSuspend(false)
    }

    if (suspend) return (
        <div className="App-popup">
            <div className='App-popup-prompt-content suspend-bo'>
                <div>
                    <p className='App-prompt-confirmation-title'>
                        Confirm to Suspend {company.UEN}'s Owner: 
                    </p>
                    <p className='App-prompt-confirmation-title-highlighted-text'>
                        {company.owner[0].fullName}
                    </p>
                </div>
                <input type="text"
                    placeholder='Reason of Suspend'
                    onChange={(e) => {
                        setReasonSuspend(e.target.value)
                    }} 
                    required 
                />
                <div className="btns-grp">
                    <PrimaryButton 
                        text='Confirm'
                        onClick={() => handleSuspendUser()}
                        disabled = {!reasonSuspend}
                    />
                    <SecondaryButton 
                        text='Cancel'
                        onClick={() => handleCancelSuspend()}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className='App-popup-content'>
            <div className="App-header">
                <h1>{company.owner[0].fullName}</h1>
                <button className="icons" onClick={onClose}>
                    <IoClose />
                </button>
            </div>
            <div className="content">
                <div className="company-info">
                    <h3>{company.bizName}</h3>
                    <p className="title">{company.UEN}</p>
                    <p className="main-data">{company.address}</p>

                    <div className="company-info-detail-contact">
                        <GiRotaryPhone className='phone-icon'/>
                        <p>{company.contactNo}</p>
                    </div>
                </div>
                <div className="bo-info">
                    <h3>Business Owner Information</h3>
                    
                    <div className='bo-info-data'>
                        <p className="title">Email:&nbsp;</p>
                        <p className="main-data">{company.owner[0].email}</p>
                    </div>
                    <div className='bo-info-data'>
                        <p className="title">Contact:&nbsp;</p>
                        <p className="main-data">{company.owner[0].hpNo}</p>
                    </div>
                    <div className="bo-status-data">
                        <div className="bo-info-data">
                            <p className="title">Account Status: </p>
                            {company.owner[0]?.isSuspended === true ? (
                                <p className="main-data">Suspended</p>
                            ):(
                                <p className="main-data">Activated</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="subs-info">
                    <div className="subs-info-data">
                        <p className="title">Subscription Status: </p>
                        <p className="main-data">
                            {company.transactions[0]?.subsStatus || 'Unsubscribed'}
                        </p>
                    </div>
                    {company.transactions.length > 0 ? (
                    <div className="subs-info-data">
                        <p className="title">Subscription Period: </p>
                        <p className="main-data">
                            {company.transactions[0].startDate}
                            &nbsp;to&nbsp;
                            {company.transactions[0].endDate}
                        </p>
                    </div>
                    ):(
                        <></>
                    )}
                    
                </div>
            </div>
            <div className="suspend-btn">
                <SecondaryButton 
                    text='Suspend'
                    onClick={() => setSuspend(true)}
                />
            </div>
        </div>
    )
}

interface BODetailProps {
    company?: any;
    onClose?: () => void;
    onUpdate?: (updatedData:any) => void
}

export default BODetail;