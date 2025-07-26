import React from 'react';
import { useAppState } from '../hooks/useAppState';
import Layout from '../components/Layout';

const TrainingPage = () => {
  const { trainings, setShowModal } = useAppState();
  const inProgressTrainings = trainings.filter(t => t.status === 'In Progress');
  const completedTrainings = trainings.filter(t => t.status === 'Completed');

  return (
    <Layout title="Training Management">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Trainings</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{trainings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{inProgressTrainings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{completedTrainings.length}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal('assign-training')}
            className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            Assign Training
          </button>
        </div>

        {/* Training List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Training Assignments</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {trainings.map(training => (
              <div key={training.id} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{training.title}</h4>
                    <p className="text-sm text-gray-500">Assigned to: {training.worker}</p>
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

export default TrainingPage; 