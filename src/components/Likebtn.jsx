import { useState, useEffect } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import API from "../api/api";

const LikeButton = ({ videoId, userId, onCountChange }) => {
  const [isLiked, setIsLiked] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial state
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await API.get(`/like/status/v/${videoId}`, {
          headers: { Authorization: `Bearer ${userId}` }
        });
        
        setIsLiked(res.data.data?.isLiked || false);
        setLikeCount(res.data.data?.likeCount || 0);
      } catch (err) {
        console.error("Fetch like error:", err);
        setError("Failed to load like status");
      }
    };

    if (videoId && userId) fetchLikeStatus();
  }, [videoId, userId]);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await API.post(
        `/like/toggle/v/${videoId}`,
        null,
        { headers: { Authorization: `Bearer ${userId}` } }
      );

      console.log("Like response:", res.data);

      const newLikeStatus = res.data.data?.isLiked;
      const newCount = res.data.data?.likeCount;

      setIsLiked(newLikeStatus);
      setLikeCount(newCount);

      if (onCountChange) onCountChange(newCount);

    } catch (err) {
      console.error("Toggle like error:", err);
      setError(err.response?.data?.message || "Failed to toggle like");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleLike}
        disabled={isLoading}
        className={`flex items-center gap-2 p-2 rounded-lg transition-all
          ${isLiked ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100"}
          ${isLoading ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
      >
        {isLiked ? (
          <FiThumbsUp className="text-xl" />
        ) : (
          <FiThumbsDown className="text-xl" />
        )}
        <span className="font-medium">{likeCount}</span>
      </button>
      
      {error && (
        <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="ml-2 text-red-800 font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
