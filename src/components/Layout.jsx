import React from 'react';
import { useAppState } from '../hooks/useAppState';

const Layout = ({ children, title }) => {
  const { 
    currentPage, 
    setCurrentPage, 
    user, 
    sidebarOpen, 
    setSidebarOpen, 
    handleLogout 
  } = useAppState();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'DS' },
    { id: 'workforce', label: 'Workforce', icon: 'WF' },
    { id: 'compliance', label: 'Compliance', icon: 'CP' },
    { id: 'incidents', label: 'Incidents', icon: 'IN' },
    { id: 'training', label: 'Training', icon: 'TR' },
    { id: 'reports', label: 'Reports', icon: 'RP' },
    { id: 'settings', label: 'Settings', icon: 'ST' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center px-6 py-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-600 rounded text-white flex items-center justify-center text-sm font-bold">JS</div>
              <span className="text-white text-xl font-bold">JobShield</span>
            </div>
          </div>

          {user && (
            <div className="px-6 py-4 border-b border-slate-700">
              <div className="bg-slate-700 rounded p-3">
                <div className="text-white font-semibold">{user.name}</div>
                <div className="text-slate-300 text-sm capitalize">{user.role}</div>
              </div>
            </div>
          )}

          <nav className="flex-1 px-6 py-4">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded mb-1 transition-colors ${
                  currentPage === item.id 
                    ? 'bg-slate-700 text-white border-l-4 border-slate-400' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="text-xs bg-slate-600 px-1 py-0.5 rounded">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded mt-6 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <span className="text-xs bg-slate-600 px-1 py-0.5 rounded">LO</span>
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <div className="w-6 h-6 flex flex-col justify-center">
                  <div className="w-full h-0.5 bg-current mb-1"></div>
                  <div className="w-full h-0.5 bg-current mb-1"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                </div>
              </button>
              <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
            </div>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout; 