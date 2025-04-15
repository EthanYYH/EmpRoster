import React, { useEffect, useState } from "react";
import LandingPageController from "../../controller/LandingPageController";
import { FaDollarSign, FaUsers, FaCalendarAlt } from "react-icons/fa";
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
            <h3>{plan.subscription_name}</h3>
            <div className="plan-icons">
              <FaDollarSign />
              <FaUsers />
              <FaCalendarAlt />
            </div>
            <p>{plan.subscription_plan_description}</p>
            <p>Price: ${plan.price}</p>
            <p>Employees: {plan.noOfEmps}</p>
            <p>Created on: {plan.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
