import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './auth/Auth';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';
import ProtectedRoute from './components/ProtectRouts';

// Page imports
import Login from './pages/Login';
import Signup from './pages/Singuup';
import HomePage from './pages/Home';
import Upload from './pages/Uplode';
import VideoPage from './pages/Video';
import LikedVideosPage from './pages/Likedvideos';
import SubscribedChannelsPage from './pages/Subcried';
import Dashboard from './pages/Dashbord';
import ChannelPage from './components/Mychanel';
import SearchResults from './pages/Saech';
function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    // <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
      
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

      
        <div className="flex-1 flex flex-col overflow-hidden">
       
          <Navbar
            onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            sidebarCollapsed={sidebarCollapsed}
          />

          {/* Page content */}
          <main
            className={`flex-1 overflow-y-auto transition-all duration-300 ${
              sidebarCollapsed ? 'ml-20' : 'ml-64'
            }`}
          >
            <div className="p-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                
                
                {/* Public routes */}
                // protected routes 
                <Route element={<ProtectedRoute/>}>
                   <Route path="/upload" element={<Upload/>}/>
                   <Route path="/video/:videoId" element={<VideoPage />} />
                   <Route path='/liked-videos' element={<LikedVideosPage/>}/>
                   <Route path='/subscribed-channels' element={<SubscribedChannelsPage/>}/>
                   <Route path='/dashboard' element={<Dashboard/>}/>
                   <Route path='/channel/:id' element={<ChannelPage/>}/>
                   <Route path='/search' element={<SearchResults/>}/>
                </Route>
              </Routes>
            </div>
          </main>
        </div>
      </div>
    // </AuthProvider>
  );
}

export default App;
