import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { FiUser, FiMail, FiLock, FiImage, FiUpload } from 'react-icons/fi';
import Loder from '../components/Loder'; // Import the Loader component

const Singup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullname: '',
    password: '',
    avatar: null,
    coverImage: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.avatar) {
        throw new Error('Avatar is required');
      }

      // Create FormData and verify each field
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);  // Make sure this isn't undefined
      data.append('fullname', formData.fullname);
      data.append('password', formData.password);
      data.append('avatar', formData.avatar);
      
      // Optional cover image
      if (formData.coverImage) {
        data.append('coverImage', formData.coverImage);
      }

      // Debug: Check what's being sent
      console.log('FormData contents:');
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_REGISTER_URL}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Backend response:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Create Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Username"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Email"
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Full Name"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Password"
            />
          </div>
        </div>

        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Profile Picture (Required)
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <FiUpload className="w-6 h-6 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.avatar ? formData.avatar.name : 'Click to upload avatar'}
              </span>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                required
                className="hidden"
              />
            </label>
            {formData.avatar && (
              <img
                src={URL.createObjectURL(formData.avatar)}
                alt="Avatar preview"
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Cover Image (Optional)
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <FiImage className="w-6 h-6 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.coverImage ? formData.coverImage.name : 'Click to upload cover image'}
              </span>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {formData.coverImage && (
              <img
                src={URL.createObjectURL(formData.coverImage)}
                alt="Cover preview"
                className="w-16 h-12 rounded object-cover"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? <Loder /> : 'Register'} {/* Show Loader component when loading */}
        </button>
      </form>

      <div className="mt-4 text-center text-sm dark:text-gray-400">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Singup;
