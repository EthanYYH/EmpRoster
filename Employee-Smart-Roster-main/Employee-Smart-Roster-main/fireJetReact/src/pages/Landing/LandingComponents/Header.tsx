import "./Header.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={`${className} header-container`}>
      <div className="background-overlay"></div>
      <div className="background-dim"></div>
      <header className="header">
        <img src={logo} className="logo" alt="Logo" />
        <nav className="nav-menu">
          <ul>
          <li>
              <a onClick={() => navigate("/landing-page")} style={{ cursor: "pointer" }}>Home</a>
            </li>
            <li><a href="#register">Register</a></li>
            <li>
              <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Login</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="title-section">
        <h1 className="title">EmpRoster</h1>
      </main>
      <h2 className="subtitle">Simplify Employee Scheduling and Timesheets</h2>
      <div className="description">
        <p className="description-text">
          Discover how EmpRoster can streamline your employee scheduling process.
        </p>
        <p className="description-text">
          Our innovative application is designed to enhance operational efficiency and boost employee satisfaction.
        </p>
      </div>
    </div>
  );
}
