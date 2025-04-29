import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
        email,
        password,
      });
      localStorage.setItem("name", res.data.user.name);
      console.log(res.data.user.name);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
      setErrorMsg("");
      // navigate("/");
    } catch (err) {
      if (err.message === "Request failed with status code 401") {
        setErrorMsg("Invalid credentials. Please try again.");
      }
      else if (err.message === "Request failed with status code 404") {
        setErrorMsg("User not found. Please check your email.");
      }
      else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGuestLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/guest`);
      localStorage.setItem("token", res.data.token);
      navigate("/guest");
    } catch (err) {
      alert("Guest login failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login to EduPrompt</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 mb-2 rounded cursor-pointer">
        Login
      </button>
      <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
      <button onClick={handleGuestLogin} className="w-full bg-gray-600 text-white p-2 rounded cursor-pointer">
        Continue as Guest
      </button>
      <p className="mt-4 text-sm">
        Don't have an account? <a href="/sign-up" className="text-blue-500">Register</a>
      </p>
    </div>
  );
}
