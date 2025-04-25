import { formatPhoneNumber } from '../../controller/Variables.js'

import './styles.css'
import '../../../public/styles/common.css'

interface BOUserProfileProps {
    userData: any
}

const UserProfileCard = ({ userData }: BOUserProfileProps) => {
    
    return (
        <>
            <div className="user-profile-data email even-row">
                <p className="title">EMAIL</p>
                <p className="main-data">{userData.email}</p>
            </div>
            <div className="user-profile-data fullname">
                <p className="title">FULLNAME</p>
                <p className="main-data">{userData.fullName}</p>
            </div>
            <div className="user-profile-data nric even-row">
                <p className="title">NRIC</p>
                <p className="main-data">{userData.nric.toUpperCase()}</p>
            </div>
            <div className="user-profile-data hpNo">
                <p className="title">H/P NO</p>
                <p className="main-data">{formatPhoneNumber(String(userData.hpNo))}</p>
            </div>
        </>
    )
}

export default UserProfileCard;