import React from 'react';
import { useAppState } from '../hooks/useAppState';
import Layout from '../components/Layout';

const WorkerProfilePage = () => {
  const { workforce, certifications, trainings, setCurrentPage } = useAppState();
  
  // For demo purposes, showing the first worker's profile
  const worker = workforce[0];
  const workerCerts = certifications.filter(c => c.worker === worker.name);
  const workerTrainings = trainings.filter(t => t.worker === worker.name);

  return (
    <Layout title={`Worker Profile - ${worker.name}`}>
      <div className="space-y-6">
        {/* Back Button */}
        <div>
          <button
            onClick={() => setCurrentPage('workforce')}
            className="text-slate-600 hover:text-slate-800 font-medium flex items-center gap-2"
          >
            ← Back to Workforce
          </button>
        </div>

        {/* Worker Info Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-600">
                {worker.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{worker.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{worker.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Site</p>
                  <p className="font-medium">{worker.site}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    worker.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {worker.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Certifications</h3>
          <div className="space-y-3">
            {workerCerts.map(cert => (
              <div key={cert.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                <div>
                  <p className="font-medium">{cert.type}</p>
                  <p className="text-sm text-gray-500">Expires: {cert.expiry}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  cert.status === 'Valid' ? 'bg-green-100 text-green-800' :
                  cert.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Training Progress */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Training Progress</h3>
          <div className="space-y-4">
            {workerTrainings.map(training => (
              <div key={training.id} className="border border-gray-200 rounded p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{training.title}</h4>
                    <p className="text-sm text-gray-500">Due: {training.due}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    training.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {training.status}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-slate-800">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-slate-800">
                        {training.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${training.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-800"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerProfilePage; 