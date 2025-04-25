import React, { useEffect, useState } from "react";
import logo from "./../../src/logo.png";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("name");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    window.location.href = "/sign-in"; // or navigate with useNavigate
  };

  return (
    <header className="app-header">
      <div className="header-container p-4 flex justify-between items-center">
        <a href="/" className="logo flex items-center gap-1 text-xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
          Edu<span>Prompt</span>
        </a>

        {user ? (
          <div className="flex items-center gap-4">
            { user.length <= 5 ? 
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto ">
                <span className="text-blue-600 text-sm font-bold">{user}</span>
              </div> :
            <span className="font-medium">Hello {user}</span>
            }
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button
              className="btn btn-outline"
              onClick={() => (window.location.href = "/sign-up")}
            >
              Sign Up
            </button>
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = "/sign-in")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
