import axios from "axios";
import { useEffect } from "react";

const useWatchTracker = (videoId, videoTitle, token) => {
  useEffect(() => {
    if (!videoId || !token) return;
    const trackWatch = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/watch",
          { videoId, title: videoTitle },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Failed to update watch history", err);
      }
    };

    trackWatch();
  }, [videoId, videoTitle, token]);
};

export default useWatchTracker;