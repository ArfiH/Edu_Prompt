import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from "./component/Header";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Footer from "./component/Footer";
import SearchResult from "./pages/SearchResult";
import Test from "./pages/Test";
import RegisterPage from "./pages/ResgisterPage";
import LoginPage from "./pages/LoginPage";
import Playlist from "./pages/Playlist";
import Channel from "./pages/Channel";


const token = localStorage.getItem("token");

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="app-container min-h-screen bg-gray-200">
        <Header />
        <main className="mt-[-2rem]">
          <BrowserRouter>
            <Routes>
              {token ? (<Route index element={<Home />} />) : (<Route index element={<LoginPage />} />)}
              <Route path="video/:id" element={<Video />} />
              <Route path="playlist/:id" element={<Playlist />} />
              <Route path="channel/:id" element={<Channel />} />
              <Route path="result/:query" element={<SearchResult />} />
              <Route path="test" element={<Test />} />
              <Route path="sign-up" element={<RegisterPage />} />
              <Route path="sign-in" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
