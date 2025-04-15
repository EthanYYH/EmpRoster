import React, { useEffect, useState } from "react";
import "./Title.css";
import LandingPageController from '../../controller/LandingPageController';

const Title: React.FC = () => {
  const [headingData, setHeadingData] = useState({
    heading: "",
    subheading: ""
  });

  useEffect(() => {
    const fetchHeading = async () => {
      try {
        const data = await LandingPageController.getHeading();
        if (data && data.length > 0) {
          setHeadingData({
            heading: data[0].heading,
            subheading: data[0].subheading
          });
        }
      } catch (error) {
        console.error("Error fetching heading data:", error);
        // Optionally, set fallback data or handle the error state here
      }
    };

    fetchHeading();
  }, []);

  return (
    <div className="heading-section">
      <h1>{headingData.heading}</h1>
      <h2>{headingData.subheading}</h2>
    </div>
  );
};

export default Title;
