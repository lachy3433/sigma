import React from 'react';
import { useAppState } from '../hooks/useAppState';
import Layout from '../components/Layout';

const CompliancePage = () => {
  const { certifications, setShowModal } = useAppState();
  const expiringCerts = certifications.filter(c => c.status === 'Expiring Soon');
  const expiredCerts = certifications.filter(c => c.status === 'Expired');

  return (
    <Layout title="Compliance & Certifications">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Valid Certifications</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {certifications.filter(c => c.status === 'Valid').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Expiring Soon</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{expiringCerts.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Expired</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{expiredCerts.length}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal('upload-certification')}
            className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            Upload Certification
          </button>
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
                {certifications.map(cert => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{cert.worker}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.expiry}</td>
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
                      <button className="text-slate-800 hover:text-slate-600 font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompliancePage; 