import "./SubscriptionPlans.css";
import subscriptionIcon from './subscriptionPlan.png';

export default function SubscriptionPlans({
  className = "",
}: SubscriptionPlansProps) {
  return (
    <div className={`${className} subscription-plans-subscription-plans`}>
      <div className="subscription-plans-t-image-13subscription-plans">

          <img className="icons" src={subscriptionIcon} alt="Logo" />
        <div className="subscription-plans-subscription-plans-1">
          Subscription Plans
        </div>

        <div>

        </div>
      </div>
      <div className="subscription-plans-ttt-starter-plan-for-small-teams-up-to-10users-ttbusiness-plan-for-growing-teams-up-to-50users-tbusiness-plan-for-growing-teams-up-to-50users" >

      <table>

<tr>
  <th>Starter Plan</th>
  <th>Basic Plan</th>
  <th>Advanced Plan</th>
</tr>

<tr>
  <td>Free for up to 2 users</td>
  <td>For small teams up to 20 users</td>
  <td>$20 for the first 20 users, $3 per user thereafter</td>
</tr>
</table>
        {/* <div className="subscription-plans-t-starter-plan-for-small-teams-up-to-10users" >
          <div className="subscription-plans-starter-plan-for-small-teams">
            <span>
              {"Starter Plan "}
              <span className="subscription-plans-text">
                - For Small Teams
              </span>
            </span>
          </div>
          <div className="subscription-plans-up-to-10users">
            Up to 10 users
          </div>
        </div>
        <div className="subscription-plans-tt-business-plan-for-growing-teams-up-to-50users-tbusiness-plan-for-growing-teams-up-to-50users" >
          <div className="subscription-plans-t-business-plan-for-growing-teams-up-to-50users" >
            <div className="subscription-plans-business-plan-for-growing-teams" >
              <p>
                {"Business  Plan "}
                <span className="subscription-plans-text-1">
                  - For Growing Teams
                </span>
              </p>
            </div>
            <div className="subscription-plans-up-to-50users">
              Up to 50 users
            </div>
          </div>
          <div className="subscription-plans-t-business-plan-for-growing-teams-up-to-50users-1" >
            <div className="subscription-plans-business-plan-for-growing-teams-1" >
              <p>
                {"Business  Plan "}
                <span className="subscription-plans-text-2">
                  - For Growing Teams
                </span>
              </p>
            </div>
            <div className="subscription-plans-up-to-50users-1">
              Up to 50 users
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

interface SubscriptionPlansProps {
  className?: string;
}
