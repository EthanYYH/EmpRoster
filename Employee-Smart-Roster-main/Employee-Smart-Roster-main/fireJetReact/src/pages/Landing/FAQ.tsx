import React, { useEffect, useState } from "react";
import "./FAQ.css";
import LandingPageController from "../../controller/LandingPageController";

const FAQSection: React.FC = () => {
  const [faqData, setFaqData] = useState<any[]>([]);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const data = await LandingPageController.getFAQ();
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
        // Optionally, handle the error state here
      }
    };

    fetchFAQ();
  }, []);

  return (
    <div className="faq-section">
      <h1 className="faq-heading">Frequently Asked Questions</h1>
      {faqData.length > 0 ? (
        <div className="faq-list">
          {faqData.map((faq) => (
            <div key={faq.faqID} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
              <p className="faq-date">
                <i>Posted on {faq.createdOn}</i>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-faq">No FAQs available at the moment.</p>
      )}
    </div>
  );
};

export default FAQSection;
