import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BOSide from "../../components/SideMenu/BOSide";
import CompanyController from "../../controller/CompanyController"; // Import if needed for default data
import "./UpdateProfile.css";
import "./CompanyProfile.css";
import "../../../public/styles/common.css";

function UpdateProfile() {
  // Get default company from CompanyController
  const companies = CompanyController.getCompanies();
  const defaultCompany = companies.length > 0 ? companies[0] : null;
  const defaultProfile = defaultCompany
    ? {
        companyName: defaultCompany.bizName,
        address: defaultCompany.address,
        email: defaultCompany.email,
        uen: defaultCompany.UEN,
      }
    : {
        companyName: "",
        address: "",
        email: "",
        uen: "",
      };

  // Optionally, load stored data from localStorage if it exists
  const storedData = localStorage.getItem("companyProfile");
  const initialProfile = storedData ? JSON.parse(storedData) : defaultProfile;

  const [companyName, setCompanyName] = useState(initialProfile.companyName);
  const [address, setAddress] = useState(initialProfile.address);
  const [email, setEmail] = useState(initialProfile.email);
  const [uen, setUen] = useState(initialProfile.uen); // Preserve UEN

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save the UEN along with the other fields
    const updatedProfile = { companyName, address, email, uen };
    localStorage.setItem("companyProfile", JSON.stringify(updatedProfile));
    navigate("/company-detail"); // Redirect to CPContents
  };

  return (
    <div className="App-content">
      <BOSide />
      <div className="content">
        <h1 className="logo">EmpRoster</h1>
        <div className="main-contents">
          <div className="company-profile">
            <h1 className="company-profile_title">Edit Company Profile</h1>
            <div className="company-profile_layout">
              <div className="company-profile_card">
                <div className="company-profile_icon">
                  <FaUserCircle size={80} />
                </div>
                <form className="company-profile_info" onSubmit={handleSubmit}>
                  <p className="company-profile_label">Company Name</p>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />

                  <p className="company-profile_label">Address</p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <p className="company-profile_label">Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {/* Optionally, you can display the UEN if needed */}
                  <p className="company-profile_label">UEN</p>
                  <input type="text" value={uen} readOnly />

                  <button type="submit" className="button_control">
                    <div className="primary-button">Submit</div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
