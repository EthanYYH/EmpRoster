import "./AppDescriptionDemo_s2.css";
import appDescriptionIcon1 from './appDescriptionIcon1.png';
import appDescriptionIcon2 from './appDescriptionIcon2.png';
import appDescriptionIcon3 from './appDescriptionIcon3.png';
import sampleVideo from './sampleVideo.png';


export default function AppDescriptionDemo({
  className = "",
}: AppDescriptionDemoProps) {
  return (
    <div className={`${className} app-description-demo-app-description-demo`}>
      <div className="app-description-demo-t-time-management-efficient-scheduling-efficiently-manage-employee-shifts-and-schedules-with-our-intuitive-platform-our-system-simplifies-the-process-ensuring-smooth-operations-and-effective-utilization-of-resources-communication-seamless-collaboration-facilitate-seamless-communication-among-team-members-with-employeeroster-our-application-fosters-collaboration-ensuring-everyone-is-informed-and-connected-productivity-boost-efficiency-maximize-productivity-within-your-business-by-utilizing-employeeroster-sfeatures-our-tools-are-designed-to-streamline-operations-reduce-errors-and-increase-overall-efficiency-demo-video" >
        <div className="app-description-demo-time-management-efficient-scheduling-efficiently-manage-employee-shifts-and-schedules-with-our-intuitive-platform-our-system-simplifies-the-process-ensuring-smooth-operations-and-effective-utilization-of-resources-communication-seamless-collaboration-facilitate-seamless-communication-among-team-members-with-employeeroster-our-application-fosters-collaboration-ensuring-everyone-is-informed-and-connected-productivity-boost-efficiency-maximize-productivity-within-your-business-by-utilizing-employeeroster-sfeatures-our-tools-are-designed-to-streamline-operations-reduce-errors-and-increase-overall-efficiency" >
          <span>
            <p>Time Management</p>
            
            <div className="app-description-demo-spacer" />
            <p className="app-description-demo-para-1">
              <table>
                <tr>
                  <td>
                  Efficient Scheduling 
                  </td>
                  <td className="floatRight">
                  <img className="icons" src={appDescriptionIcon1} alt="Logo" />
                  </td>
                </tr>
              </table>
             
            </p>
            <div className="app-description-demo-spacer-1" />
            <p>
              Efficiently manage employee shifts and schedules with our intuitive platform. Our system simplifies the process, ensuring smooth operations and effective utilization of resources.
            </p>
            <div className="app-description-demo-spacer-2" />
            <div className="app-description-demo-spacer-3" />
            <p>Communication</p>
            <div className="app-description-demo-spacer-4" />
            <p className="app-description-demo-para-4">
            <table>
                <tr>
                  <td>
                  Seamless Collaboration
                  </td>
                  <td className="floatRight">
                  <img className="icons" src={appDescriptionIcon2} alt="Logo" />
                  </td>
                </tr>
              </table>
              
            </p>
            <div className="app-description-demo-spacer-5" />
            <p>
              Facilitate seamless communication among team members with EmployeeRoster. Our application fosters collaboration, ensuring everyone is informed and connected.
            </p>
            <div className="app-description-demo-spacer-6" />
            <p>Productivity</p>
            <div className="app-description-demo-spacer-7" />
            <p className="app-description-demo-para-7">
            <table>
                <tr>
                  <td>
                  Boost Efficiency
                  </td>
                  <td className="floatRight">
                  <img className="icons" src={appDescriptionIcon3} alt="Logo" />
                  </td>
                </tr>
              </table>
            </p>
            <div className="app-description-demo-spacer-8" />
            <p>
              ​Maximize productivity within your business by utilizing EmployeeRoster's features.
            </p>
            <p>
              Our tools are designed to streamline operations, reduce errors, and increase overall efficiency.
            </p>
          </span>
        </div>
        <div className="app-description-demo-demo-video">
          
          <div className="app-description-demo-background" />
          <div className="app-description-demo-background-1" />
          <img
            className="app-description-demo-image"
            src={sampleVideo}
            loading="lazy"
           />
        </div>
      </div>
    </div>
  );
}

interface AppDescriptionDemoProps {
  className?: string;
}
