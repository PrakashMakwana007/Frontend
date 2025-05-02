import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import Loder from "../components/Loder";
import API from "../api/api"; // assuming you're using axios
import { useSelector } from "react-redux"; // only for token
import ChannelCard from "../components/Chanel"; // ✅ import the component

const SubscribedChannelsPage = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  console.log("userId ", userId); // Check if userId is being fetched correctly

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/subscriptions/u/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Subscriptions Response:", res);

        // Directly assign the data from the response
        const channels = res.data.data; 
        console.log(res,"ressub")// Access the array directly
        setSubscriptions(channels);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError("Failed to load subscribed channels.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchSubscriptions();
    }
  }, [token, userId]); // Ensure userId is included as a dependency

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
        <FiUsers className="text-blue-500 text-xl md:text-2xl" />
        Subscribed Channels
      </h2>

      {subscriptions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't subscribed to any channels yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subscriptions.map((channel) => (
            // Render ChannelCard directly, no need to check for ownerId anymore
            <ChannelCard key={channel._id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscribedChannelsPage;
