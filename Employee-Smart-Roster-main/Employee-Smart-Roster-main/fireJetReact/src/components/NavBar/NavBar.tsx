import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";

// Import resources
import { LuLogOut, CgProfile } from "../../../public/Icons.js";
import LogoutController from '../../controller/User/LogoutController';
import appLogo from "../../../public/assets/Logo.svg";
import "./Navbar.css"; 
import "../../../public/styles/common.css";

const { LogUserOut } = LogoutController;

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
        const response = await LogUserOut({email: user?.email});
    
        if(response.success){
            logout(); // Call the logout function from AuthContext
            navigate("/"); // Redirect to the login page
        }
        
    } catch (err){
        logout(); // Call the logout function from AuthContext
        navigate("/"); // Redirect to the login page
        // Return this later
        // console.error("Logout failed:", err);
        // alert("Logout failed. Please try again.");
    }
  };

  return (
    <div>
        {isLoggedIn && (
            <div className="navbar">
                <div className="front">
                    {user?.role === "System Admin" && (
                        <Link to="/admin-dashboard" className="nav-link">
                            <img src={appLogo} alt="Dashboard"></img>
                        </Link>
                    )}
                    {user?.role === "Business Owner" && (
                        <Link to="/business-dashboard" className="nav-link">
                            <img src={appLogo} alt="Dashboard"></img>
                        </Link>
                    )}
                    {user?.role === "Employee" && (
                        <Link to="/employee-dashboard" className="nav-link">
                            <img src={appLogo} alt="Dashboard"></img>
                        </Link>
                    )}
                    <span className="user-role">Welcome back, {user?.role}</span>
                </div>
                <div className="btn-group">
                    {user?.role !== "System Admin" && (
                        <Link to="/user-profile" className="nav-link">
                            <button  className="logout-button">
                                <CgProfile />
                            </button>
                        </Link>
                    )}
                    <button onClick={handleLogout} className="logout-button">
                        <LuLogOut />
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default Navbar;