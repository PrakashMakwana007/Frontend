import { useEffect, useState } from "react";
import { FiVideo, FiEye, FiUsers, FiThumbsUp } from "react-icons/fi";
import { motion } from "framer-motion";
import API from "../api/api";
import { useSelector } from "react-redux";
import Loder from "../components/Loder";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const userName = user?.username;  // Assuming `name` is part of the user object
  const userAvatar = user?.avatar; // Assuming `avatar` is part of the user object
  const navigate = useNavigate(); // React Router navigation

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/dashbord/stats/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Dashboard Response:", res);
        setData(res.data.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchDashboardStats();
    }
  }, [token, userId]);

  if (loading) return <Loder />;
  if (error)
    return <div className="p-6 text-center text-red-500">{error}</div>;

  // Navigate to the user's channel page when Total Videos card is clicked
  const handleVideoCardClick = () => {
    navigate(`/channel/${userId}`); // Assuming the route to the channel page is `/channel/:id`
  };

  return (
    <div className="p-6">
      {/* User Info Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={userAvatar || "default-avatar.png"} // Fallback if no avatar
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {userName || "User Name"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Welcome to your dashboard</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard
          icon={<FiVideo />}
          label="Total Videos"
          value={data?.totalVideos || 0}
          onClick={handleVideoCardClick} // Add onClick to navigate
        />
        <StatCard icon={<FiEye />} label="Total Views" value={data?.totalViews || 0} />
        <StatCard icon={<FiUsers />} label="Subscribers" value={data?.totalSuscriber || 0} />
        <StatCard icon={<FiThumbsUp />} label="Total Likes" value={data?.totalLike || 0} />
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex items-center gap-4 cursor-pointer"
    onClick={onClick} // Add the click handler here
  >
    <div className="text-3xl text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{value}</h3>
    </div>
  </motion.div>
);

export default Dashboard;
