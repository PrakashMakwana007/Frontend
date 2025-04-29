import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiUpload, FiX, FiVideo, FiImage } from "react-icons/fi";
import toast from "react-hot-toast"; // Toast notifications
import useSound from "use-sound"; // Sound effect
import successSound from "../Photo/success-1-6297.mp3"; // Your success sound file
import PublishButton from "../components/Publishbtn";
import API from "../api/api"; // Your API instance
const Upload = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sound effect hook
  const [playSuccess] = useSound(successSound);

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
      } else {
        setError("Please select a valid video file");
      }
    }
  };

  // Handle thumbnail image selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setThumbnail(file);
        setThumbnailPreview(URL.createObjectURL(file));
      } else {
        setError("Please select a valid image file for thumbnail");
      }
    }
  };

  // Clear video selection
  const clearVideo = () => {
    setVideoFile(null);
    setVideoPreview("");
  };

  // Clear thumbnail selection
  const clearThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setError("Please select a video file");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Send request to API
      const response = await API.post(
        `${import.meta.env.VITE_API_BASE_URL}/videos`, // Use your API base URL
        // "https://backend-k3gt.onrender.com/api/v1/videos",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Play success sound and show success toast
      playSuccess();
      toast.success("Video uploaded successfully!");

      // Redirect after successful upload
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to upload video");
      toast.error(error.response?.data?.message || "Failed to upload video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-white">Upload Video</h1>

      {error && (
        <div className="mb-6 p-3 bg-red-900 border border-red-700 text-red-100 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video Upload */}
        <div className="space-y-2">
          <label className="block text-gray-300 font-medium">
            Video File (Required)
          </label>
          {!videoPreview ? (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <FiVideo className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-gray-400">
                  Click to select video file
                </span>
                <span className="text-gray-500 text-sm mt-1">
                  MP4, WebM, etc.
                </span>
              </label>
            </div>
          ) : (
            <div className="relative">
              <video
                src={videoPreview}
                controls
                className="w-full rounded-lg"
                height="240"
              />
              <button
                type="button"
                onClick={clearVideo}
                className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
              >
                <FiX className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <label className="block text-gray-300 font-medium">
            Thumbnail (Optional)
          </label>
          {!thumbnailPreview ? (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <FiImage className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-gray-400">
                  Click to select thumbnail image(Give only  horigantl  image)
                </span>
                <span className="text-gray-500 text-sm mt-1">
                  JPG, PNG, etc.
                </span>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={thumbnailPreview}
                alt="Video thumbnail"
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={clearThumbnail}
                className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
              >
                <FiX className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-gray-300 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-300 font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows="4"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading || !videoFile}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading || !videoFile
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <PublishButton />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
