import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidUserDetail } from "../../../public/Icons.js"
import RegisReqController from "../../controller/RegisReqController.js";
import RegisReqDetail from "./RegisReqDetail";
import "./RegisReq.css";
import "../../../public/styles/common.css";

// Access the function from the default export
const { GetRegistrationRequestData } = RegisReqController;

const RegisReq = () => {
    const navigate = useNavigate();
    const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
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
    };

    const handleCloseDetail = () => {
        setSelectedRequest("");
        setShowDetail(false);
        return false;
    }
  
    return (
      <div className="registration-request">
        <h1 className="header">
          REGISTRATION LIST 
          <div className="total">
            {getRegRequestData().length}
          </div>
        </h1>
        
        <div className="content">
            {getRegRequestData().map((request, index) => (
            <div key={request.regsId}>
                <div className="regis-req">
                    <div className="regis-req-name">
                        <h2>
                            {request.bizName}
                        </h2>
                        <button className="regis-req-detail" onClick={() => handleDetailClick({request})}>
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
    );
  };
  
  export default RegisReq;