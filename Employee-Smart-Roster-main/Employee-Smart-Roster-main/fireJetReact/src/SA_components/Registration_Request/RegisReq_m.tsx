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
    const [ showDetail, setShowDetail ] = useState(false)
    const isOnAdminDash = location.pathname.includes('admin-dashboard');

    const triggerSelectedDetail = (request:any) => {
        setSelectedRequest(handleSelectedDetail(request))
        setShowDetail(true)
    }

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
            {data.map((request:any) => (
            <div key={request.registrationID}>
                <div className="App-mobile-responsive-table-card">
                    <div className="App-mobile-responsive-table-card-title">
                        <h2>
                            {request.bizName}
                        </h2>
                        <div className="App-mobile-table-icon" 
                            onClick={() => {
                                triggerSelectedDetail(request)
                            }}>
                            <BiSolidUserDetail />
                        </div>
                    </div>
                    <div className="App-mobile-responsive-table-card-data">
                        <div className="App-mobile-responsive-table-card-data-detail uen">
                            <p className="App-mobile-responsive-table-card-data-title">
                                UEN
                            </p>
                            <p>{request.UEN}</p>
                        </div>

                        <div className="App-mobile-responsive-table-card-data-detail status">
                            <p className="App-mobile-responsive-table-card-data-title">
                                Status
                            </p>
                            <p>{request.status}</p>
                        </div>

                        <div className="App-mobile-responsive-table-card-data-detail registered">
                            <p className="App-mobile-responsive-table-card-data-title">
                                Registered On
                            </p>
                            <p>{request.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
            ))} 
            {showDetail && selectedRequest && (
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