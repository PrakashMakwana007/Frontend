import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api';
import VideoPlayer from '../components/VideoPlayer';
import Loder from '../components/Loder';

const VideoPage = () => {
  const { videoId } = useParams(); // /video/:id
  // console.log("videoid",videoId);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await API.get(`/videos/${videoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch video data');
        }

        setVideo(response.data.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError('Error fetching video data'); // Handle error
        setLoading(false); // Stop loading in case of error
        console.error('Error fetching video:', err);
      }
    };

    fetchVideo();
  }, [videoId]);

  // If there's an error, show it
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      {loading ? <Loder /> : <VideoPlayer video={video} />}
    </div>
  );
};

export default VideoPage;
