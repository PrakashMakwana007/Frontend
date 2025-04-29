import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/api";
import { FiVideo, FiEye, FiThumbsUp, FiUsers, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loder from "../components/Loder";

const MyChannel = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const userName = user?.username;
  const userAvatar = user?.avatar;
  const userCoverImage = user?.coverImage; // 👉 get the cover image

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch channel data
  useEffect(() => {
    const fetchChannelData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/dashbord/stats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const videoRes = await API.get(`/dashbord/videos/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data.data);
        setVideos(videoRes.data.data);
      } catch (err) {
        setError("YOU HAVE NOT ANY VIDEO!! UPLOAD VIDEO");
        console.error("ERROR", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchChannelData();
    }
  }, [token, userId]);

  // Handle video delete
  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await API.delete(`/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
    } catch (err) {
      console.error("Failed to delete video", err);
      alert("Failed to delete video. Please try again.");
    }
  };

  if (loading) return <Loder />;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${userCoverImage || '/default-cover.jpg'})`, // 👉 dynamic cover image
      }}
    >
      {/* overlay for better readability */}
      <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-md min-h-screen p-6">
        
        {/* Channel Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={userAvatar || "default-avatar.png"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {userName || "User Name"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome to your channel
            </p>
          </div>
        </div>

        {/* Channel Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<FiVideo />} label="Total Videos" value={data?.totalVideos || 0} />
          <StatCard icon={<FiEye />} label="Total Views" value={data?.totalViews || 0} />
          <StatCard icon={<FiUsers />} label="Subscribers" value={data?.totalSuscriber || 0} />
          <StatCard icon={<FiThumbsUp />} label="Total Likes" value={data?.totalLike || 0} />
        </div>

        {/* Uploaded Videos */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Your Videos
          </h3>
          {videos.length === 0 ? (
            <div className="text-center text-gray-500">No videos uploaded yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"
                    onClick={() => handleVideoClick(video._id)}
                  />
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 truncate">
                    {video.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{video.views} Views</span>
                    <span>{video.likes} Likes</span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteVideo(video._id)}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    title="Delete Video"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex items-center gap-4 hover:shadow-xl transition-all duration-300">
    <div className="text-4xl text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{value}</h3>
    </div>
  </div>
);

export default MyChannel;
