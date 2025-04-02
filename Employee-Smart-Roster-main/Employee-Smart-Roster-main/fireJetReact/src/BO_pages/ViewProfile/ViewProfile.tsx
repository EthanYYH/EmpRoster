import BOSide from '../../components/SideMenu/BOSide';
import './ViewProfile.css'
import '../../../public/styles/common.css'
import VPBody from "./VPBody"


const BOViewProfile = () => {

    return (
        <div className="App-content">
            <BOSide />
            <div className="content">
                <h1 className="logo">EmpRoster</h1>
                <div className="main-contents">
                    <VPBody />
                </div>
            </div>
        </div>

    );
}

export default BOViewProfile;