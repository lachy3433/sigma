import React, { useState } from 'react';
import Modal from '../Modal';
import LoadingSpinner from '../LoadingSpinner';

const AssignTrainingModal = ({ isOpen, onClose, onSubmit, loading, workforce }) => {
  const [formData, setFormData] = useState({
    assignTo: '',
    title: '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Training" loading={loading}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={formData.assignTo}
            onChange={(e) => setFormData({...formData, assignTo: e.target.value})}
          >
            <option value="">Select worker</option>
            {workforce.map(worker => (
              <option key={worker.id} value={worker.name}>{worker.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Training Title</label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          >
            <option value="">Select training</option>
            <option value="OSHA Fall Protection">OSHA Fall Protection</option>
            <option value="Crane Safety Certification">Crane Safety Certification</option>
            <option value="Confined Space Entry">Confined Space Entry</option>
            <option value="Hazmat Handling">Hazmat Handling</option>
            <option value="First Aid CPR">First Aid CPR</option>
            <option value="Scaffold Safety">Scaffold Safety</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
          <input
            type="date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
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
            Assign Training
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AssignTrainingModal; 