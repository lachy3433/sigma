import React, { useState } from 'react';
import Modal from '../Modal';
import LoadingSpinner from '../LoadingSpinner';

const GenerateReportModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    reportType: '',
    dateRange: 'last-30-days',
    includeCharts: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Report" loading={loading}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={formData.reportType}
            onChange={(e) => setFormData({...formData, reportType: e.target.value})}
          >
            <option value="">Select report type</option>
            <option value="safety-audit">Safety Audit Report</option>
            <option value="incident-summary">Incident Summary</option>
            <option value="training-progress">Training Progress</option>
            <option value="compliance-status">Compliance Status</option>
            <option value="workforce-overview">Workforce Overview</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={formData.dateRange}
            onChange={(e) => setFormData({...formData, dateRange: e.target.value})}
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="this-year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeCharts"
            className="w-4 h-4 text-slate-800 border-gray-300 rounded focus:ring-slate-800"
            checked={formData.includeCharts}
            onChange={(e) => setFormData({...formData, includeCharts: e.target.checked})}
          />
          <label htmlFor="includeCharts" className="ml-2 text-sm text-gray-700">
            Include charts and graphs
          </label>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <LoadingSpinner />}
            Generate Report
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GenerateReportModal; 