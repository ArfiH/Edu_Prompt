// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '');

  const handleGoogleSuccess = async (response) => {
    try {
      console.log("Google signup response:", response);
      
      // Get user info from Google
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${response.access_token}` },
        }
      );
      
      console.log("Google user info:", userInfo.data);

      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      // Send to backend
      const res = await axios.post(
        `${backendUrl}/api/auth/google`,
        {
          googleId: userInfo.data.sub,
          email: userInfo.data.email,
          name: userInfo.data.name,
        }
      );

      console.log("Backend response:", res.data);

      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.error('Google signup error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        backendUrl
      });
      setErrorMsg(err.response?.data?.error || "Google signup failed. Please try again.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => {
      console.error('Google signup error:', error);
      setErrorMsg("Google signup failed. Please try again.");
    },
    flow: 'implicit',
  });

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg("");
    if (!name || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Invalid email format.");
      return;
    }

    if (!passwordRegex.test(password)) {
      if (password.length < 8) {
        setErrorMsg("Password must be at least 8 characters long.");
        return;
      }
      if (!/[A-Z]/.test(password)) {
        setErrorMsg("Password must contain at least one uppercase letter.");
        return;
      }
      if (!/[0-9]/.test(password)) {
        setErrorMsg("Password must contain at least one number.");
        return;
      }
    }

    try {
      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      await axios.post(`${backendUrl}/api/auth/signup`, {
        name,
        email,
        password,
      });
      console.log("Registration successful");
      window.location.href = "/sign-in";
      // navigate("/sign-in");
    } catch (err) {
      if (err.message === "Request failed with status code 500") {
        setErrorMsg("User already exists. Please try a different email.");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Register for EduPrompt</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        // validate email format
        onChange={(e) => {
          const emailValue = e.target.value;
          setEmail(emailValue);
          if (!/\S+@\S+\.\S+/.test(emailValue)) {
            setErrorMsg("Invalid email format");
          } else {
            setErrorMsg("");
          }
        }}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white p-2 mb-2 rounded cursor-pointer"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <button
        onClick={() => login()}
        className="w-full bg-white text-gray-700 p-2 mb-2 rounded cursor-pointer border flex items-center justify-center gap-2"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>
      <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <a href="/sign-in" className="text-blue-500">
          Login
        </a>
      </p>
    </div>
  );
}
