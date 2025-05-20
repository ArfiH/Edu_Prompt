import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '');

  const handleGoogleSuccess = async (response) => {
    try {
      console.log("Google login response:", response);
      
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
      console.error('Google login error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        backendUrl
      });
      setErrorMsg(err.response?.data?.error || "Google login failed. Please try again.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => {
      console.error('Google login error:', error);
      setErrorMsg("Google login failed. Please try again.");
    },
    flow: 'implicit',
  });

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      if (!email || !password) {
        setErrorMsg("Please fill in all fields.");
        setLoading(false);
        return;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        setErrorMsg("Invalid email format.");
        return;
      }

      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const res = await axios.post(
        `${backendUrl}/api/auth/signin`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
      setErrorMsg("");
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMsg("Invalid credentials. Please try again.");
      } else if (err.response?.status === 404) {
        setErrorMsg("User not found. Please check your email.");
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    try {
      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const res = await axios.post(
        `${backendUrl}/api/auth/guest`
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      window.location.href = "/";
    } catch (err) {
      console.error("Guest login failed:", err);
      alert("Guest login failed. Please try again.");
    } finally {
      setGuestLoading(false);
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
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 mb-2 rounded cursor-pointer"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button
        onClick={() => login()}
        className="w-full bg-white text-gray-700 p-2 mb-2 rounded cursor-pointer border flex items-center justify-center gap-2"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>
      <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
      <button
        onClick={handleGuestLogin}
        className="w-full bg-gray-600 text-white p-2 rounded cursor-pointer"
      >
        {guestLoading ? "Loading..." : "Continue as Guest"}
      </button>
      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-blue-500">
          Register
        </a>
      </p>
    </div>
  );
}
