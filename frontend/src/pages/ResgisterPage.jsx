// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg(""); 
    if (!name || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (errorMsg) {
      // don't trigger sign-up if email is invalid
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });
      console.log("Registration successful");
      navigate("/sign-in");
    } catch (err) {
      if (err.message === "Request failed with status code 500") {
        setErrorMsg("User already exists. Please try a different email.");
      }
      console.log(err);
    }
    finally {
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
        className="w-full bg-green-600 text-white p-2 rounded cursor-pointer"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
    </div>
  );
}
