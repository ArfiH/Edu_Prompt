import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../component/Card";

function Channel() {
  const { id } = useParams(); // Get the channel ID from the URL
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        // Fetch channel details
        const channelRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels`,
          {
            params: {
              part: "snippet,statistics",
              id: id,
              key: import.meta.env.VITE_YOUTUBE_API_KEY,
            },
          }
        );

        setChannelDetails(channelRes.data.items[0]);

        // Fetch videos uploaded by the channel
        const videosRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              channelId: id,
              maxResults: 50,
              order: "date",
              key: import.meta.env.VITE_YOUTUBE_API_KEY,
            },
          }
        );

        setVideos(videosRes.data.items);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching channel details:", err);
        setIsLoading(false);
      }
    };

    fetchChannelDetails();
  }, [id]);

  return (
    <div className="channel-container mt-12 px-8">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {channelDetails && (
            <div className="channel-header mb-8">
              <div className="flex items-center gap-4">
                <img
                  src={channelDetails.snippet.thumbnails.high.url}
                  alt={channelDetails.snippet.title}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {channelDetails.snippet.title}
                  </h1>
                  <p className="text-gray-600">
                    {channelDetails.statistics.subscriberCount} subscribers
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                {channelDetails.snippet.description}
              </p>
            </div>
          )}

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Uploaded Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Card
                key={video.etag}
                video={{
                  id: { videoId: video.id.videoId },
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

export default Channel;