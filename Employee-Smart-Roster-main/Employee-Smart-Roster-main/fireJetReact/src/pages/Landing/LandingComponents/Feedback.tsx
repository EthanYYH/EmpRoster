import TImage from "../TImage"
import "./Feedback.css";
import feedbackIcon1 from './feedbackIcon1.png';
import feedbackIcon2 from './feedbackIcon1.png';
import feedbackIcon3 from './feedbackIcon1.png';
  
  export default function Feedback({
    className= "",
    
  }: FeedbackProps) {
    
    

    
    
    return (<div
    className={`${className} feedback-feedback`}
    
    
  ><div
    className={`feedback-tt-image-14tjames-fbbusiness-owner-emproster-has-greatly-simplified-scheduling-for-my-business-ensuring-smoother-shift-management-and-reducing-conflicts-among-staff-timage-tbailey-tan-logistics-company-emproster-helps-us-efficiently-manage-employee-shifts-and-workload-distribution-improving-operational-efficiency-and-minimizing-scheduling-errors-timage-tdaniel-wong-healthcare-facility-manager-emproster-has-streamlined-our-staff-scheduling-ensuring-optimal-shift-coverage-and-reducing-last-minute-changes-it-san-essential-tool-for-our-workforce-management`}
    
    
  >
    <TImage
    className={`feedback-t-image-14tjames-fbbusiness-owner-emproster-has-greatly-simplified-scheduling-for-my-business-ensuring-smoother-shift-management-and-reducing-conflicts-among-staff`}
    attr1={feedbackIcon1}
text="James "
text1="(F&B Business Owner)"
text2="EmpRoster has greatly simplified scheduling for my business, ensuring smoother shift management and reducing conflicts among staff" 
    
  >
    
  </TImage>
<TImage
    className={`feedback-t-image-tbailey-tan-logistics-company-emproster-helps-us-efficiently-manage-employee-shifts-and-workload-distribution-improving-operational-efficiency-and-minimizing-scheduling-errors`}
    attr1={feedbackIcon2}
text="Bailey Tan"
text1="(Logistics Company)"
text2="“EmpRoster helps us efficiently manage employee shifts and workload distribution, improving operational efficiency and minimizing scheduling errors”"
    
  ></TImage>
<TImage
    className={`feedback-t-image-tdaniel-wong-healthcare-facility-manager-emproster-has-streamlined-our-staff-scheduling-ensuring-optimal-shift-coverage-and-reducing-last-minute-changes-it-san-essential-tool-for-our-workforce-management`}
    attr1={feedbackIcon3}
text="Daniel Wong"
text1="(Healthcare Facility Manager)"
text2="“EmpRoster has streamlined our staff scheduling, ensuring optimal shift coverage and reducing last-minute changes. It’s an essential tool for our workforce management.”"
    
  ></TImage></div></div>)
  }
  
  interface FeedbackProps {
    className?:string;
    
  }
  