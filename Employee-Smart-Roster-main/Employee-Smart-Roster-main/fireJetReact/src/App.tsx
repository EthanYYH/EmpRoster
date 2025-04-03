import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { AlertProvider } from "./components/PromptAlert/AlertContext";
import Alert from "./components/PromptAlert/Alert";

// Pages or Component for general use
import Login from "./components/Login";  // Import Login component
import Navbar from "./components/NavBar/NavBar";
import GuestLanding from './pages/Landing/LandingPage'

// Pages for System Admin
import SADash from "./pages/Dashboard/SADash";
import RegisRequests from "./SA_pages/RegisRequest/RegisRequests";
import UserMgts from "./pages/UserManagement/UserMgts";
import RegisReqDetail from "./SA_components/Registration_Request/RegisReqDetail"
import UserDetail from "./components/UserMgt/UserDetail";

// Pages for Busines Owner
import RoleNSkillset from "./BO_pages/RoleNSkillsets/RoleNSkillset";
import CreateEmployee from "./BO_components/rolesNskillset/CreateEmployee/CreateEmployeeOLD"
import EditEmployee from "./BO_components/rolesNskillset/CreateEmployee/EditEmployee"
import Test123 from "./BO_components/rolesNskillset/CreateEmployee/test123"


// Import side menu
import SASide from "./components/SideMenu/SASide";
import BOSide from "./components/SideMenu/BOSide";

import "./App.css";
import "../public/styles/common.css";

function App() {
  
   //const { user } = useAuth();
   //console.log(user);

  return (
    <AlertProvider>
    <AuthProvider>
      <div className="App">
        <Router>
          <Navbar />
          <div className="App-content" >
            <Routes>
              {/* Route for General pages */}
              <Route path="/" element={<Login />} />

              <Route
                path="/users-menagement"
                element={
                  // <ProtectedRoute>
                    <UserMgts />
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/user-detail"
                element={
                  <ProtectedRoute>
                    <UserDetail />
                  </ProtectedRoute>
                }
              />

            <Route
                path="/create-employee"
                element={
                  // <ProtectedRoute>
                    <CreateEmployee />
                  // </ProtectedRoute>
                }
              />

<Route
                path="/edit-employee"
                element={
                  // <ProtectedRoute>
                    <EditEmployee />
                  // </ProtectedRoute>
                }
              />

<Route
                path="/test123"
                element={
                  // <ProtectedRoute>
                    <Test123 />
                  // </ProtectedRoute>
                }
              />

              {/* Route for System Admin pages */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <SADash />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/regis-request-detail"
                element={
                  <ProtectedRoute>
                    <RegisReqDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reg-list"
                element={
                  <ProtectedRoute>
                    <RegisRequests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/issues-log"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <SASide />
                      <h1>ISSUES LOG</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/video-management"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <SASide />
                      <h1>Demo Video Management</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/review-rating-management"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <SASide />
                      <h1>Review & Rating Management</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/faq-management"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <SASide />
                      <h1>FAQ Management</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/landing-page"
                element={
                  // <ProtectedRoute>
                    <div className="App-content">
                      <GuestLanding />
                    </div>
                  // </ProtectedRoute>
                }
              />

              {/* Route for Business Owner pages */}
              <Route
                path="/business-dashboard"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <BOSide />
                      <h1>Business Owner Dasboard</h1>
                    </div>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/company-detail"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <BOSide />
                      <h1>My Company</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/roles-skills-menagement"
                element={
                  <ProtectedRoute>
                    <RoleNSkillset />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/subscription-menagement"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <BOSide />
                      <h1>Subscription Management</h1>
                    </div>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/timeline-management"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <BOSide />
                      <h1>Timeline Management</h1>
                    </div>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/attendance-records-management"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <BOSide />
                      <h1>Attendance Records Management</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/mc-management"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <BOSide />
                      <h1>MC Management</h1>
                    </div>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/leave-management"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <BOSide />
                      <h1>Leave Management</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/report-issues"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <BOSide />
                      <h1>Report Issues</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Route for Employee pages */}
              <Route
                path="/employee-dashboard"
                element={
                  <ProtectedRoute>
                    <div>Employee</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee-projects"
                element={
                  <ProtectedRoute>
                    <div>Employee Project</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </AuthProvider>
    <Alert />
    </AlertProvider>
  );
}

export default App;