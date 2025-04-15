import {  useEffect, useState } from 'react';
import { ExternalLink } from 'react-external-link';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import { formatDateTime, REG_STATUS } from '../../controller/Variables.js';
import RegisReqController from '../../controller/RegisReqController.js';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

import { IoClose, FaFilePdf, RiUserReceived2Fill,
         FaCircle } from '../../../public/Icons.js';

import './RegisReqDetail.css'
import '../../../public/styles/common.css'

const { setRegistrationRequest, getBizFile} = RegisReqController

const RegisReqDetail = ({regisRequest = [], onClose, onUpdate }: RegisReqProps) => {
    // console.log(regisRequest);
    const { showAlert } = useAlert();
    const [ bizFileData, setBizFileData ] = useState<string>("");
    const [ showBizFile, setShowBizFile ] = useState(false);
    const [ isReject, setIsReject ] = useState(false);
    const [ reasonReject, setReasonReject ] = useState<string>("");

    if (!regisRequest) return null;

    const fetchBizFilePDF = async () => {
        try {
            const fileData = await getBizFile (regisRequest.registrationID)
            const base64Data = `data:application/pdf;base64,${fileData.fileData}`;
            // console.log(base64Data)
            // setBizFileData(base64Data)
            // setShowBizFile(true)
            // Convert base64 to binary → Blob
            const byteCharacters = atob(fileData.fileData);
            const byteArray = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }

            const blob = new Blob([byteArray], { type: "application/pdf" });
            const blobUrl = URL.createObjectURL(blob);

            // Open in new tab
            const newTab = window.open(blobUrl, '_blank');
            if (!newTab) {
                showAlert(
                    "PDF Preview", 
                    "Failed to display PDF", 
                    "", 
                    { type: 'warning' }
                );
            }
        } catch (error) {
            showAlert(
                'fetchBizFilePDF',
                '',
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        }
    }

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

            // console.log("Updated Registration Request: \n", updatedData)

            // Trigger api with updated data
            const response = await setRegistrationRequest(
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
                    `${response.message}`,
                    { type: 'success' }
                );
            else
                showAlert(
                    updatedData.bizName,
                    updatedData.UEN,
                    `${response.message}`,
                    { type: 'success' }
                );

        } catch(error) {
            showAlert(
                'triggerRejectionOrApproval',
                '',
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        }
    }

    // Debugging section
    // useEffect(() => {
    //     setRegistrationRequest(regisRequest.registrationID, 'Pending', '')
    // })

    function triggerCancelReject(){
        setReasonReject("")
        setIsReject(false)
    }

    // Display reject popup
    if (isReject) return (
        <div className="App-popup" onClick={triggerCancelReject}>
            <div className='App-popup-prompt-content reg-rejection-popup' onClick={(e) => e.stopPropagation()}>
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

    function toggleShowBizFile() {
        if (showBizFile === false)
            setShowBizFile(true)
        else
            setShowBizFile(false)
    }

    // if(showBizFile && bizFileData) return (
    //     <div className='App-pdf-frame'>
    //         <IoClose 
    //             className='App-close-pdf'
    //             onClick={() => toggleShowBizFile()}
    //         />
    //         <iframe
    //             src={bizFileData}
    //             width="100%"
    //             height="600px"
    //             title="PDF Preview"
    //         />
    //     </div>
    // )

    return (
        <>
        {!showBizFile && !bizFileData && (
                <div className="App-popup-content" onClick={(e) => e.stopPropagation()}>

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
                            {/* <ExternalLink href={sampleBizFile}> */}
                                <FaFilePdf onClick={fetchBizFilePDF}/>
                            {/* </ExternalLink> */}
                        </button>
                    </div>

                    <div className="detail-content">
                        <div className="regs-status">
                            {regisRequest?.status === REG_STATUS[0] && (
                                <FaCircle  
                                    className='App-popup-content-icon pending'
                                />
                            )}
                            {regisRequest?.status === REG_STATUS[1] && (
                                <FaCircle  
                                    className='App-popup-content-icon approved'
                                />
                            )}
                            {regisRequest?.status === REG_STATUS[2] && (
                                <FaCircle  
                                    className='App-popup-content-icon rejected'
                                />
                            )}
                            <p className="main-data">{regisRequest.status}</p>
                        </div>
                        <div className="request-date">
                            <RiUserReceived2Fill  
                                className='App-popup-content-icon'
                            />
                            <p className="main-data">
                                {formatDateTime(regisRequest.createdAt)}
                            </p>
                        </div>
                    </div>

                    {regisRequest?.status === REG_STATUS[2] && (
                        <div className="data-content">
                            <p className="title">Reason Of Reject:</p>
                            <p className="main-data">{regisRequest.reasonOfReject}</p>
                        </div>
                    )}
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
            )}

            {showBizFile && bizFileData && (
            <div className='App-pdf-frame'>
                <IoClose 
                    className='App-close-pdf'
                    onClick={() => toggleShowBizFile()}
                />
                <iframe
                    src={bizFileData}
                    width="100%"
                    height="600px"
                    title="PDF Preview"
                />
            </div>
            )}
        </> 
    );
}

interface RegisReqProps {
    regisRequest?: any;
    onClose?: () => void;
    onUpdate?: (updatedData: any) => void
}

export default RegisReqDetail;