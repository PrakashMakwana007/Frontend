import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(true);

  // Hide sidebar and navbar on login/signup routes
  const hideOnRoutes = ['/login', '/signup'];
  const shouldHideLayout = hideOnRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!shouldHideLayout && (
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      )}
      <div className="flex-1 flex flex-col min-h-screen">
        {!shouldHideLayout && <Navbar toggleSidebar={toggleSidebar} />}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
