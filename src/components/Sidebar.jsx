import { 
  FiHome,
  FiHeart,
  FiUsers,
  FiFilm,
  FiBookmark,
  FiMonitor,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
    { icon: FiHeart, label: 'Liked Videos', path: '/liked-videos' },
    { icon: FiUsers, label: 'Subscribed Channels', path: '/subscribed-channels' },
    {icon:FiBookmark ,label:'MY Chanael',path:'/channel/:id'},
    // { icon: FiFilm, label: 'Playlists', path: '/playlists' },
    { icon: FiMonitor, label: 'Dashboard', path: '/dashboard' }
  ]

  return (
    <aside className={`
      fixed md:relative h-full z-40 bg-white dark:bg-gray-900 shadow-lg
      transition-all duration-300 ease-in-out
      ${collapsed ? 'w-20' : 'w-64'}
    `}>
      <div className="h-full flex flex-col">
        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => ` 
                    flex items-center p-3 rounded-lg 
                    hover:bg-gray-200 dark:hover:bg-gray-700
                    transition-colors duration-200
                    ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}
                  `}
                >
                  <item.icon className="text-xl" />
                  {!collapsed && (
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Collapse button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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
                <span className="ml-2">Close</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
