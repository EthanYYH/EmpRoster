import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ExternalLink } from 'react-external-link';
import { IoClose, IoArrowBack, FaFilePdf } from '../../../public/Icons.js';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import './RegisReqDetail.css'
import '../../../public/styles/common.css'

const sampleBizFile = "https://mymailsimedu-my.sharepoint.com/:b:/g/personal/wmlim014_mymail_sim_edu_sg/EfaXUfD99AdHrSO5GjbQNssBfoSXi7ZLWPO2oGbLADvDAA?e=MT6By8";

const RegisReqDetail = ({regisRequest = "", onClose }: RegisReqProps) => {

    // console.log(regisRequest);
    const location = useLocation();
    const [data, setData] = useState<any>(null);
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        // Get data from props or route state
        const requestData = regisRequest || location.state?.regisRequest;
        if (requestData) {
          try {
            setData(JSON.parse(requestData));
          } catch (error) {
            console.error('Error parsing request data:', error);
            setData(null);
          }
        }
    }, [regisRequest, location.state]);

    // console.log(data);

    const handleBack = () => {
        window.history.back();
    }
    
    if (!data) return null;

    return (
        <div className="regis-request-detail">
            { isMobile && (
                <button className="icons" onClick={() => handleBack()}>
                    <IoArrowBack />
                </button>
            )}
            
            <div className='App-header'>
                <h1 className='company-name'>
                    {data.request.bizName}
                </h1>
                {!isMobile && 
                    <button className='icons' onClick={onClose || (() => handleBack())}>
                        <IoClose />
                    </button>
                }
            </div>

            <div className="content">
                <div className="uen data-content">
                    <h2>{data.request.uen}</h2>
                    <button className='icons'>
                        <ExternalLink href={sampleBizFile}>
                            <FaFilePdf />
                        </ExternalLink>
                    </button>
                </div>

                <div className="detail-content data-content">
                    <div className="regs-id">
                        <p className="title">Registration ID</p>
                        <p className="main-data">{data.request.regsId}</p>
                    </div>
                    <div className="request-date data-content">
                        <p className="title">Request Date</p>
                        <p className="main-data">{data.request.created_date}</p>
                    </div>
                </div>
            </div>

            <div className="btns-grp">
                <button>
                    <PrimaryButton text="Approve"/>
                </button>
                <button>
                    <SecondaryButton text="Reject"/>
                </button>
            </div>
        </div>
    );
}

interface RegisReqProps {
    regisRequest?: any;
    onClose?: () => void;
  }

export default RegisReqDetail;