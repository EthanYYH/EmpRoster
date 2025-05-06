import React, { useEffect, useState } from 'react';
import './LegalAgreement.css'

const PrivacyPolicy = () => {
  const [content, setContent] = useState<string>('');

  const fetchPrivacyPolicy = async () => {
      // Replace with your actual API call
      const docId = '1TCSe1LBCNS_V-7y64TBTBexAhjnyhrTo9XYHz_jDP4Q';
      const res = await fetch(
          `https://docs.googleapis.com/v1/documents/${docId}?key=YOUR_API_KEY`
      );
      const data = await res.json();
      
      // Convert Google Doc JSON to HTML (simplified example)
      let html = '';
      data.body.content.forEach((section: any) => {
          if (section.paragraph) {
          section.paragraph.elements.forEach((elem: any) => {
              if (elem.textRun) {
              html += elem.textRun.content;
              }
          });
          html += '<br/>';
          }
      });
      setContent(html);
  };
  useEffect(() => {
      fetchPrivacyPolicy();
  }, []);

  return (
    <div className="privacy-policy-terms-of-service-container">
      Privacy policy content
      {/* <div 
        className="policy-content" 
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
    </div>
  );
};

export default PrivacyPolicy;