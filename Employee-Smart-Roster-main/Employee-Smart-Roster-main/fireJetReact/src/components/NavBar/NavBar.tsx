import { useAuth } from "../../AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Import resources
import { LuLogOut, CgProfile } from "../../../public/Icons.js";
import LogoutController from '../../controller/User/LogoutController';
import appLogo from "../../../public/assets/Logo.svg";
import "./NavBar.css"; 
import "../../../public/styles/common.css";

const { LogUserOut } = LogoutController;

const Navbar = () => {
    const { isLoggedIn, logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const isOnLanding = location.pathname.includes('');
    const isOnLogin = location.pathname.includes('login');
    const isOnRegister = location.pathname.includes('register');
    const isOnReqResetEmail = location.pathname.includes('request-reset-pw-email');
    const isOnResetPw = location.pathname.includes('reset-pw');

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
            {isLoggedIn 
             && !isOnLanding
             && !isOnLogin
             && !isOnRegister
             && !isOnReqResetEmail
             && !isOnResetPw 
             && (
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