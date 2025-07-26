import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState.jsx';
import Layout from '../components/Layout.jsx';
import LoadingSpinner from '../components/LoadingSpinner';

const SettingsPage = () => {
  const { user, handleUpdateAccount, handleChangePassword, handleDeleteAccount, loading } = useAppState();
  const [activeTab, setActiveTab] = useState('account');
  const [accountData, setAccountData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    timezone: 'EST'
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  return (
    <Layout title="Settings">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('account')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'account'
                    ? 'border-b-2 border-slate-800 text-slate-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'security'
                    ? 'border-b-2 border-slate-800 text-slate-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'notifications'
                    ? 'border-b-2 border-slate-800 text-slate-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Notifications
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                  <form onSubmit={(e) => { e.preventDefault(); handleUpdateAccount(accountData); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                        value={accountData.name}
                        onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                        value={accountData.email}
                        onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                        value={accountData.phone}
                        onChange={(e) => setAccountData({...accountData, phone: e.target.value})}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                        value={accountData.timezone}
                        onChange={(e) => setAccountData({...accountData, timezone: e.target.value})}
                      >
                        <option value="EST">Eastern Time</option>
                        <option value="CST">Central Time</option>
                        <option value="MST">Mountain Time</option>
                        <option value="PST">Pacific Time</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading && <LoadingSpinner />}
                      Update Account
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(passwordData); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading && <LoadingSpinner />}
                      Change Password
                    </button>
                  </form>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-slate-800 border-gray-300 rounded focus:ring-slate-800" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-slate-800 border-gray-300 rounded focus:ring-slate-800" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Incident Alerts</h4>
                        <p className="text-sm text-gray-500">Get notified about new incidents</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-slate-800 border-gray-300 rounded focus:ring-slate-800" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Training Reminders</h4>
                        <p className="text-sm text-gray-500">Get reminded about upcoming training</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-slate-800 border-gray-300 rounded focus:ring-slate-800" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage; 