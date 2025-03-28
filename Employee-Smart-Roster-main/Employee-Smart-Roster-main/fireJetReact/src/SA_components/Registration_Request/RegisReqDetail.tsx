import { useEffect, useState } from 'react';
import { ExternalLink } from 'react-external-link';
import { IoClose, FaFilePdf } from '../../../public/Icons.js';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useAlert } from '../../components/PromptAlert/AlertContext';
import './RegisReqDetail.css'
import '../../../public/styles/common.css'

const sampleBizFile = "https://mymailsimedu-my.sharepoint.com/:b:/g/personal/wmlim014_mymail_sim_edu_sg/EfaXUfD99AdHrSO5GjbQNssBfoSXi7ZLWPO2oGbLADvDAA?e=MT6By8";

const RegisReqDetail = ({regisRequest = [], onClose, onUpdate }: RegisReqProps) => {
    // console.log(regisRequest);
    const { showAlert } = useAlert();
    const [ isReject, setIsReject ] = useState(false);
    const [ reasonReject, setReasonReject ] = useState("");

    if (!regisRequest) return null;

    const handleStatusChange = async (statusChanged:string) => {
        if (!regisRequest) return null;

        const updatedData = {
            ...regisRequest,
            status: statusChanged,
            lastUpdate: new Date().toISOString(),
        };

        if(statusChanged === "Rejected"){
            updatedData.reasonOfReject = reasonReject
        }

        // This part onward is to replace await JSON in parent 
        // (add try catch)
        if(onUpdate)
            onUpdate(updatedData)

        if(statusChanged === "Rejected")
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
                { type: 'info' }
            );

        if(onClose)
            onClose()
    }

    const handleCancelReject = () => {
        setReasonReject("")
        setIsReject(false)
    }

    // Display reject popup
    if (isReject) return (
        <div className="App-popup">
            <div className='App-popup-prompt-content reg-rejection-popup'>
                <div>
                    <p className='reject-text-title'>Confirm to Reject the Registration Request for:</p>
                    <p className="highlight-regis-rejection-text">{regisRequest.UEN}</p>
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
                        onClick={() => handleStatusChange("Rejected")}
                        disabled = {!reasonReject}
                    />
                    <SecondaryButton 
                        text='Cancel'
                        onClick={() => handleCancelReject()}
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

            <div className="content">
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
                        <p className="main-data">{regisRequest.createdAt}</p>
                    </div>
                </div>
            </div>

            <div className="btns-grp">
                <PrimaryButton 
                    text="Approve"
                    onClick={() => handleStatusChange("Approved")}
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