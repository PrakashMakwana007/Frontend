import { useState } from "react";
import { FiThumbsUp, FiUser, FiMessageCircle, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoCard = ({ video }) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const isVertical = video.aspectRatio === "vertical";

  return (
    <div
      onClick={() => navigate(`/video/${video._id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      {/* Thumbnail / Preview */}
      <div className={`relative w-full ${isVertical ? "h-[420px]" : "h-60"} overflow-hidden bg-black flex items-center justify-center`}>
        {isHovered ? (
          <video
            src={video.videoUrl}
            className="w-full h-full object-contain transition-all duration-300"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* View Count */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          <FiEye className="inline-block mr-1" />
          {video.views || 0}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
          {video.title}
        </h3>

        {/* Channel Name */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FiUser />
          <span className="truncate">{video.ownerName}</span>
        </div>

        {/* Bottom Interaction Row */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700 mt-3 text-sm">
          {/* Like Count */}
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <span>{video.likesCount || 0} LIKE</span>
          </div>

          <div className="text-gray-600 dark:text-gray-300">
            <span role="img" aria-label="enjoy">🎉 Enjoy the Video!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
