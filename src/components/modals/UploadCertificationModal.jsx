import React, { useState } from 'react';
import Modal from '../Modal';
import LoadingSpinner from '../LoadingSpinner';

const UploadCertificationModal = ({ isOpen, onClose, onSubmit, loading, workforce }) => {
  const [formData, setFormData] = useState({
    worker: '',
    certType: '',
    expiryDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Certification" loading={loading}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Worker</label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={formData.worker}
            onChange={(e) => setFormData({...formData, worker: e.target.value})}
          >
            <option value="">Select worker</option>
            {workforce.map(worker => (
              <option key={worker.id} value={worker.name}>{worker.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Certification Type</label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={formData.certType}
            onChange={(e) => setFormData({...formData, certType: e.target.value})}
          >
            <option value="">Select certification type</option>
            <option value="OSHA 10">OSHA 10</option>
            <option value="OSHA 30">OSHA 30</option>
            <option value="Fall Protection">Fall Protection</option>
            <option value="Crane Operation">Crane Operation</option>
            <option value="Confined Space">Confined Space</option>
            <option value="First Aid CPR">First Aid CPR</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
          <input
            type="date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
          />
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
            Upload Certification
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadCertificationModal; 