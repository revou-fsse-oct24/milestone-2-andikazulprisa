import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "bg-blue-600 w-full", 
  onClick = () => {}, 
  type = "button",
}) => {
  return (
    <button 
      className={`h-10 px-6 font-semibold rounded-md ${variant} text-white`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

