import AppName from "./AppName_s1";
import AppDescriptionDemo from "./AppDescriptionDemo_s2";
import Feedback from "./Feedback"
import SubscriptionPlans from "./SubscriptionPlans"
import FAQFooter from "./FAQFooter"

export default function LandingPage() {
    return (
      <div className="main-container">
        <AppName />
        <AppDescriptionDemo />
        <SubscriptionPlans/>
        <Feedback/>
        <FAQFooter/>
        
      </div>
    );
  }