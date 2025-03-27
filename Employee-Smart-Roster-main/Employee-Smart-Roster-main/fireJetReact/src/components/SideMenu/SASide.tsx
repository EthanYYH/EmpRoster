import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import "../../../public/styles/common.css"

const SASide = () => {
    useEffect(() => {
        // Add event listeners to all .main elements
        const mainElements = document.querySelectorAll(".main");
    
        mainElements.forEach((main) => {
          main.addEventListener("click", () => {
            // Remove active class and hide all sub-menus
            mainElements.forEach((el) => {
              el.classList.remove("active");
              const subMenu = el.nextElementSibling as HTMLElement;
              if (subMenu && subMenu.classList.contains("sub-menu")) {
                subMenu.style.display = "none";
              }
            });
    
            // Add active class to the clicked .main
            main.classList.add("active");
    
            // Display the corresponding sub-menu
            const subMenu = main.nextElementSibling as HTMLElement;
            if (subMenu && subMenu.classList.contains("sub-menu")) {
              subMenu.style.display = "flex";
            }
          });
        });
    
        // Cleanup event listeners on component unmount
        return () => {
          mainElements.forEach((main) => {
            main.removeEventListener("click", () => {});
          });
        };
      }, []);

    return (
        <div className="App-side-menu">
            <div className="main">
                <Link to="/users-menagement" className="sub-link-hover">
                  VIEW ALL BUSINESS OWNER
                </Link>
            </div>
            <div className="sub-menu user">
                <Link to="/reg-list" className="sub-link-hover">
                  Registration Requests List
                </Link>
            </div>

            <div className="main">
                <Link to="/issues-log" className="sub-link-hover" >
                    VIEW ALL REPORT ISSUES
                </Link>
            </div>

            <div className="main">MANAGE LANDING PAGE</div>
            <div className="sub-menu landing">
                <Link to="/video-management" className="sub-link-hover">
                    View All Uploaded Demo Video
                </Link>
                <Link to="/review-rating-management" className="sub-link-hover">
                    View Review & Rating
                </Link>
                <Link to="/faq-management" className="sub-link-hover">
                    View All FAQs
                </Link>
                <Link to="/landing-page" className="sub-link-hover">
                    Preview Landing Page
                </Link>
            </div>
        </div>
    );
}

export default SASide;