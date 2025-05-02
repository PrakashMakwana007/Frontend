import { useState, useEffect } from 'react';
import { FiSend, FiTrash2 } from 'react-icons/fi';
import API from '../api/api';

const CommentSection = ({ videoId, userId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await API.get(`/comment/${videoId}/comments`, {
        headers: { Authorization: `Bearer ${userId}` },
      });
      setComments(response.data.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    if (videoId && userId) fetchComments();
  }, [videoId, userId]);

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        await API.post(
          `/comment/${videoId}/comments`,
          { content: comment },
          { headers: { Authorization: `Bearer ${userId}` } }
        );
        setComment('');
        fetchComments();
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comment/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${userId}` },
      });
      fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleCommentSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white sm:w-3/4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center sm:w-1/4 justify-center"
        >
          <FiSend />
          <span className="ml-2">Send</span>
        </button>
      </form>

      {/* Comments List */}
      <div className="mt-4 space-y-2">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex justify-between items-center"
            >
              <div className="text-gray-800 dark:text-gray-200">
                <strong>{comment.owner?.username}:</strong> {comment.content}
              </div>

              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="text-red-600 hover:text-red-800 p-2 rounded-full"
                title="Delete Comment"
              >
                <FiTrash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
