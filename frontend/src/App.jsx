import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Footer from "./component/Footer";
import SearchResult from "./pages/SearchResult";
import Test from "./pages/Test";
import RegisterPage from "./pages/ResgisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="app-container min-h-screen bg-gray-200">
      <Header />
      <main className="mt-[-2rem]">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="video/:id" element={<Video />} />
            <Route path="result/:query" element={<SearchResult />} />
            <Route path="test" element={<Test />} />
            <Route path="sign-up" element={<RegisterPage />} />
            <Route path="sign-in" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />

    </div>
  );
}

export default App;
