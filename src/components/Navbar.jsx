import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu, FiSearch, FiUser, FiLogOut, FiUpload } from 'react-icons/fi';
import { clearCredentials } from '../store/authSlice';
import { logout } from '../api/auth.api';
import Logo from '../Photo/Screenshot 2025-04-29 094650.png'; // Path to your logo image

const Navbar = ({ onMenuClick, sidebarCollapsed, onSearchSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);
  const isAuthenticated = !!accessToken; // Check if user is authenticated

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/'); // Redirect to home page after login
    }
  }, [isAuthenticated, navigate, location]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    if (searchQuery) {
      onSearchSubmit?.(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      if (accessToken) {
        await dispatch(logout()).unwrap();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearCredentials());
      navigate('/login');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-30">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          {sidebarCollapsed && (
            <div
              onClick={() => navigate('/')}
              className="flex items-center cursor-pointer"
            >
              {/* Logo Image */}
              <img
                src={Logo} // Using the imported logo image
                alt="Logo"
                className="h-8 w-8 mr-2 transition-transform duration-300 transform hover:rotate-12 hover:scale-110 rounded-full"
              />
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                VideoTube
              </h1>
            </div>
          )}
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/upload')}
                className={`hidden md:flex items-center px-3 py-2 rounded-lg ${
                  location.pathname === '/upload'
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition`}
              >
                <FiUpload className="mr-2" />
                Upload
              </button>
              <div className="flex items-center space-x-2">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user?.username ? user.username[0].toUpperCase() : 'U'}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Login"
            >
              <FiUser className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// Compare this snippet from src/components/Navbar.jsx: