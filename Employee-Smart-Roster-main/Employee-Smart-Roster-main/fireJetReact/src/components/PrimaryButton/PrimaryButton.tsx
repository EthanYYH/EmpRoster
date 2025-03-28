import "./PrimaryButton.css";
import "../../../public/styles/common.css";

export default function PrimaryButton({ 
  text = "Text", onClick, disabled = false 
}: PrimaryButtonProps) {
  return (
      <button 
        className="primary-button"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
  );
}

interface PrimaryButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
}