import React from "react";
import axios from "axios";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthCheckbox from "../components/auth/AuthCheckbox";
import AuthButton from "../components/auth/AuthButton";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // console.log("Logging in with:", { email, password, rememberMe });

    try {
      console.log("Attempting login with:", { email, password, rememberMe });
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        passwordHash : password,
      });

      // Assuming API returns { token: "...", user: {...} }
      const { token } = res.data;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Redirect after login
      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your IT HelpDesk dashboard"
    >
      <form className="space-y-4" onSubmit={handleLogin}>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="admin@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-between items-center">
          <AuthCheckbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <a href="#" className="text-sm text-sky-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <AuthButton type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In to HelpDesk"}
        </AuthButton>
      </form>

      <div className="text-center my-4 text-gray-500">OR</div>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-sky-500 hover:underline">
          Create account
        </a>
      </p>
    </AuthLayout>
  );
}
