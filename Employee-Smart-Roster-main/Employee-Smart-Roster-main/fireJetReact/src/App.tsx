import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login";  // Import Login component
import Navbar from "./components/NavBar/NavBar";
import GuestLanding from './pages/Landing/landing'

// Pages for System Admin
import SADash from "./pages/Dashboard/SADash";
import RegisRequests from "./SA_pages/RegisRequest/RegisRequests";
import UserMgts from "./pages/UserManagement/UserMgts";
import RegisReqDetail from "./SA_components/Registration_Request/RegisReqDetail"
import UserDetail from "./components/UserMgt/UserDetail";

// Pages for Busines Owner
import RoleNSkillset from "./BO_pages/RoleNSkillsets/RoleNSkillset";

// Import side menu
import SASide from "./components/SideMenu/SASide";
import BOSide from "./components/SideMenu/BOSide";

import "./App.css";
import "../public/styles/common.css";

function App() {
  
   const { user } = useAuth();
   console.log(user);

  return (
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
                  <ProtectedRoute>
                    <UserMgts />
                  </ProtectedRoute>
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
                  <ProtectedRoute>
                    <div className="App-content">
                      <GuestLanding />
                    </div>
                  </ProtectedRoute>
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
  );
}

export default App;