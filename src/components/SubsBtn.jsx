import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUserPlus, FiUserCheck, FiLoader, FiUserX } from "react-icons/fi";
import API from "../api/api";
import { useSelector } from "react-redux";

const SubscribeButton = ({ channelId }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.accessToken);
  const userId = user?._id;

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOwnChannel = channelId === userId;

  // Fetch subscription status on component mount or when channelId, userId, or token change
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!channelId || !userId || !token || isOwnChannel) return;

      console.log("Fetching subscription status for channelId:", channelId, "userId:", userId);

      try {
        const res = await API.get(`/subscriptions/c/${channelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Subscription status response:", res);
        const { subscriptionCount } = res.data.data;
        setIsSubscribed(subscriptionCount > 0);
      } catch (err) {
        console.error("Error fetching subscription status:", err);
        setIsSubscribed(false);
      }
    };

    fetchSubscriptionStatus();
  }, [channelId, userId, token, isOwnChannel]);

  // Toggle subscription status
  const toggleSubscription = async () => {
    setLoading(true);
    try {
      const res = await API.post(`/subscriptions/c/${channelId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { subscribe: newState } = res.data.data;
      setIsSubscribed(newState);
    } catch (err) {
      console.error("Failed to toggle subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      whileTap={{ scale: 0.92 }}
      whileHover={{
        scale: 1.05,
        boxShadow: isOwnChannel
          ? "none"
          : isSubscribed
          ? "0 0 12px rgba(255,255,255,0.4)"
          : "0 0 14px rgba(255, 0, 0, 0.6)",
      }}
      onClick={toggleSubscription}
      disabled={loading || isOwnChannel}
      title={isOwnChannel ? "You cannot subscribe to your own channel" : ""}
      className={`relative flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300
        ${isOwnChannel
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : isSubscribed
          ? "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
          : "bg-red-600 text-white hover:bg-red-700"}
        ${isSubscribed && !isOwnChannel ? "ring-2 ring-red-400 ring-opacity-60" : ""}`}
    >
      {loading ? (
        <>
          <FiLoader className="animate-spin" />
          Loading...
        </>
      ) : isOwnChannel ? (
        <>
          <FiUserX />
          Cannot Subscribe
        </>
      ) : isSubscribed ? (
        <>
          <FiUserX />
          Unsubscribe
        </>
      ) : (
        <>
          <FiUserPlus />
          Subscribe
        </>
      )}

      <AnimatePresence>
        {isSubscribed && !loading && !isOwnChannel && (
          <motion.span
            key="subscribed-status"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-green-500 text-xs"
          >
            <FiUserCheck className="inline mr-1" />
            Subscribed
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SubscribeButton;
