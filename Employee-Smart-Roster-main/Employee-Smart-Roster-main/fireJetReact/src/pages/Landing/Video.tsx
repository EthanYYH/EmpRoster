import React, { useEffect, useState } from "react";
import "./Video.css";
import LandingPageController from '../../controller/LandingPageController';

const Video: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Attempt to retrieve video data from your controller.
        const data = await LandingPageController.getVideo();
        // Assume the data returns an array of objects with a "videoUrl" property.
        if (data && data.length > 0) {
          setVideoUrl(data[0].videoUrl);
        } else {
          // If no video data is returned, use a fallback video URL.
          console.warn("No video data available, using fallback video.");
          setVideoUrl("https://www.example.com/video.mp4");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
        // Fallback to a default video URL if the fetch fails.
        setVideoUrl("https://www.example.com/video.mp4");
      }
    };

    fetchVideo();
  }, []);

  return (
    <div className="video-section">
      {videoUrl ? (
        <iframe
          className="video-player"
          width="100%"
          height="400"
          src={videoUrl.replace("watch?v=", "embed/")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
  
};

export default Video;
