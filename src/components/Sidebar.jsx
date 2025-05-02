import {
  FiHome,
  FiHeart,
  FiUsers,
  FiBookmark,
  FiMonitor,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
    { icon: FiHeart, label: 'Liked Videos', path: '/liked-videos' },
    { icon: FiUsers, label: 'Subscribed Channels', path: '/subscribed-channels' },
    { icon: FiBookmark, label: 'My Channel', path: '/channel/:id' },
    { icon: FiMonitor, label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <aside
      className={`
        fixed md:relative top-0 left-0 h-screen z-40
        bg-white dark:bg-gray-900 shadow-md border-r dark:border-gray-800
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16 sm:w-20' : 'w-48 sm:w-64'}
      `}
    >
      <div className="h-full flex flex-col overflow-hidden">
        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 
                    hover:bg-gray-200 dark:hover:bg-gray-700
                    ${isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300'}`
                  }
                >
                  <item.icon className="text-xl min-w-[24px]" />
                  {!collapsed && (
                    <span className="ml-3 whitespace-nowrap text-sm font-medium">
                      {item.label}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-lg 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <FiChevronRight className="text-xl" />
            ) : (
              <>
                <FiChevronLeft className="text-xl" />
                <span className="ml-2 text-sm hidden sm:inline">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
