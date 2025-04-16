import React, { useEffect, useState } from "react";
import "./Video.css";
import LandingPageController from '../../controller/LandingPageController';

const Video: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await LandingPageController.getVideo();
        if (data && data.length > 0) {
          setVideoUrl(data[0].videoUrl);
        } else {
          console.warn("No video data available, using fallback video.");
          setVideoUrl("https://www.example.com/video.mp4");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
        setVideoUrl("https://www.example.com/video.mp4");
      }
    };

    fetchVideo();
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="video-section">
      {videoUrl ? (
        <div className="video-container">
          {!isPlaying && (
            <div className="play-button" onClick={handlePlay}>
              ▶
            </div>
          )}
          <iframe
            className="video-player"
            src={
              isPlaying
                ? videoUrl.replace("watch?v=", "embed/") + "?autoplay=1"
                : ""
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Video;
