import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { type, placeholder, name } = props;
  return (
    <input 
      type={type}
      className='text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50'
      placeholder={placeholder}
      name={name}
      id={name}
    />
  );
};

export default Input;