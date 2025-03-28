import { useState } from "react";
import { BiSolidUserDetail } from "../../../public/Icons.js";
import Header from "../../components/table/Header.js";
import Cell from "../../components/table/Cell.js";
import RegisReqController from "../../controller/RegisReqController.js";
import RegisReqDetail from "./RegisReqDetail";
import "./RegisReq.css";
import "../../../public/styles/common.css";

// Access the function from the default export
const { handleSelectedDetail, handleCloseDetail } = RegisReqController;

const RegisReq = ({data=[], onDataUpdate}: RegisReqProps) => {
    const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
    
    const handleUpdate = (updatedData:any) => {
        // Update in local
        const updatedItem = data.map((item:any) => 
            item.registrationID === updatedData.registrationID
            ? updatedData
            : item
        )

        if (onDataUpdate)
            onDataUpdate(updatedItem)

        // Close detail view
        setSelectedRequest(null)
    }

    return (
        <div className="App-desktop-responsive-table">
            <div className="desktop-table-header">
                <Header className='header-uen' text='UEN' />
                <Header className='header-company-name' text='COMPANY NAME' />
                <Header className='header-status' text='STATUS' />
                <Header className='header-reg-date' text='REGISTERED DATE' />
                <Header className='header-gap-regs-req-page' text=''/>
            </div>
            {data.map((request:any) => (
            <div className='table-body' key={request.registrationID}>
                <Cell className='body-uen' text={request.UEN} />
                <Cell className='body-company-name' text={request.bizName} />
                <Cell className='body-status' text={request.status} />
                <Cell className='body-reg-date' text={request.createdAt} />
                <div 
                    className="App-desktop-table-icon App-table-icon" 
                    onClick={() => {
                        setSelectedRequest(handleSelectedDetail(request))
                    }}>
                    <BiSolidUserDetail />
                </div>
            </div>
            ))}

            {selectedRequest && (
                <div className="App-popup">
                    <RegisReqDetail 
                        regisRequest= {selectedRequest}
                        onClose={(() => {
                            setSelectedRequest(handleCloseDetail())
                        })}
                        onUpdate={handleUpdate}
                    />
                </div>
            )}
        </div>
    );
  };

  interface RegisReqProps {
    data?: any;
    onDataUpdate?: (updatedData: any) => void
}
  
  export default RegisReq;