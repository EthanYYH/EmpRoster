import BOSide from '../../components/SideMenu/BOSide';
import './CompanyProfile.css'
import '../../../public/styles/common.css'
import CPContents from "./CPContents"


const BOCompanyProfile = () => {

    return (
        <div className="App-content">
            <BOSide />
            <div className="content">
                <h1 className="logo">EmpRoster</h1>
                <div className="main-contents">
                    <CPContents />
                </div> 
            </div>
        </div>
    );
}

export default BOCompanyProfile;