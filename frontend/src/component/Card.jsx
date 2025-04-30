import React from "react";

function Card({ video, playlist, channel }) {
  return (
    <div className="card-container text-center rounded-3xl bg-primary">
      {video && (
        <a href={`/video/${video.id.videoId}`}>
          <div className="img-container m-auto w-[100%] overflow-hidden rounded-t-xl">
            <img
              className="w-[100%] m-auto"
              src={video.snippet.thumbnails.high.url}
              width={video.snippet.thumbnails.default.width}
              height={video.snippet.thumbnails.default.height}
              alt={video.snippet.description}
            />
          </div>
          <div className="video-description px-4">
            <h3 className="font-semibold">{video.snippet.title}</h3>
            <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
          </div>
        </a>
      )}
      {playlist && (
        <a href={`/playlist/${playlist.id.playlistId}`}>
          <div className="img-container m-auto w-[100%] overflow-hidden rounded-t-xl">
            <img
              className="w-[100%] m-auto"
              src={playlist.snippet.thumbnails.high.url}
              width={playlist.snippet.thumbnails.default.width}
              height={playlist.snippet.thumbnails.default.height}
              alt={playlist.snippet.description}
            />
          </div>
          <div className="video-description px-4">
            <h3 className="font-semibold">{playlist.snippet.title}</h3>
            <p className="text-sm text-gray-600">{playlist.snippet.channelTitle}</p>
          </div>
        </a>
      )}
      {channel && (
        <a href={`/channel/${channel.id.channelId}`}>
          <div className="img-container m-auto w-[100%] overflow-hidden rounded-t-xl">
            <img
              className="w-[100%] m-auto"
              src={channel.snippet.thumbnails.high.url}
              width={channel.snippet.thumbnails.default.width}
              height={channel.snippet.thumbnails.default.height}
              alt={channel.snippet.description}
            />
          </div>
          <div className="video-description px-4">
            <h3 className="font-semibold">{channel.snippet.title}</h3>
            <p className="text-sm text-gray-600">{channel.snippet.description}</p>
          </div>
        </a>
      )}
    </div>
  );
}

export default Card;