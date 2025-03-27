import "./FAQFooter.css";
import faqIcon from './faqIcon.png';

export default function FAQFooter({ className = "" }: FAQFooterProps) {
  return (
    <div className={`${className} faq-footer-faq-footer`}>
      <div className="faq-footer-t-image-tfrequently-asked-questions-1can-emproster-be-customized-for-different-business-needs-yes-emproster-is-flexible-and-can-be-tailored-to-suit-different-industries-shift-structures-and-employee-roles-ensuring-it-meets-your-specific-workforce-management-requirements-2is-emproster-accessible-on-mobile-devices-yes-emproster-is-fully-responsive-and-can-be-accessed-on-any-mobile-device-allowing-managers-and-employees-to-view-schedules-make-updates-and-track-attendance-on-the-go" >
        <img
          className="faq-footer-image"
          src={faqIcon}
          loading="lazy"
         />
        <div className="faq-footer-t-frequently-asked-questions-1can-emproster-be-customized-for-different-business-needs-yes-emproster-is-flexible-and-can-be-tailored-to-suit-different-industries-shift-structures-and-employee-roles-ensuring-it-meets-your-specific-workforce-management-requirements-2is-emproster-accessible-on-mobile-devices-yes-emproster-is-fully-responsive-and-can-be-accessed-on-any-mobile-device-allowing-managers-and-employees-to-view-schedules-make-updates-and-track-attendance-on-the-go" >
          <div className="faq-footer-frequently-asked-questions">
            Frequently Asked Questions:
          </div>
          <div className="faq-footer-can-emproster-be-customized-for-different-business-needs-yes-emproster-is-flexible-and-can-be-tailored-to-suit-different-industries-shift-structures-and-employee-roles-ensuring-it-meets-your-specific-workforce-management-requirements-2is-emproster-accessible-on-mobile-devices-yes-emproster-is-fully-responsive-and-can-be-accessed-on-any-mobile-device-allowing-managers-and-employees-to-view-schedules-make-updates-and-track-attendance-on-the-go" >
            <span>
              <p className="faq-footer-para">
                1. Can EmpRoster be customized for different business needs?
              </p>
              <p>
                Yes, EmpRoster is flexible and can be tailored to suit different industries, shift structures, and employee roles, ensuring it meets your specific workforce management requirements.
              </p>
              <div className="faq-footer-spacer" />
              <p className="faq-footer-para-2">
                2. Is EmpRoster accessible on mobile devices?
              </p>
              <p>
                Yes, EmpRoster is fully responsive and can be accessed on any mobile device, allowing managers and employees to view schedules, make updates, and track attendance on the go.
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FAQFooterProps {
  className?: string;
}
