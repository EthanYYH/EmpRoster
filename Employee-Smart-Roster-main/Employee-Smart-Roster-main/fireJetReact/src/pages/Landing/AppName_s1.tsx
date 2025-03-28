import "./AppName_s1.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

interface AppNameProps {
  className?: string;
}

export default function AppName({ className = "" }: AppNameProps) {
  const navigate = useNavigate();

  return (
    <div className={`${className} app-name-app-name`}>
      <div className="app-name-background" />
      <div className="app-name-background-1" />
      <header className="app-name-header">
        <img src={logo} className="logo" alt="Logo" />
        <div className="navBarButtonsContainer">
        <nav className="navBarButtons">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#news">Register</a></li>
            <li>
              <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Login</a>
            </li>
          </ul>
        </nav>
        </div>
      </header>
      
      <main className="app-name-t-title">
        <h1 className="app-name-title-5">EmpRoster</h1>
      </main>
      <h2 className="app-name-subtitle">Simplify Employee Scheduling and Timesheets</h2>
      <div className="app-name-t-subtitle">
        <p className="app-name-para-1">
          Discover how EmployeeRoster can streamline your employee scheduling process.
        </p>
        <p className="app-name-para-2">
          Our innovative application is designed to enhance operational efficiency and boost employee satisfaction.
        </p>
      </div>
    </div>
  );
}