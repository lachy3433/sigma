import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState.jsx';
import LoadingSpinner from '../components/LoadingSpinner';

const CompanySetupPage = () => {
  const { user, companies, handleCreateCompany, handleJoinCompany, loading } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [companyData, setCompanyData] = useState({
    name: '',
    industry: '',
    location: '',
    description: ''
  });

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCompanySubmit = (e) => {
    e.preventDefault();
    handleCreateCompany(companyData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-slate-800 text-center">
            {user?.role === 'foreman' ? 'Company Setup' : 'Join a Company'}
          </h1>
          <p className="text-gray-600 text-center mt-2">
            {user?.role === 'foreman' 
              ? 'Create your company profile to get started'
              : 'Search and join an existing company'
            }
          </p>
        </div>

        <div className="p-6">
          {user?.role === 'foreman' ? (
            <form onSubmit={handleCreateCompanySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
                  placeholder="Enter company name"
                  value={companyData.name}
                  onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
                  value={companyData.industry}
                  onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                >
                  <option value="">Select industry</option>
                  <option value="commercial">Commercial Construction</option>
                  <option value="residential">Residential Construction</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
                  placeholder="City, State"
                  value={companyData.location}
                  onChange={(e) => setCompanyData({...companyData, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
                  rows="3"
                  placeholder="Brief description of your company"
                  value={companyData.description}
                  onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 text-white py-3 px-4 rounded-md font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <LoadingSpinner />}
                Create Company
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search Companies</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
                  placeholder="Search by company name or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                {filteredCompanies.map(company => (
                  <div key={company.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                      <p className="text-sm text-gray-500">{company.location}</p>
                    </div>
                    <button
                      onClick={() => handleJoinCompany(company)}
                      disabled={loading}
                      className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading && <LoadingSpinner />}
                      Request to Join
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySetupPage; 