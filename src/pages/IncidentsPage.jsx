import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState.jsx';
import Layout from '../components/Layout.jsx';

const IncidentsPage = () => {
  const { incidents, setShowModal } = useAppState();
  const [incidentFilter, setIncidentFilter] = useState('all');
  
  const filteredIncidents = incidents.filter(incident => {
    if (incidentFilter === 'all') return true;
    return incident.status.toLowerCase() === incidentFilter.toLowerCase();
  });

  return (
    <Layout title="Incident Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={incidentFilter}
            onChange={(e) => setIncidentFilter(e.target.value)}
          >
            <option value="all">All Incidents</option>
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>
          <button
            onClick={() => setShowModal('log-incident')}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Log New Incident
          </button>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.map(incident => (
            <div key={incident.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      incident.severity === 'High' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.severity} Priority
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      incident.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{incident.description}</h3>
                  <p className="text-sm text-gray-500">
                    {incident.site} • {incident.date}
                  </p>
                </div>
                <button className="text-slate-800 hover:text-slate-600 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IncidentsPage; 