import React, { useState } from 'react';
import Modal from '../Modal';
import LoadingSpinner from '../LoadingSpinner';

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset Password" loading={loading}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Send Reset Link
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ForgotPasswordModal; 