import { useState } from 'react';
import { IoClose } from '../../../public/Icons.js'; // Adjust the import path as needed
import { useAlert } from '../../components/PromptAlert/AlertContext';
import { convertDateToSGTime } from '../../controller/Variables.js';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import EditEmployee from '../../BO_components/CreateEditEmployee/EditEmployee';

import { HiOutlineIdentification,
         MdOutlineMailOutline,
         MdContactPhone,
         HiOutlineCalendarDateRange,
         TiTime } from '../../../public/Icons.js'
import './UserDetail.css';
import '../../../public/styles/common.css';

interface UserDetailProps {
  user?: any;
  role?: string;
  skillset?: string;
  onClose?: () => void;
  onUpdate?: (updatedData: any) => void;
}

const UserDetail = ({ user, role, skillset, onClose, onUpdate }: UserDetailProps) => {
  const { showAlert } = useAlert();
  const [suspend, setSuspend] = useState(false);
  const [reasonSuspend, setReasonSuspend] = useState("");
  const [error, setError] = useState("");

  const handleSuspendUser = () => {
    try {
      // Create updated user data with suspension details
      const updatedUser = {
        ...user,
        isSuspended: true,
        reasonOfSuspend: reasonSuspend,
        lastUpdate: new Date().toISOString(),
      };

      if (onUpdate) onUpdate(updatedUser);
      if (onClose) onClose();
    } catch (err) {
      setError(`${err}`);
    }

    if (error)
      showAlert(
        'UserDetail: suspend user failed',
        '',
        error,
        { type: 'error' }
      );
  };

  const handleCancelSuspend = () => {
    setReasonSuspend("");
    setSuspend(false);
  };

  if (suspend)
    return (
      <div className="App-popup" onClick={handleCancelSuspend}>
        <div className="App-popup-prompt-content suspend-user" onClick={(e) => e.stopPropagation()}>
          <div>
            <p className="App-prompt-confirmation-title">
              Confirm to Suspend {user.fullName}
            </p>
          </div>
          <input
            type="text"
            placeholder="Reason for suspension"
            onChange={(e) => setReasonSuspend(e.target.value)}
            required
          />
          <div className="btns-grp">
            <PrimaryButton 
              text="Confirm" 
              onClick={handleSuspendUser}
              disabled={!reasonSuspend}
            />
            <SecondaryButton 
              text="Cancel" 
              onClick={handleCancelSuspend}
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="App-popup-content" onClick={(e) => e.stopPropagation()}>
      <div className="App-header">
        <h1>{user.fullName}</h1>
        <button className="icons" onClick={onClose}>
          <IoClose />
        </button>
      </div>
      <div className="App-popup-main-content">
        <div className="user-info">
          <h3>Personal Information</h3>
          <div className="user-info-data registered-pass">
            <p className="title">
              <HiOutlineIdentification className='App-popup-content-icon'/>
            </p>
            <p className="main-data">
              {user.resStatusPassType}&nbsp;&#x27A1;&nbsp;
              <strong>{user.nric}</strong>
            </p>
          </div>
          <div className="user-info-data email">
            <p className="title App-popup-content-icon">
              <MdOutlineMailOutline className='App-popup-content-icon'/>
            </p>
            <p className="main-data">{user.email}</p>
          </div>
          <div className="user-info-data hpNo">
            <p className="title App-popup-content-icon">
              <MdContactPhone className='App-popup-content-icon'/>
            </p>
            <p className="main-data">{user.hpNo}</p>
          </div>
        </div>
        {/* Job and Position Information */}
        <div className="job-position-info">
          <h3>Job & Position Information</h3>
          <div className="job-position-info-data job-title">
            <p className="title">Job Title:</p>
            <p className="main-data">{user.jobTitle}</p>
          </div>
          <div className="job-position-info-data role">
            <p className="title">Role:</p>
            <p className="main-data">{role}</p>
          </div>
          <div className="job-position-info-data skillset">
            <p className="title">Skillset:</p>
            <p className="main-data">{skillset}</p>
          </div>
          <div className="job-position-info-data join-date">
            <p className="title">Date Joined:</p>
            <p className="main-data display-date">
              <HiOutlineCalendarDateRange className='App-popup-content-icon'/>
              {convertDateToSGTime(user.dateJoined)[0]}
            </p>
          </div>
        </div>
        {/* Account Information */}
        <div className="account-info">
          <div className="account-info-data account-status">
            <p className="title">Account Status:</p>
            <p className="main-data">
              { user.activeOrInactive === 1 
                ? "Activated"
                : "Suspended" }
            </p>
          </div>
          <div className="account-info-data last-update">
            <p className="title">Last Update:</p>
            <div className="last-update-date-time">
              <p className="main-data display-date">
                <HiOutlineCalendarDateRange className='App-popup-content-icon'/>
                {convertDateToSGTime(user.dateJoined)[0]}
              </p>
              <p className="main-data display-date">
                <TiTime className='App-popup-content-icon'/>
                {convertDateToSGTime(user.dateJoined)[1].split('.')[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="suspend-btn">
        <EditEmployee />
        {!user.isSuspended && (
          <SecondaryButton 
            text="Suspend" 
            onClick={() => setSuspend(true)}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetail;
