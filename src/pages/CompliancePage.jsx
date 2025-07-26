import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import Layout from '../components/Layout';

const CompliancePage = () => {
  const { certifications, setShowModal } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        cert.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const expiringCerts = certifications.filter(c => c.status === 'Expiring Soon');
  const expiredCerts = certifications.filter(c => c.status === 'Expired');
  const validCerts = certifications.filter(c => c.status === 'Valid');

  const stats = {
    total: certifications.length,
    valid: validCerts.length,
    expiring: expiringCerts.length,
    expired: expiredCerts.length,
    complianceRate: certifications.length > 0 ? Math.round((validCerts.length / certifications.length) * 100) : 0,
    critical: expiredCerts.length + expiringCerts.length
  };

  const handleViewCertDetails = (cert) => {
    setSelectedCert(cert);
    setShowCertModal(true);
  };

  const handleRenewCertification = (certId) => {
    // This would typically open a renewal form or redirect to renewal process
    console.log('Renewing certification:', certId);
    setShowCertModal(false);
  };

  const handleDownloadCert = (certId) => {
    // This would typically download the certification document
    console.log('Downloading certification:', certId);
    setShowCertModal(false);
  };

  const handleRevokeCertification = (certId) => {
    // This would typically revoke the certification
    console.log('Revoking certification:', certId);
    setShowCertModal(false);
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout title="Compliance & Certifications">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Certs</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.valid}</div>
            <div className="text-sm text-gray-600">Valid</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.expiring}</div>
            <div className="text-sm text-gray-600">Expiring Soon</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            <div className="text-sm text-gray-600">Expired</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.complianceRate}%</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.critical}</div>
            <div className="text-sm text-gray-600">Critical</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search certifications..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Status Filter */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="valid">Valid</option>
                <option value="expiring soon">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowModal('upload-certification')}
              className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Certification
            </button>
          </div>
        </div>

        {/* Certifications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">All Certifications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCertifications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>No certifications found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCertifications.map(cert => {
                    const daysUntilExpiry = getDaysUntilExpiry(cert.expiry);
                    const isExpired = daysUntilExpiry < 0;
                    const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry >= 0;

                    return (
                      <tr key={cert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                              {cert.worker.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="font-medium text-gray-900">{cert.worker}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(cert.expiry).toLocaleDateString()}
                            {isExpired && (
                              <div className="text-red-600 text-xs font-medium">
                                {Math.abs(daysUntilExpiry)} days expired
                              </div>
                            )}
                            {isExpiringSoon && (
                              <div className="text-yellow-600 text-xs font-medium">
                                {daysUntilExpiry} days left
                              </div>
                            )}
                            {!isExpired && !isExpiringSoon && (
                              <div className="text-green-600 text-xs font-medium">
                                {daysUntilExpiry} days left
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            cert.status === 'Valid' ? 'bg-green-100 text-green-800' :
                            cert.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewCertDetails(cert)}
                              className="text-slate-800 hover:text-slate-600 font-medium text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                              Details
                            </button>
                            {cert.status !== 'Expired' && (
                              <button
                                onClick={() => handleRenewCertification(cert.id)}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded border border-blue-300 hover:bg-blue-50 transition-colors"
                              >
                                Renew
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Certification Details Modal */}
      {showCertModal && selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedCert.type}</h2>
                  <p className="text-gray-600">Certification ID: {selectedCert.id}</p>
                </div>
                <button
                  onClick={() => setShowCertModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Worker</label>
                  <p className="text-gray-900">{selectedCert.worker}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedCert.status === 'Valid' ? 'bg-green-100 text-green-800' :
                    selectedCert.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedCert.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <p className="text-gray-900">{new Date(selectedCert.expiry).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Days Until Expiry</label>
                  <p className={`font-medium ${
                    getDaysUntilExpiry(selectedCert.expiry) < 0 ? 'text-red-600' :
                    getDaysUntilExpiry(selectedCert.expiry) <= 30 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {getDaysUntilExpiry(selectedCert.expiry) < 0 
                      ? `${Math.abs(getDaysUntilExpiry(selectedCert.expiry))} days expired`
                      : `${getDaysUntilExpiry(selectedCert.expiry)} days left`
                    }
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleDownloadCert(selectedCert.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Download Certificate
                  </button>
                  {selectedCert.status !== 'Expired' && (
                    <button
                      onClick={() => handleRenewCertification(selectedCert.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Renew Certification
                    </button>
                  )}
                  <button
                    onClick={() => handleRevokeCertification(selectedCert.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Revoke Certification
                  </button>
                  <button
                    onClick={() => setShowCertModal(false)}
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

export default CompliancePage; 