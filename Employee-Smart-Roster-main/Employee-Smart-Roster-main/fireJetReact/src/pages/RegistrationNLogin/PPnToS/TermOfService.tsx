import React, { useEffect, useState } from 'react';
import './LegalAgreement.css'

const TermsOfService = () => {
  const [content, setContent] = useState<string>('');

  const fetchTermsOfService = async () => {
      // Replace with your actual API call
      const docId = '1poYdw0P5YJ1F_TIV0l_sejlKs8tITgex7ojE0GhdV-Q';
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
    fetchTermsOfService();
  }, []);

  return (
    <div className="privacy-policy-terms-of-service-container">
      Term of service content
      {/* <div 
        className="policy-content" 
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
    </div>
  );
};

export default TermsOfService;