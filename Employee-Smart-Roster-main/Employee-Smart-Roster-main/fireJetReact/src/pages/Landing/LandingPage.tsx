import Header from "./LandingComponents/Header";
import AppDescriptionDemo from "./LandingComponents/AppDescriptionDemo_s2";
import Feedback from "./LandingComponents/Feedback"
import SubscriptionPlans from "./LandingComponents/SubscriptionPlans"
import FAQFooter from "./LandingComponents/FAQFooter"
import "./LandingPage.css"

export default function LandingPage() {
    return (
      <div className="main-container">
        <Header />
        <AppDescriptionDemo />
        <SubscriptionPlans/>
        <Feedback/>
        <FAQFooter/>
      </div>
    );
  }