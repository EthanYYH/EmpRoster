import './CompleteProfile.css';
import '../../../public/styles/common.css'

interface CompleteProfileProps {
    user: any;
}

const CompleteProfile = ({ user }:CompleteProfileProps) => {

    return(
        <div className="content">
            Complete Profile Form
        </div>
    )
}


export default CompleteProfile;