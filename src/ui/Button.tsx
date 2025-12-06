interface ButtonProps {
  onClick: () => void;
  style: string;
  text: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  style,
  text,
  disabled = false,
}) => {
  return (
    <button onClick={onClick} className={style} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
