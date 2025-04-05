import "./Header.css";
import logo from "../../../../public/assets/Logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnLandingPage = location.pathname === "/landing-page";

  return (
    <div className={`${className} header-container`}>

<div>
  <table>
    <td>
    <img src={logo} className="logo2" alt="Logo" />
    </td>
    <td>
    <nav className="nav-menu">
          <ul>
            <li>
              <a
                onClick={!isOnLandingPage ? () => navigate("/landing-page") : undefined}
                style={{
                  cursor: isOnLandingPage ? "default" : "pointer",
                }}
              >
                Home
              </a>
            </li>
            <li><a onClick={() => navigate("/register")}>Register</a></li>
            <li>
              <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Login</a>
            </li>
          </ul>
        </nav>
    </td>
  </table>


</div>
<br></br>


      {/* <header className="header">
        <img src={logo} className="logo" alt="Logo" />
        <nav className="nav-menu">
          <ul>
            <li>
              <a
                onClick={!isOnLandingPage ? () => navigate("/landing-page") : undefined}
                style={{
                  cursor: isOnLandingPage ? "default" : "pointer",
                }}
              >
                Home
              </a>
            </li>
            <li><a href="#register">Register</a></li>
            <li>
              <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Login</a>
            </li>
          </ul>
        </nav>
      </header> */}

      <main className="title-section">
        <h1 className="title">EmpRoster</h1>
      </main>
      <div className="subtitle">Simplify Employee Scheduling and Timesheets</div>
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
