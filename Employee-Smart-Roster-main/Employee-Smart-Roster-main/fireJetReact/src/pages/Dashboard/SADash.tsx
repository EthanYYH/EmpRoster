import SASide from "../../components/SideMenu/SASide";
import RatingChart from "../../SA_components/RatingChart/RatingChart";
import SubscriptionBar from "../../SA_components/SubscriptionBar/SubscriptionBar";
import RegisReq from "../../SA_components/Registration_Request/RegisReq";
import "./SADash.css"
import "../../../public/styles/common.css"

export default function SADash({ className = "" }: BodyProps) {

    return(
        <div className="App-content">
            <SASide />
            <div className="dashboard-content">
                <div className="virtual-data">
                    <RatingChart />
                    {/* <SubscriptionBar /> */}
                </div>
                <div className="table-data">
                    <RegisReq />
                </div>
            </div>
        </div>
    );
}

interface BodyProps {
  className?: string;
}