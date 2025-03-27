import { useState, useEffect } from "react";
import SASide from "../../components/SideMenu/SASide";
import RatingChart from "../../SA_components/RatingChart/RatingChart";
import SubscriptionBar from "../../SA_components/SubscriptionBar/SubscriptionBar";
import RegisReq_m from "../../SA_components/Registration_Request/RegisReq_m";
import RegisReqTitle from "../../SA_components/Registration_Request/Title";
import RegisReqController from "../../controller/RegisReqController";

import "./SADash.css"
import "../../../public/styles/common.css"

// Access the function from the RegisReqController default export
const { getRegistrationRequest, 
        handleFilterRegsStatus, } = RegisReqController;

export default function SADash() {
    const [ allRegisRequest, setAllRegisRequest ] = useState<any>([]);
    const [ filteredRegisRequest, setFilteredRegisRequest ] = useState<any>([]);
    const [ filterStatus, setFilterStatus ] = useState("Pending"); // Default display by pending

    const fetchData = async () => {
            try {
                const response = getRegistrationRequest();
                setAllRegisRequest(Array.isArray(response) ? response : []);
                console.log(allRegisRequest)
            } catch (error) {
                console.error("Data fetch failed:", error);
                setAllRegisRequest([]);
            }
        };
        // Auto trigger when allregisrequest length change
        useEffect(() => { fetchData(); }, [allRegisRequest.length]); 
    
        const triggerFilterStatus = async () => {
            console.log("Filter status: ", filterStatus);
            const filter = handleFilterRegsStatus(allRegisRequest, filterStatus);
            // console.log(allRegisRequest)
            setFilteredRegisRequest(filter);
        }
        // Auto trigger when filter status change
        useEffect(() => { triggerFilterStatus(); }, [filterStatus, allRegisRequest])
    
        // useEffect(() => {
        //     console.log("Current filter status:", filterStatus);
        //     console.log("Filtered results:", filteredRegisRequest);
        // }, [filterStatus, filteredRegisRequest])

    return(
        <div className="App-content">
            <SASide />
            <div className="dashboard-content">
                <div className="virtual-data">
                    <RatingChart />
                    {/* <SubscriptionBar /> */}
                </div>
                <div className="regis-request-section">
                    <RegisReqTitle noOfPendingRequest={filteredRegisRequest.length} />
                    <RegisReq_m data={filteredRegisRequest}/>
                </div>
            </div>
        </div>
    );
}