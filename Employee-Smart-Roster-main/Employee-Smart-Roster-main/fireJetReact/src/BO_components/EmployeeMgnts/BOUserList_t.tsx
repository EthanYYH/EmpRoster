import { useState } from 'react';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import Header from '../../components/table/Header';
import Cell from '../../components/table/Cell';
import { BiSolidUserDetail } from '../../../public/Icons.js';

import UserDetail from './UserDetail';

import './BOUserList_t.css';
import '../../../public/styles/common.css';

const BOUserList_t = ({ users = [], onUpdate }: BOListTableProps) => {
  const { showAlert } = useAlert();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [error, setError] = useState("");

  // Handle clicking a row to open the detail modal
  const handleDetailClick = (user: any) => {
    try {
      setSelectedUser(user);
      setShowDetail(true);
    } catch (err) {
      setError(`${err}`);
      setSelectedUser(null);
      setShowDetail(false);
    }
    if (error)
      showAlert("handleDetailClick in BOUserList_t", '', error, { type: 'error' });
  };

  function triggerCloseDetail() {
    setSelectedUser(null);
    setShowDetail(false);
  }

  if (users.length === 0)
    return (
      <div className="App-desktop-responsive-table">
        <b>No Data Loaded...</b>
      </div>
    );

  return (
    <>
      <div className="App-desktop-responsive-table">
        <div className="desktop-table-header">
          <Header className="header-nric" text="NRIC" />
          <Header className="header-fullname" text="FULL NAME" />
          <Header className="header-email" text="EMAIL" />
          <Header className="header-role" text="ROLE" />
          <Header className="header-phone" text="PHONE" />
          <Header className="header-status" text="STATUS" />
          <Header className="header-icon" text="" />
        </div>
        {users.map((user: any) => (
          <div className="table-body" key={user.nric}>
            <Cell className="body-nric" text={user.nric} />
            <Cell className="body-fullname" text={user.fullName} />
            <Cell className="body-email" text={user.email} />
            <Cell className="body-role" text={user.role} />
            <Cell className="body-phone" text={user.hpNo} />
            <Cell
              className="body-status"
              text={user.isSuspended ? "Suspended" : "Active"}
            />
            <div
              className="App-desktop-table-icon"
              onClick={() => handleDetailClick(user)}
            >
              <BiSolidUserDetail />
            </div>
          </div>
        ))}
      </div>

      {showDetail && selectedUser && (
        <div className="App-popup">
          <UserDetail
            user={selectedUser}
            onClose={() => triggerCloseDetail()}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </>
  );
};

interface BOListTableProps {
  users?: any;
  onUpdate?: (updatedData: any) => void;
}

export default BOUserList_t;
