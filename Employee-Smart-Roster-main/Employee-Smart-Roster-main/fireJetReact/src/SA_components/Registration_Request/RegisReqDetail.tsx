import {  useEffect, useState } from 'react';
import { ExternalLink } from 'react-external-link';
import { IoClose, FaFilePdf } from '../../../public/Icons.js';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import { formatDateTime } from '../../controller/Variables.js';
import RegisReqController from '../../controller/RegisReqController.js';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import './RegisReqDetail.css'
import '../../../public/styles/common.css'

const sampleBizFile = "https://mymailsimedu-my.sharepoint.com/:b:/g/personal/wmlim014_mymail_sim_edu_sg/EfaXUfD99AdHrSO5GjbQNssBfoSXi7ZLWPO2oGbLADvDAA?e=MT6By8";
const REG_STATUS = ["Pending", "Approved", "Rejected"]
const { setRegistrationRequest, } = RegisReqController

const RegisReqDetail = ({regisRequest = [], onClose, onUpdate }: RegisReqProps) => {
    // console.log(regisRequest);
    const { showAlert } = useAlert();
    const [ isReject, setIsReject ] = useState(false);
    const [ reasonReject, setReasonReject ] = useState("");

    if (!regisRequest) return null;

    const triggerRejectionOrApproval = async (statusChanged:string) => {
        try {
            const updatedData = {
                ...regisRequest,
                status: statusChanged,
                lastUpdate: new Date().toISOString(),
            };

            if(statusChanged === REG_STATUS[2]){
                updatedData.reasonOfReject = reasonReject
            }

            // Trigger api with updated data
            await setRegistrationRequest(
                updatedData.registrationID, 
                updatedData.status, 
                updatedData.reasonOfReject
            )

            // Update updatedData locally from parent page
            if(onUpdate)
                onUpdate(updatedData)

            if(onClose)
                onClose()

            // Prompt user on user action output
            if(statusChanged === REG_STATUS[2])
                showAlert(
                    updatedData.bizName,
                    updatedData.UEN,
                    "Rejected Registration Successfully",
                    { type: 'success' }
                );
            else
                showAlert(
                    updatedData.bizName,
                    updatedData.UEN,
                    "Approved Registration Successfully",
                    { type: 'success' }
                );

        } catch(error) {

        }
    }

    // useEffect(() => {
    //     setRegistrationRequest()
    // })

    const triggerCancelReject = () => {
        setReasonReject("")
        setIsReject(false)
    }

    // Display reject popup
    if (isReject) return (
        <div className="App-popup">
            <div className='App-popup-prompt-content reg-rejection-popup'>
                <div>
                    <p className='App-prompt-confirmation-title'>Confirm to Reject the Registration Request for:</p>
                    <p className="App-prompt-confirmation-title-highlighted-text">{regisRequest.UEN}</p>
                </div>
                <input type='text' 
                    placeholder='Reason of Rejection' 
                    onChange={(e) => {
                        setReasonReject(e.target.value);
                    }}
                    required
                />
                <div className="btns-grp">
                    <PrimaryButton 
                        text='Confirm'
                        onClick={() => triggerRejectionOrApproval(REG_STATUS[2])}
                        disabled = {!reasonReject}
                    />
                    <SecondaryButton 
                        text='Cancel'
                        onClick={() => triggerCancelReject()}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className="App-popup-content">
            
            <div className='App-header'>
                <h1 className='company-name'>
                    {regisRequest.bizName}
                </h1>
                <button className='icons' onClick={onClose}>
                    <IoClose />
                </button>
            </div>

            <div className="App-popup-main-content">
                <div className="uen data-content">
                    <h2>{regisRequest.UEN}</h2>
                    <button className='icons'>
                        <ExternalLink href={sampleBizFile}>
                            <FaFilePdf />
                        </ExternalLink>
                    </button>
                </div>

                <div className="detail-content">
                    <div className="regs-status">
                        <p className="title">Status</p>
                        <p className="main-data">{regisRequest.status}</p>
                    </div>
                    <div className="request-date">
                        <p className="title">Request On</p>
                        <p className="main-data">
                            {formatDateTime(regisRequest.createdAt)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="btns-grp">
                <PrimaryButton 
                    text="Approve"
                    onClick={() => triggerRejectionOrApproval(REG_STATUS[1])}
                />
                <SecondaryButton 
                    text="Reject"
                    onClick={() => setIsReject(true)}
                />
            </div>
        </div>
    );
}

interface RegisReqProps {
    regisRequest?: any;
    onClose?: () => void;
    onUpdate?: (updatedData: any) => void
}

export default RegisReqDetail;