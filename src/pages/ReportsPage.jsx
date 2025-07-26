import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import Layout from '../components/Layout';

const ReportsPage = () => {
  const { reports, setShowModal, handleDownloadReport } = useAppState();
  const [reportType, setReportType] = useState('all');

  const filteredReports = reports.filter(report => {
    if (reportType === 'all') return true;
    return report.type.toLowerCase() === reportType.toLowerCase();
  });

  return (
    <Layout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex justify-between items-center">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="all">All Reports</option>
            <option value="audit">Audit Reports</option>
            <option value="incident">Incident Reports</option>
            <option value="training">Training Reports</option>
            <option value="compliance">Compliance Reports</option>
          </select>
          <button
            onClick={() => setShowModal('generate-report')}
            className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            Generate Report
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <div key={report.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <span className="text-slate-600 text-xs font-bold">
                    {report.type.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{report.type}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Created: {report.created} • {report.size}
              </p>
              <button
                onClick={() => handleDownloadReport(report)}
                className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                Download Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage; 