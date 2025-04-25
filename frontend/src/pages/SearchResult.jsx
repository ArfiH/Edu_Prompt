import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideos } from "../api/youtube";
import Card from "../component/Card";
import SearchBar from "../component/SearchBar";

function SearchResult() {
  const { query } = useParams();
  const [videoList, setVideoList] = useState([]);

  const [searchQuery, setSearchQuery] = useState(query || "");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVideos(searchQuery || "Reactjs videos").then((res) => {
      if (res && res.length > 0) {
        setVideoList(res);
        setFilteredVideos(res);

        // Set the first video as featured if available, replace it with last viewed video
        setFeaturedVideo(res[0]);
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <div className="search-result-container px-8">
      {/* Search bar */}
      <SearchBar />

      {/* Featured video, replace it with last viewed video */}
      {featuredVideo && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Featured Content
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3">
                <div className="bg-gray-700 aspect-video">
                  {/* Featured video thumbnail */}
                  <img
                    src={
                      featuredVideo.snippet?.thumbnails?.high?.url ||
                      "/api/placeholder/800/450"
                    }
                    alt={featuredVideo.snippet?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6 md:w-1/3">
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {featuredVideo.snippet?.title || "Featured Educational Video"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {featuredVideo.snippet?.description?.substring(0, 150) ||
                    "Learn from the best instructors and expand your knowledge with our carefully curated educational content."}
                  {featuredVideo.snippet?.description?.length > 150
                    ? "..."
                    : ""}
                </p>
                <div className="flex items-center mb-4">
                  {/* Add channel avatar her
                    <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div> */}

                  <span className="text-sm text-gray-700">
                    By{" "}
                    {featuredVideo.snippet?.channelTitle || "Expert Instructor"}
                  </span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                  <a href={`/video/${featuredVideo.id.videoId}`}>Watch Now</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Recommended Videos
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map((vid) => (
              <Card key={vid.etag} video={vid} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No videos found
            </h3>
            <p className="text-gray-500">
              Try different search terms or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
