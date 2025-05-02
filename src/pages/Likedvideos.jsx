import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import Loder from "../components/Loder";
import API from "../api/api";
import { useSelector } from "react-redux";
import { formatDuration } from "../components/Duration";

const LikedVideosPage = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await API.get("/like/videos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const videos = res.data.data.map((item) => item.video);
        setLikedVideos(videos);
      } catch (err) {
        console.error("Error fetching liked videos:", err);
        setError("Failed to load liked videos.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchLikedVideos();
    }
  }, [token]);

  if (loading) return <Loder />;
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-800 dark:text-white">
        <FiHeart className="text-red-500" />
        Liked Videos
      </h2>

      {likedVideos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't liked any videos yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {likedVideos.map((video) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col sm:flex-row"
            >
              <Link to={`/video/${video._id}`} className="flex-shrink-0 w-full sm:w-60">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover sm:rounded-l-xl"
                />
              </Link>

              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {video.description || "No description available."}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {video.views} views
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedVideosPage;
