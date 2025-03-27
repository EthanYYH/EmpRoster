import "./AppName_s1.css";
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';


export default function AppName({ className = "" }: AppNameProps) {
  const navigate = useNavigate();
  return (
    <div className={`${className} app-name-app-name`}>
      <div className="app-name-background" />
      <div className="app-name-background-1" />
      <div className="app-name-header">
        <div className="app-name-nav-bar-system-admin">
          <div className="app-name-t-image-9tnavigation-pill-title-ttitle-ttitle-ttitle" >
            <div className="app-name-image">
            <img className="icons" src={logo} alt="Logo" />
            </div>
            
            
            <div className="app-name-t-navigation-pill-title-ttitle-ttitle-ttitle" >
              <div className="app-name-title">Home</div>
<div onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} // Changes cursor to indicate it's clickable
>
Login
</div>
              
              {/* <div className="app-name-title-2">Register</div> */}

              <div onClick={() => navigate('/guest-register')} style={{ cursor: 'pointer' }} // Changes cursor to indicate it's clickable
              >
              Register
              </div>
              
              {/* <div className="app-name-title-3">About Our Team</div> */}
          
            </div>
          </div>
          <div className="app-name-register-button">
            
          </div>
        </div>
      </div>
      <div className="app-name-t-title">
        <div className="app-name-title-5">EmpRoster</div>
      </div>
      <div className="app-name-subtitle">
        Simplify Employee Scheduling and Timesheets
      </div>
      <div className="app-name-t-subtitle">
        <div className="app-name-subtitle-1">
          <span>
            <p className="app-name-para-1">
              {
                "Discover how EmployeeRoster can streamline your employee scheduling process. "
              }
            </p>
            <p className="app-name-para-2">
              Our innovative application is designed to enhance operational efficiency and boost employee satisfaction.
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

interface AppNameProps {
  className?: string;
}
