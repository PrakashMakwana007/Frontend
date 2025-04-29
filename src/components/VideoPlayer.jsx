import React, { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiEye,
  FiVolume2,
  FiVolumeX,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import LikeButton from "./Likebtn";
import SubscribeButton from "./SubsBtn";
import CommentSection from "./Comeent";

const VideoPlayer = ({ video }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("16 / 9");
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likesCount || 0);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const vid = videoRef.current;
      if (vid && vid.videoWidth && vid.videoHeight) {
        const ratio = vid.videoWidth / vid.videoHeight;
        setAspectRatio(ratio < 1 ? "9 / 16" : "16 / 9");
      }
    };

    const currentVideo = videoRef.current;
    if (currentVideo) {
      currentVideo.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [video]);

  if (!video)
    return <div className="text-center py-10 text-gray-400">Loading...</div>;

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (videoRef.current) {
        videoRef.current.muted = newMuted;
      }
      return newMuted;
    });
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };
    console.log("video ss", video.owner._id);
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-tr from-white via-gray-100 to-white dark:from-[#121212] dark:via-[#1a1a1a] dark:to-[#121212] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
    >
      <div
        className="relative w-full rounded-xl overflow-hidden shadow-lg mb-6 border border-gray-300 dark:border-gray-700"
        style={{ aspectRatio }}
      >
        <video
          ref={videoRef}
          src={video?.videoFile || ""}
          controls
          autoPlay
          className="w-full h-full object-contain bg-black rounded-xl"
          muted={isMuted}
        />
      </div>

      <div className="flex items-center gap-4 mb-6 group">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          className="flex items-center gap-2 bg-red-100 dark:bg-red-600/20 hover:bg-red-200 dark:hover:bg-red-500/40 px-4 py-2 rounded-full text-red-600 dark:text-red-400 font-medium transition"
        >
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          {isMuted ? "Unmute" : "Mute"}
        </motion.button>

        <motion.input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-40 accent-red-600"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {Math.round(volume * 100)}%
        </span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight"
      >
        {video.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4"
      >
        <div className="flex items-center gap-2">
          <FiUser className="text-red-500" />
          <span className="font-medium">{video.owner?.username}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiEye className="text-blue-500" />
          <span>{video?.views?.toLocaleString?.() || "0"} views</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between items-center flex-wrap gap-4 mb-6"
      >
        <div className="flex items-center gap-2">
          <LikeButton
            videoId={video._id}
            userId={video.owner?._id}
            onCountChange={setLikeCount}
          />
        </div>
        <SubscribeButton channelId={video.owner?._id} />
      </motion.div>

      <div className="mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
        >
          {showComments ? <FiChevronUp /> : <FiChevronDown />}
          {showComments ? "Hide Comments" : "Show Comments"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2 bg-gray-50 dark:bg-[#181818] p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <CommentSection videoId={video._id} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoPlayer;
