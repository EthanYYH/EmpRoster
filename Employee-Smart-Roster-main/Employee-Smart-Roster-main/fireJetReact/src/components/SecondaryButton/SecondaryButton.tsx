import "./SecondaryButton.css";
import "../../../public/styles/common.css";

export default function SecondaryButton({
  text = "Text", onClick, disabled = false 
}: SecondaryButtonProps) {
  return (
    <button 
      className="secondary-button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

interface SecondaryButtonProps {
  text?:string;
  onClick?: () => void;
  disabled?: boolean;
}