import React, { useEffect, useState } from "react";
import homePageSVG from "../home-page-svg.svg";
import home1 from "../home1.svg";
import home2 from "../home2.svg";
import home3 from "../home3.svg";
// import homePageSVG from '../student_jumping.svg'
import SearchBar from "../component/SearchBar";

function Home() {
  const [notes, setNotes] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);

  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/watch", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setWatchHistory(data);
      } catch (err) {
        console.error("Error fetching watch history:", err);
      }
    };

    fetchWatchHistory();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const text = await res.text();

        const data = JSON.parse(text);
        setNotes(data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover the Joy of Learning
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Explore thousands of educational videos from top instructors
                around the world. Learn at your own pace and expand your
                knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#watch-history" className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition duration-300">
                  See Watch History
                </a>
                <a href="#saved-notes" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 font-medium py-3 px-6 rounded-lg transition duration-300">
                  Browse Notes
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              {/* <img src={home1 || homePageSVG} alt="Student learning online" className="rounded-lg shadow-lg" /> */}
              <img src={home2 || homePageSVG} alt="Student learning online" />
              {/* <img src={home3 || homePageSVG} alt="Student learning online" className="rounded-lg shadow-lg" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <SearchBar />

        {/* Saved Notes Section */}
        <div id="saved-notes" className="mb-16 mt-10">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            📚 Your Saved Notes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.length > 0 && notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-accent">
                    {note.title}
                  </h3>
                  <div
                    className="prose prose-sm max-w-none text-gray-700 line-clamp-6 relative"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
                <div className="px-6 pb-6 mt-auto">
                  <a
                    href={`/video/${note.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium bg-accent text-white rounded-full px-4 py-2 hover:bg-blue-600 transition"
                  >
                    ▶ Show More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently watched videos Section */}
        <div id="watch-history" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            🎞 Watch History
          </h2>
          {watchHistory.length === 0 ? <p className="p-4">Watch history is empty</p> : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {watchHistory.map((video) => (
              <a
                key={video._id}
                href={`/video/${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                    alt={video.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800 group-hover:text-accent line-clamp-2">
                  {video.title}
                </p>
              </a>
            ))}
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
