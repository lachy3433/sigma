import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import Layout from '../components/Layout';

const IncidentsPage = () => {
  const { incidents, setShowModal } = useAppState();
  const [incidentFilter, setIncidentFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = incidentFilter === 'all' || incident.status.toLowerCase() === incidentFilter.toLowerCase();
    const matchesSeverity = severityFilter === 'all' || incident.severity.toLowerCase() === severityFilter.toLowerCase();
    const matchesSearch = incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.site.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const stats = {
    total: incidents.length,
    open: incidents.filter(i => i.status === 'Open').length,
    resolved: incidents.filter(i => i.status === 'Resolved').length,
    high: incidents.filter(i => i.severity === 'High').length,
    medium: incidents.filter(i => i.severity === 'Medium').length,
    low: incidents.filter(i => i.severity === 'Low').length
  };

  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
    setShowDetailsModal(true);
  };

  const handleResolveIncident = (incidentId) => {
    // This would typically update the incident status in the backend
    console.log('Resolving incident:', incidentId);
    setShowDetailsModal(false);
  };

  const handleAssignInvestigator = (incidentId) => {
    // This would typically assign an investigator to the incident
    console.log('Assigning investigator to incident:', incidentId);
    setShowDetailsModal(false);
  };

  return (
    <Layout title="Incident Management">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Incidents</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">{stats.open}</div>
            <div className="text-sm text-gray-600">Open</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-700">{stats.high}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.medium}</div>
            <div className="text-sm text-gray-600">Medium Priority</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-700">{stats.low}</div>
            <div className="text-sm text-gray-600">Low Priority</div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search incidents..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Status Filter */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                value={incidentFilter}
                onChange={(e) => setIncidentFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="resolved">Resolved</option>
                <option value="investigating">Investigating</option>
              </select>
              
              {/* Severity Filter */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
              >
                <option value="all">All Severity</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowModal('log-incident')}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Log New Incident
            </button>
          </div>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No incidents found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredIncidents.map(incident => (
              <div key={incident.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        incident.severity === 'High' ? 'bg-red-100 text-red-800' :
                        incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {incident.severity} Priority
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        incident.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                        incident.status === 'Investigating' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {incident.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        Incident #{incident.id}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{incident.description}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {incident.site}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(incident.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => handleViewDetails(incident)}
                      className="text-slate-800 hover:text-slate-600 font-medium text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                    {incident.status === 'Open' && (
                      <button 
                        onClick={() => handleResolveIncident(incident.id)}
                        className="text-green-700 hover:text-green-800 font-medium text-sm px-3 py-1 rounded border border-green-300 hover:bg-green-50 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Incident Details Modal */}
      {showDetailsModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Incident Details</h2>
                  <p className="text-gray-600">Incident #{selectedIncident.id}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900">{selectedIncident.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
                  <p className="text-gray-900">{selectedIncident.site}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{new Date(selectedIncident.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    selectedIncident.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                    selectedIncident.status === 'Investigating' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedIncident.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    selectedIncident.severity === 'High' ? 'bg-red-100 text-red-800' :
                    selectedIncident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedIncident.severity}
                  </span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Actions</h3>
                <div className="flex gap-3">
                  {selectedIncident.status === 'Open' && (
                    <>
                      <button
                        onClick={() => handleAssignInvestigator(selectedIncident.id)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Assign Investigator
                      </button>
                      <button
                        onClick={() => handleResolveIncident(selectedIncident.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default IncidentsPage; 