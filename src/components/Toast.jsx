import React from 'react';

const Toast = ({ toast }) => {
  if (!toast) return null;
  
  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
      toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
    } transition-all duration-300`}>
      {toast.message}
    </div>
  );
};

export default Toast; 