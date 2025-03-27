import { useState } from "react"
import { useLocation } from "react-router-dom"
import { BiSolidUserDetail } from "../../../public/Icons.js"
import RegisReqDetail from "./RegisReqDetail.js"
import RegisReqController from "../../controller/RegisReqController.js"
import './RegisReq_m.css'
import '../../../public/styles/common.css'

// Access the function from the RegisReqController default export 
const { handleSelectedDetail, handleCloseDetail} = RegisReqController;

const RegisReq_m = ({data=[], onDataUpdate}: RegisReqProps) => {
    const location = useLocation()
    const [ selectedRequest, setSelectedRequest ] = useState<any>([]);
    const isOnAdminDash = location.pathname.includes('admin-dashboard');

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

    return(
        <div className={`${isOnAdminDash ? 'set-visible' : 'App-mobile-responsive-table'}`}>
            <div className="content">
            {data.map((request:any) => (
            <div key={request.registrationID}>
                <div className="regis-req">
                    <div className="regis-req-name">
                        <h2>
                            {request.bizName}
                        </h2>
                        <div className="App-mobile-table-icon App-table-icon" 
                            onClick={() => {
                                setSelectedRequest(handleSelectedDetail(request))
                            }}>
                            <BiSolidUserDetail />
                        </div>
                    </div>
                    <div className="regis-req-data">
                        <div className="regis-uen">
                            <p className="regis-m-title">UEN</p>
                            <p>{request.UEN}</p>
                        </div>

                        <div className="regis-status">
                            <p className="regis-m-title">Status</p>
                            <p>{request.status}</p>
                        </div>

                        <div className="regis-submitted-at">
                            <p className="regis-m-title">Registered On</p>
                            <p>{request.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
            ))} 
            </div>
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
    )

}

interface RegisReqProps {
    data?: any;
    onDataUpdate?: (updatedData: any) => void
}

export default RegisReq_m;