import axios from "axios";

const VITE_YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const VITE_YOUTUBE_API_KEY2 = import.meta.env.VITE_YOUTUBE_API_KEY2;
const apiKeys = [VITE_YOUTUBE_API_KEY, VITE_YOUTUBE_API_KEY2];
const BASE_URL = "https://www.googleapis.com/youtube/v3";
let currKey = 0;

const getVideosPlaylistsChannels = async (searchQuery) => {
  const newKey = apiKeys[currKey++ % apiKeys.length];
  const res = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      maxResults: 25,
      q: searchQuery,
      order: "relevance",
      relevanceLanguage: "en",
      videoType: "any",
      topicId: "/m/01k8wb",
      safeSearch: "strict",
      key: newKey,
    },
  });
  const videoList = await res.data.items.filter(
    (item) => item.id.kind === "youtube#video"
  );
  console.log(videoList);

  // Filter out items that are playlist or have a playlistId
  const playlistArr = res.data.items.filter(
    (item) => item.id.kind === "youtube#playlist" && item.id.playlistId
  );
  console.log(playlistArr);

  // Filter out items that are channel or have a channelId
  const channelArr = res.data.items.filter(
    (item) => item.id.kind === "youtube#channel" && item.id.channelId
  );
  console.log(channelArr);

  return [videoList, playlistArr, channelArr];
};

// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]
const getVideoByID = async (id) => {
  const newKey = apiKeys[currKey++ % apiKeys.length];
  const res = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet, contentDetails, statistics",
      id: id,
      key: newKey,
    },
  });
  return res.data.items[0];
};

export { getVideosPlaylistsChannels, getVideoByID };
