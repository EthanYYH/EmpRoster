import React, { useEffect, useState } from "react";
import "./Video.css";
import LandingPageController from "../../controller/LandingPageController";

const extractVideoId = (url: string) => {
  const match = url.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
};

const Video: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await LandingPageController.getVideo();
        if (data && data.length > 0) {
          setVideoUrl(data[0].videoUrl);
        } else {
          console.warn("No video data available, using fallback video.");
          setVideoUrl("https://www.youtube.com/watch?v=A8Hg4z16xLI");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
        setVideoUrl("https://www.youtube.com/watch?v=A8Hg4z16xLI");
      }
    };

    fetchVideo();
  }, []);

  const embedUrl = videoUrl
    ? videoUrl.replace("watch?v=", "embed/") +
      `?autoplay=1&mute=1&loop=1&playlist=${extractVideoId(videoUrl)}`
    : "";

  return (
    <div className="video-section">
      {embedUrl ? (
        <div className="video-container">
          <iframe
            className="video-player"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; fullscreen; encrypted-media"
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
