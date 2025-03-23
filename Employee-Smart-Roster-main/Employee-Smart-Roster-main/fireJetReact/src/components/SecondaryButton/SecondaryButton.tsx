import "./SecondaryButton.css";
import "../../../public/styles/common.css";

export default function SecondaryButton({
  className = "",
  text = "Text"
}: SecondaryButtonProps) {
  return (
    <div className={`${className} secondary-button-secondary-button`}>
      <div className="secondary-button-text">{text}</div>
    </div>
  );
}

interface SecondaryButtonProps {
  className?: string;
  text?:string;
}