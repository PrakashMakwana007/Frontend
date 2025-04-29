import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      setLoading(false);
      return;
    }
  
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/videos`, {
          params: {
            query: searchTerm,
            page: 1,
            limit: 20,
          },
        });
        setResults(res.data?.videos || []);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchResults();
  }, [searchTerm]);
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Search results for: <span className="text-blue-600">"{searchTerm}"</span>
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((video) => (
            <div key={video._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">{video.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">By {video.ownerName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No videos found.</p>
      )}
    </div>
  );
};

export default SearchResults;
