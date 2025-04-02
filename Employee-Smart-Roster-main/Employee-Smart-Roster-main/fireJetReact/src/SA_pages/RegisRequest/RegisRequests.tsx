import RegisReq from "../../SA_components/Registration_Request/RegisReq.js";
import { useState, useEffect } from "react";
import RegisReqController from "../../controller/RegisReqController";
import RegisReq_m from '../../SA_components/Registration_Request/RegisReq_m';
import SASide from "../../components/SideMenu/SASide";
import RegisReqTitle from '../../SA_components/Registration_Request/Title';

import "./RegisRequests.css"
import "../../../public/styles/common.css";

// Access the function from the RegisReqController default export
const { getRegistrationRequest, 
        setRegistrationRequest,
        handleFilterRegsStatus, 
        handleFilterRegsUEN,
        handleFilterRegsBizName, } = RegisReqController;

const RegStatus = ["Pending", "Approved", "Rejected"];

const RegisRequests = () => {
    const [ allRegisRequest, setAllRegisRequest ] = useState<any>([]);
    const [ filteredRegisRequest, setFilteredRegisRequest ] = useState<any>([]);
    const [ filterStatus, setFilterStatus ] = useState("Pending"); // Default display by pending
    const [ filterUEN, setFilterUEN ] = useState("");   // Default empty
    const [ filterBizName, setFilterBizName ] = useState("");   // Default empty
    
    
    const fetchData = async () => {
        try {
            const response = getRegistrationRequest();
            setAllRegisRequest(Array.isArray(response) ? response : []);
            // console.log(allRegisRequest)
        } catch (error) {
            console.error("Data fetch failed:", error);
            setAllRegisRequest([]);
        }
    };
    // Auto trigger when allRegisRequest length change
    useEffect(() => { fetchData(); }, [allRegisRequest.length]); 

    const triggerFilterStatus = async () => {
        // console.log("Filter status: ", filterStatus);
        const filter = handleFilterRegsStatus(allRegisRequest, filterStatus);
        // console.log(allRegisRequest)
        setFilterBizName("");
        setFilterUEN("");
        setFilteredRegisRequest(filter);
    }
    // Auto trigger when filter status change
    useEffect(() => { triggerFilterStatus(); }, [filterStatus, allRegisRequest])

    const triggerFilter = async () => {
        if (filterUEN !== "" && filterBizName === ""){
            const filter = handleFilterRegsUEN(filteredRegisRequest, filterUEN);
            setFilteredRegisRequest(filter)
        }
        if (filterUEN === "" && filterBizName === ""){
            const filter = handleFilterRegsStatus(allRegisRequest, filterStatus);
            setFilteredRegisRequest(filter)
        }
        if (filterUEN === "" && filterBizName !== ""){
            const filter = handleFilterRegsBizName(filteredRegisRequest, filterBizName);
            setFilteredRegisRequest(filter)
        }
    }
    // Auto trigger when filter status change
    useEffect(() => { triggerFilter(); }, [filterUEN, filterBizName])

    // useEffect(() => {
    //     console.log("Current filter status:", filterStatus);
    //     console.log("Filtered results:", filteredRegisRequest);
    // }, [filterStatus, filteredRegisRequest])
  
    const handleDataUpdate = (updatedData:any) => {
        setRegistrationRequest(updatedData);
    };

    return (
        <div className="RegisRequests">
            <SASide />
            <div className="content">
                <RegisReqTitle />
                
                <div className="App-filter-search-component">
                    <div className="App-filter-container">
                        <p className='App-filter-title'>Search Status</p>
                        <select 
                            value={filterStatus}
                            onChange={(e) => {
                                // console.log("Target value: ", e.target.value)
                                setFilterStatus(e.target.value);
                            }}
                        >
                            {RegStatus.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="App-filter-container">
                        <p className='App-filter-title'>Search UEN</p>
                        <input type='text' 
                            placeholder='Search UEN' 
                            onChange={(e) => {
                                setFilterUEN(e.target.value);
                            }}
                        />
                    </div>
                    <div className="App-filter-container">
                    <p className='App-filter-title'>Search Business Name</p>
                        <input type='text' 
                            placeholder='Search Business Name' 
                            onChange={(e) => {
                                setFilterBizName(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* Desktop View */}
                <RegisReq 
                    data={filteredRegisRequest}
                    onDataUpdate={handleDataUpdate}/>

                {/* Mobile View */}
                <RegisReq_m 
                    data={filteredRegisRequest}
                    onDataUpdate={handleDataUpdate}/>
            </div>
        </div>
    )
}

export default RegisRequests;