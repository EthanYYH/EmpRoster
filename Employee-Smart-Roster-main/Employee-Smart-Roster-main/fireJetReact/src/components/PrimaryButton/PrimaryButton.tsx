import "./PrimaryButton.css";
import "../../../public/styles/common.css";

export default function PrimaryButton({ className = "", text = "Text" }: PrimaryButtonProps) {
  return (
    <div className={`${className} primary-button-primary-button`}>
      <div className="primary-button-text">{text}</div>
    </div>
  );
}

interface PrimaryButtonProps {
  className?: string;
  text?: string;
}