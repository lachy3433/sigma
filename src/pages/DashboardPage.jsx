import React from 'react';
import { useAppState } from '../hooks/useAppState';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const { user, workforce, incidents, certifications, trainings, setShowModal, handleQuickAction } = useAppState();

  const stats = [
    { label: 'Active Workers', value: workforce.filter(w => w.status === 'Active').length, color: 'bg-blue-500' },
    { label: 'Open Incidents', value: incidents.filter(i => i.status === 'Open').length, color: 'bg-red-500' },
    { label: 'Certifications', value: certifications.filter(c => c.status === 'Valid').length, color: 'bg-green-500' },
    { label: 'Active Trainings', value: trainings.filter(t => t.status === 'In Progress').length, color: 'bg-purple-500' }
  ];

  const recentActivity = [
    { id: 1, type: 'incident', message: 'New incident reported at Site Alpha', time: '2 hours ago' },
    { id: 2, type: 'training', message: 'John Martinez completed Fall Protection training', time: '5 hours ago' },
    { id: 3, type: 'certification', message: 'Sarah Johnson\'s certification expiring soon', time: '1 day ago' },
    { id: 4, type: 'worker', message: 'New worker Emily Chen joined the team', time: '2 days ago' }
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-slate-200">Here's your safety overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg opacity-20`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setShowModal('log-incident')}
              className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              <div className="text-sm font-semibold">Log Incident</div>
              <div className="text-xs opacity-80 mt-1">Report safety issue</div>
            </button>
            <button
              onClick={() => handleQuickAction('briefing')}
              className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <div className="text-sm font-semibold">Daily Briefing</div>
              <div className="text-xs opacity-80 mt-1">Send safety update</div>
            </button>
            <button
              onClick={() => handleQuickAction('audit')}
              className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              <div className="text-sm font-semibold">Safety Audit</div>
              <div className="text-xs opacity-80 mt-1">Start inspection</div>
            </button>
            <button
              onClick={() => handleQuickAction('training')}
              className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors"
            >
              <div className="text-sm font-semibold">Assign Training</div>
              <div className="text-xs opacity-80 mt-1">Manage courses</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'incident' ? 'bg-red-500' :
                  activity.type === 'training' ? 'bg-purple-500' :
                  activity.type === 'certification' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage; 