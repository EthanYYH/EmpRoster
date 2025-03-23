import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ExternalLink } from 'react-external-link';
import { IoClose, IoArrowBack, FaFilePdf } from '../../../public/Icons.js';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import './UserDetail.css';
import "../../../public/styles/common.css";

const sampleBizFile = "https://mymailsimedu-my.sharepoint.com/:b:/g/personal/wmlim014_mymail_sim_edu_sg/EfaXUfD99AdHrSO5GjbQNssBfoSXi7ZLWPO2oGbLADvDAA?e=MT6By8";

const UserDetail = ({userDetail = "", companyDetail="", onClose }: UserDetailProps) => {
    // console.log(userDetail);
    const location = useLocation();
    const [userData, setUserData] = useState<any>(null);
    const [companyData, setCompanyData] = useState<any>(null);
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        // Get data from props or route state
        const uData = userDetail || location.state?.userDetail;
        const cData = companyDetail || location.state?.companyDetail;
        if (uData) {
          try {
            setUserData(JSON.parse(uData));
          } catch (error) {
            console.error('Error parsing request data:', error);
            setUserData(null);
          }
        }
    }, [userDetail, companyDetail, location.state]);

    const handleBack = () => {
        window.history.back();
    }

    if (!userData) return null;
    // console.log(userData);

    return (
        <div className='UserDetail'>
            { isMobile && (
                <button className="icons" onClick={() => handleBack()}>
                    <IoArrowBack />
                </button>
            )}

            <div className='App-header'>
                <h1 className='user-name'>
                    {userData.user.name}
                </h1>
                {!isMobile && 
                    <button className='icons' onClick={onClose || (() => handleBack())}>
                        <IoClose />
                    </button>
                }
            </div>

            {/* Display company information if current user detail is Business Owner */}
            { userData.user.role === "Business Owner" && (
                <div className='bo-data-content'>
                    <div className="company-name data-content">
                        <h2>{userData.user.company}</h2>
                    </div>
                    <div className="uen data-content">
                        <h3>{userData.user.uen}</h3>
                        <button className='icons'>
                            <ExternalLink href={sampleBizFile}>
                                <FaFilePdf />
                            </ExternalLink>
                        </button>
                    </div>
                
                    <div className="acc-status">
                        <div className="user-sub-status">
                            <p className="title">Subscription Status:</p>
                            <p className="main-data">{userData.user.subsStatus}</p>
                        </div>

                        <div className="user-acc-status">
                            <p className="title">Account Status:</p>
                            <p className="main-data">{userData.user.status}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="user-detail-content">
                <div className="email user-detail-data">
                    <p className="title">Email:</p>
                    <p className="main-data">{userData.user.email}</p>
                </div>

                <div className="last-online user-detail-data">
                    <p className="title">Last Online:</p>
                    <p className="main-data">{userData.user.lastOnline}</p>
                </div>
            </div>

            <div className="btn-group">
                <button className="suspend">
                    <SecondaryButton text='Suspend'/>
                </button>
            </div>
        </div>
    );
}

interface UserDetailProps {
    userDetail?: any;
    companyDetail?: any;
    onClose?: () => void;
  }

export default UserDetail;