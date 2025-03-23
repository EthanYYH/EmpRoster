import Header from '../../components/table/Header';
import Cell from '../../components/table/Cell';
import { useState } from "react";
import { BiSolidUserDetail } from "../../../public/Icons.js";
import { useNavigate } from "react-router-dom";
import RegisReqController from "../../controller/RegisReqController";
import SASide from "../../components/SideMenu/SASide";
import RegisReqDetail from "../../SA_components/Registration_Request/RegisReqDetail";

import "./RegisRequests.css"
import "../../../public/styles/common.css";

// Access the function from the default export
const { GetRegistrationRequestData } = RegisReqController;

const RegisRequests = () => {
    const navigate = useNavigate();
    const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
    const [searchedInput, setSearchedInput] = useState('Subscribed');
    const [showDetail, setShowDetail] = useState(false);
    
    function getRegRequestData(){
        return GetRegistrationRequestData();
    }

    const handleDetailClick = (request: any) => {
        const data = JSON.stringify(request);
        // Check for mobile screen (adjust breakpoint as needed)
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          // Mobile: Navigate to detail in page
          navigate('/regis-request-detail', { 
            state: { regisRequest: data } 
          });
        } else {
          // Desktop/Tablet: Show detail in popup
          setSelectedRequest(data);
          setShowDetail(true);
        }
        // console.log(selectedRequest);
    };

    const handleCloseDetail = () => {
        setSelectedRequest("");
        setShowDetail(false);
        return false;
    }
  
    return (
        <div className="RegisRequests">
            <SASide />
            <div className="content">
                <h1 className="header">
                    View All Business Registration Request
                </h1>
                
                <div className="filter-group-search-regisID">
                    <p className='filter-title'>Registration ID</p>
                    <input type='text' 
                        className='search-input'
                        placeholder='Search Registration ID' 
                        onChange={(e) => setSearchedInput(e.target.value)}
                    />
                </div>

                {/* Desktop View */}
                <div className="table">
                    <div className="desktop-table-header">
                        <Header className='header-reg-id' text='Reg. ID' />
                        <Header className='header-uen' text='UEN' />
                        <Header className='header-company-name' text='COMPANY NAME' />
                        <Header className='header-gap-regs-req-page' text=''/>
                    </div>
                    {getRegRequestData().map((request, index) => (
                    <div className='table-body' key={request.regsId}>
                        <Cell className='body-reg-id' text={request.regsId} />
                        <Cell className='body-uen' text={request.uen} />
                        <Cell className='body-company-name' text={request.bizName} />
                        <button 
                            className="request-detail-detail-table" 
                            onClick={() => handleDetailClick({request})}>
                            <BiSolidUserDetail />
                        </button>
                    </div>
                    ))}
                </div>

                {/* Mobile View */}
                <div className="registration-request-m">
                    {getRegRequestData().map((request, index) => (
                    <div key={request.regsId}>
                        <div className="regis-req">
                            <div className="regis-req-name">
                                <h2>
                                    {request.bizName}
                                </h2>
                                <button 
                                    className="regis-req-detail" 
                                    onClick={() => handleDetailClick({request})}>
                                    <BiSolidUserDetail />
                                </button>
                            </div>
                            <div className="regis-req-data">
                                <div className="uen">
                                    <p className="App-secondary-text uen-title">UEN</p>
                                    <p>{request.uen}</p>
                                </div>

                                <div className="regis-id">
                                    <p className="App-secondary-text rID-title">Reg. ID</p>
                                    <p>{request.regsId}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                

                {showDetail && selectedRequest && (
                    <div className="App-popup">
                        <RegisReqDetail 
                            regisRequest= {selectedRequest}
                            onClose={(() => handleCloseDetail())}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default RegisRequests;