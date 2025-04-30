import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../component/Card";

function Playlist() {
  const { id } = useParams(); // Get the playlist ID from the URL
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: "snippet",
              maxResults: 50, // Fetch up to 50 videos in the playlist
              playlistId: id,
              key: import.meta.env.VITE_YOUTUBE_API_KEY,
            },
          }
        );

        setVideos(res.data.items); // Set videos in the playlist
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching playlist details:", err);
        setIsLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  return (
    <div className="playlist-container mt-12 px-8">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Playlist Videos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Card
                key={video.etag}
                video={{
                  id: { videoId: video.snippet.resourceId.videoId }, // Pass videoId
                  snippet: video.snippet,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Playlist;