import React, { useEffect, useState } from "react";
import LandingPageController from "../../controller/LandingPageController";
import { FaRegCreditCard } from "react-icons/fa";
import "./SubscriptionPlan.css";

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await LandingPageController.getSubscriptionPlan();
      setPlans(data);
    };

    fetchPlans();
  }, []);

  return (
    <div className="subscription-plans">
      <h2>Our Subscription Plans</h2>
      <div className="plans-list">
        {plans.map((plan) => (
          <div key={plan.subsPlanID} className="plan-card">
            <div className="plan-icon">
              <FaRegCreditCard />
            </div>
            <h3>{plan.subscription_name}</h3>
            <p>{plan.subscription_plan_description}</p>
            <p className="plan-price">Price: ${plan.price}</p>
            {/* <p>Employees: {plan.noOfEmps}</p> */}
            {/* <p className="plan-date">Created on: {plan.createdAt}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
