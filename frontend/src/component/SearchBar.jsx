import React, { useState, useRef, useEffect } from "react";

const SearchBar = () => {
  const PORT = import.meta.env.VITE_SERVER_PORT;
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceTimeout = useRef(null);
  const wrapperRef = useRef(null);
  console.log("Frontend URL:", import.meta.env.VITE_FRONTEND_URL);
  
  // Debounced fetch
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/suggestions?q=${encodeURIComponent(searchTerm)}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      setSuggestions(data || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        setQuery(suggestions[activeIndex]);
        setSuggestions([]);
        window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/result/${suggestions[activeIndex]}`;
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/result/${suggestion}`;
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto mt-10">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onKeyDownCapture={e => {
          console.log("Key pressed:", e.key);
          if (e.key === "Enter") {
            e.preventDefault();
            if (query.trim()) {
              window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/result/${query}`;
            }
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search YouTube videos..."
        className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
      />

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-64 overflow-auto z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSelect(suggestion)}
              className={`px-4 py-2 cursor-pointer ${
                index === activeIndex ? "bg-blue-100" : "hover:bg-blue-50"
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
