import React from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormRegister: React.FC = () => {
  return (
    <form action="">
      <InputForm
        label="Full Name"
        type="text"
        placeholder="insert your name"
        name="fullname"
      />
      <InputForm
        label="Email"
        type="email"
        placeholder="contoh@mail.com"
        name="email"
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="**********"
        name="email"
      />
      <InputForm
        label="Confirm Password"
        type="password"
        placeholder="**********"
        name="confirmPassword"
      />
      <Button variant="bg-blue-600 w-full">Register</Button>
    </form>
  );
};

export default FormRegister;
