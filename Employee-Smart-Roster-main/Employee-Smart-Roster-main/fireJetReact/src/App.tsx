import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { AlertProvider } from "./components/PromptAlert/AlertContext";
import Alert from "./components/PromptAlert/Alert";

// Pages or Component for general use
import Login from "./pages/RegistrationNLogin/Login";  // Import Login component
import Register from "./pages/RegistrationNLogin/Registration";
import ResetPassword from "./pages/RegistrationNLogin/ResetPW";
import ReqResetEmail from "./pages/RegistrationNLogin/ReqResetEmail";
import Navbar from "./components/NavBar/NavBar";
import GuestLanding from './pages/Landing/LandingPage';
import SideMenu_t from "./components/SideMenu/SideMenu_t";

// Pages for System Admin
import SADash from "./pages/Dashboard/SADash";
import RegisRequests from "./SA_pages/RegisRequest/RegisRequests";
import UserMgts from "./pages/UserManagement/UserMgts";
import UserDetail from "./components/UserMgt/UserDetail";
import PreviewLanding from "./SA_pages/PreviewLanding";
import FAQManagement from "./SA_pages/SA_FAQ/SA_FAQ";


// Pages for Busines Owner
import CompleteProfile from "./BO_pages/FirstLogin/CompleteProfile";
import RequiredCompleteProfile from "./BO_pages/FirstLogin/RequiredCompleteProfile";
import RoleNSkillset from "./BO_pages/RoleNSkillsets/RoleNSkillset";
import BODashboard from "./BO_pages/Dashboard/Dashboard";
import BOViewProfile from "./BO_pages/ViewProfile/ViewProfile";
import BOUpdateBOProfile from "./BO_pages/ViewProfile/BOUpdateBOProfile";
import BOCompanyProfile from "./BO_pages/CompanyProfile/CompanyProfile";
import BOUpdateCompanyProfile from "./BO_pages/CompanyProfile/UpdateProfile";
import BOLeaveManagement from "./BO_pages/LeaveManagement/LeaveManagement";

import ViewRating from "./SA_pages/RegisRequest/ViewRating";

// Pages for Busines Owner
import BOTimelinesPage from "./BO_pages/ViewTimelines/TimelinesPage";
import CreateEmployee from "./BO_components/rolesNskillset/CreateEmployee/CreateEmployee"
import EditEmployee from "./BO_components/rolesNskillset/CreateEmployee/EditEmployee"
import ViewEmployeeDetail from "./BO_components/rolesNskillset/CreateEmployee/ViewEmployeeDetail"
import EmpViewEmployeeDetail from "./BO_components/rolesNskillset/CreateEmployee/EmpViewEmployeeDetail"

// Import for testing
import "./App.css";
import "../public/styles/common.css";

function App() {

  // const { user } = useAuth();
  //console.log(user);

  return (
    <AlertProvider>
    <AuthProvider>
      <div className="App">
        <Router>
          {/* Display navigation bar only when 
              user is not in the following page */}
          <Navbar />
          <div className="App-content" >
            <Routes>
              {/* Route for General pages */}
              <Route path="/home" element={<GuestLanding />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/request-reset-pw-email" element={<ReqResetEmail />} />
              <Route path="/reset-pw" element={<ResetPassword />} />
              {/* <Route path="/reset-pw/:token" element={<ResetPassword />} /> */}
              
              <Route
                path="/users-management"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <UserMgts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user-detail"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
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

              {/* <Route
                path="/view-employee-detail"
                element={
                  // <ProtectedRoute>
                    <ViewEmployeeDetail />
                  // </ProtectedRoute>
                }
                
              /> */}

              <Route
                path="/view-employee-detail"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <ViewEmployeeDetail />
                  </ProtectedRoute>
                }
                />

              <Route
                path="/emp-view-employee-detail"
                element={
                  // <ProtectedRoute>
                    <EmpViewEmployeeDetail />
                  // </ProtectedRoute>
                }
              />

              {/* Route for System Admin Pages */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <SADash />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/registration-req-management"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <RegisRequests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/issues-reported"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <SideMenu_t />
                      <div className="content">
                        <h1>ISSUES LOG</h1>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/video-management"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <SideMenu_t />
                      <div className="content">
                        <h1>Demo Video Management</h1>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/review-rating"
                element={
                  <ProtectedRoute>
                    <div className="App-content">
                      <SideMenu_t />
                      <div className="content">
                        <h1>Review & Rating</h1>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/faqs-management"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <FAQManagement />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/preview-landing-page"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <PreviewLanding />
                  </ProtectedRoute>
                }
              />

              {/* <Route path="/complete-profile" element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <CompleteProfile />
                  </ProtectedRoute>
              }/> */}

              <Route element={<RequiredCompleteProfile/>}>
                {/* Route for Business Owner pages */}
                <Route
                  path="/business-dashboard"
                  element={
                    <ProtectedRoute>
                      <SideMenu_t />
                      <BODashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/view-bo-detail"
                  element={
                    <ProtectedRoute>
                      <SideMenu_t />
                      <BOViewProfile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/update-bo-detail"
                  element={
                    <ProtectedRoute>
                      <SideMenu_t />
                      <BOUpdateBOProfile />
                    </ProtectedRoute>
                  }
                />    
                
                <Route
                  path="/company-detail"
                  element={
                    <ProtectedRoute>
                      <SideMenu_t />
                      <BOCompanyProfile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/update-company-detail"
                  element={
                    <ProtectedRoute>
                      <SideMenu_t />
                      <BOUpdateCompanyProfile />
                    </ProtectedRoute>
                  }
                />    

                <Route
                  path="/roles-skills-menagement"
                  element={
                    <ProtectedRoute>
                      <SideMenu_t />
                      <RoleNSkillset />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/subscription-menagement"
                  element={
                    <ProtectedRoute>
                      <div className="App-content">
                        <SideMenu_t />
                        <h1>Subscription Management</h1>
                      </div>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/timeline-management"
                  element={
                    <ProtectedRoute>
                      <SideMenu_t />
                      <BOTimelinesPage />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/attendance-records-management"
                  element={
                    <ProtectedRoute>
                      <div className="App-content">
                        <SideMenu_t />
                        <h1>Attendance Records Management</h1>
                      </div>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/mc-management"
                  element={
                    <ProtectedRoute>
                      <SideMenu_t />
                      <BOLeaveManagement />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/leave-management"
                  element={
                    <ProtectedRoute>
                      <div className="App-content">
                        <SideMenu_t />
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
                        <SideMenu_t />
                        <h1>Report Issues</h1>
                      </div>
                    </ProtectedRoute>
                  }
                />
              </Route>

              

              {/* Route for Employee pages */}
              <Route
                path="/employee-dashboard"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <div>Employee</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee-projects"
                element={
                  <ProtectedRoute>
                    <SideMenu_t />
                    <div>Employee Project</div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/view-rating"
                element={
                    <ViewRating />
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