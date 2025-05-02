import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ChannelCard = ({ channel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col sm:flex-row"
    >
      <Link
        to={`/channel/${channel._id}`}
        className="flex-shrink-0 w-full sm:w-60 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
      >
        <img
          src={
            channel.avatar?.startsWith("http")
              ? channel.avatar
              : `${import.meta.env.VITE_BACKEND_URL}/${channel.avatar}`
          }
          alt={channel.username || channel.name}
          className="w-full h-40 sm:h-60 object-cover p-2"
        />
      </Link>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            {channel.username || channel.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {channel.description || "No channel description."}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {channel.subscribersCount ?? 0} subscribers
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChannelCard;
