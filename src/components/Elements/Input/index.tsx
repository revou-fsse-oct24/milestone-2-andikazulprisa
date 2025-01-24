import React from 'react';
import Label from './Label';
import Input from './Input';

interface InputFormProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const InputForm: React.FC<InputFormProps> = (props) => {
  const { label, name, type, placeholder } = props;
  return (
    <div className='mb-6'>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputForm;