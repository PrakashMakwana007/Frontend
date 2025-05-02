import { useEffect, useState } from 'react';
import VideoCard from '../components/Videocard';
import { useSearchParams } from 'react-router-dom';
import API from '../api/api';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found. Please log in.');
        return;
      }

      const response = await API.get('/videos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit: 9,
          search: searchQuery,
        },
      });

      const fetchedVideos = Array.isArray(response.data.data.videos)
        ? response.data.data.videos
        : [];
      setVideos((prev) =>
        page === 1 ? fetchedVideos : [...prev, ...fetchedVideos]
      );
      setHasMore(fetchedVideos.length === 9);
    } catch (err) {
      console.error(err);
      setError('Failed to load videos. Please check your internet connection or log in.');
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Fetch videos when page or search query changes
  useEffect(() => {
    fetchVideos();
  }, [page, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-6">
      {searchQuery && (
        <h1 className="text-2xl font-bold mb-6 dark:text-white">
          Search results for: "{searchQuery}"
        </h1>
      )}

      {error && (
        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(videos) && videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* No Videos Message */}
      {!loading && videos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {searchQuery ? 'No videos found' : 'No videos available yet'}
          </p>
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && videos.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
