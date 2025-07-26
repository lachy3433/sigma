import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import Layout from '../components/Layout';

const TrainingPage = () => {
  const { trainings, setShowModal } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [showTrainingModal, setShowTrainingModal] = useState(false);

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        training.worker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || training.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const inProgressTrainings = trainings.filter(t => t.status === 'In Progress');
  const completedTrainings = trainings.filter(t => t.status === 'Completed');
  const overdueTrainings = trainings.filter(t => {
    const dueDate = new Date(t.due);
    const today = new Date();
    return dueDate < today && t.status !== 'Completed';
  });

  const stats = {
    total: trainings.length,
    inProgress: inProgressTrainings.length,
    completed: completedTrainings.length,
    overdue: overdueTrainings.length,
    completionRate: trainings.length > 0 ? Math.round((completedTrainings.length / trainings.length) * 100) : 0,
    avgProgress: trainings.length > 0 ? Math.round(trainings.reduce((sum, t) => sum + t.progress, 0) / trainings.length) : 0
  };

  const handleViewTrainingDetails = (training) => {
    setSelectedTraining(training);
    setShowTrainingModal(true);
  };

  const handleUpdateProgress = (trainingId, newProgress) => {
    // This would typically update the training progress in the backend
    console.log('Updating progress for training:', trainingId, 'to:', newProgress);
    setShowTrainingModal(false);
  };

  const handleMarkCompleted = (trainingId) => {
    // This would typically mark the training as completed in the backend
    console.log('Marking training as completed:', trainingId);
    setShowTrainingModal(false);
  };

  const handleExtendDeadline = (trainingId) => {
    // This would typically extend the training deadline in the backend
    console.log('Extending deadline for training:', trainingId);
    setShowTrainingModal(false);
  };

  return (
    <Layout title="Training Management">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Trainings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.avgProgress}%</div>
            <div className="text-sm text-gray-600">Avg Progress</div>
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
                  placeholder="Search trainings..."
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
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowModal('assign-training')}
              className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Assign Training
            </button>
          </div>
        </div>

        {/* Training List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Training Assignments</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTrainings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <p>No trainings found</p>
                  <p className="text-sm">Try adjusting your search or filter criteria.</p>
                </div>
              </div>
            ) : (
              filteredTrainings.map(training => {
                const dueDate = new Date(training.due);
                const today = new Date();
                const isOverdue = dueDate < today && training.status !== 'Completed';
                const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

                return (
                  <div key={training.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{training.title}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            training.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isOverdue ? 'Overdue' : training.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {training.worker}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due: {new Date(training.due).toLocaleDateString()}
                            {isOverdue && (
                              <span className="text-red-600 font-medium">({Math.abs(daysUntilDue)} days overdue)</span>
                            )}
                            {!isOverdue && training.status !== 'Completed' && (
                              <span className="text-gray-600">({daysUntilDue} days left)</span>
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Assigned: {new Date(training.assigned).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleViewTrainingDetails(training)}
                          className="text-slate-800 hover:text-slate-600 font-medium text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          Details
                        </button>
                        {training.status !== 'Completed' && (
                          <button
                            onClick={() => handleMarkCompleted(training.id)}
                            className="text-green-700 hover:text-green-800 font-medium text-sm px-3 py-1 rounded border border-green-300 hover:bg-green-50 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                      </div>
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
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            training.progress === 100 ? 'bg-green-500' : 'bg-slate-800'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Training Details Modal */}
      {showTrainingModal && selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedTraining.title}</h2>
                  <p className="text-gray-600">Training ID: {selectedTraining.id}</p>
                </div>
                <button
                  onClick={() => setShowTrainingModal(false)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <p className="text-gray-900">{selectedTraining.worker}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedTraining.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedTraining.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Date</label>
                  <p className="text-gray-900">{new Date(selectedTraining.assigned).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <p className="text-gray-900">{new Date(selectedTraining.due).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Progress</label>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-slate-800">
                        Current Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-slate-800">
                        {selectedTraining.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-3 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${selectedTraining.progress}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        selectedTraining.progress === 100 ? 'bg-green-500' : 'bg-slate-800'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedTraining.status !== 'Completed' && (
                    <>
                      <button
                        onClick={() => handleUpdateProgress(selectedTraining.id, Math.min(selectedTraining.progress + 25, 100))}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Update Progress
                      </button>
                      <button
                        onClick={() => handleMarkCompleted(selectedTraining.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Mark Completed
                      </button>
                      <button
                        onClick={() => handleExtendDeadline(selectedTraining.id)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                      >
                        Extend Deadline
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setShowTrainingModal(false)}
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

export default TrainingPage; 