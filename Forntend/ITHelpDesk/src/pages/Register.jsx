import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthCheckbox from "../components/auth/AuthCheckbox";
import AuthButton from "../components/auth/AuthButton";

export default function Register() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Sign up to start managing your IT HelpDesk tickets"
    >
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <AuthInput label="First Name" placeholder="John" />
          <AuthInput label="Last Name" placeholder="Doe" />
        </div>
        <AuthInput label="Email Address" type="email" placeholder="john.doe@company.com" />
        <AuthInput label="Company" placeholder="Your Company Ltd." />
        <AuthInput label="Password" type="password" placeholder="Create a strong password" />
        <AuthInput label="Confirm Password" type="password" placeholder="Confirm your password" />
        <AuthCheckbox label={<span>I agree to the <a href="#" className="text-sky-500 hover:underline">Terms of Service</a> and <a href="#" className="text-sky-500 hover:underline">Privacy Policy</a></span>} />
        <AuthButton>Create Account</AuthButton>
      </form>
      <div className="text-center my-4 text-gray-500">OR</div>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-sky-500 hover:underline">Sign in</a>
      </p>
    </AuthLayout>
  );
}
