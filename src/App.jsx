import React from 'react';
import AuthPage from './pages/AuthPage';
import CompanySetupPage from './pages/CompanySetupPage';
import DashboardPage from './pages/DashboardPage';
import WorkforcePage from './pages/WorkforcePage';
import CompliancePage from './pages/CompliancePage';
import IncidentsPage from './pages/IncidentsPage';
import TrainingPage from './pages/TrainingPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import WorkerProfilePage from './pages/WorkerProfilePage';
import Toast from './components/Toast';
import LogIncidentModal from './components/modals/LogIncidentModal';
import UploadCertificationModal from './components/modals/UploadCertificationModal';
import AssignTrainingModal from './components/modals/AssignTrainingModal';
import ForgotPasswordModal from './components/modals/ForgotPasswordModal';
import AddWorkerModal from './components/modals/AddWorkerModal';
import GenerateReportModal from './components/modals/GenerateReportModal';
import { useAppState } from './hooks/useAppState';

const App = () => {
  const {
    currentPage,
    user,
    loading,
    toast,
    showModal,
    setShowModal,
    showToast,
    withLoading,
    workforce,
    handleLogin,
    handleSignup,
    handleLogout,
    handleForgotPassword,
    handlePasswordReset,
    handleCreateCompany,
    handleJoinCompany,
    handleLogIncident,
    handleUploadCertification,
    handleAssignTraining,
    handleViewProfile,
    handleDownloadReport,
    handleGenerateReport,
    handleQuickAction,
    handleUpdateAccount,
    handleChangePassword,
    handleDeleteAccount,
    handleAddWorker
  } = useAppState();

  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'login':
          return <AuthPage />;
        case 'company-setup':
          return <CompanySetupPage />;
        case 'dashboard':
          return <DashboardPage />;
        case 'workforce':
          return <WorkforcePage />;
        case 'compliance':
          return <CompliancePage />;
        case 'incidents':
          return <IncidentsPage />;
        case 'training':
          return <TrainingPage />;
        case 'reports':
          return <ReportsPage />;
        case 'settings':
          return <SettingsPage />;
        case 'worker-profile':
          return <WorkerProfilePage />;
        default:
          return <AuthPage />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h1>
            <p className="text-gray-600">Please refresh the page and try again.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      {renderPage()}
      <Toast toast={toast} />
      
      {/* Modals */}
      <LogIncidentModal
        isOpen={showModal === 'log-incident'}
        onClose={() => setShowModal(null)}
        onSubmit={handleLogIncident}
        loading={loading}
      />
      
      <UploadCertificationModal
        isOpen={showModal === 'upload-certification'}
        onClose={() => setShowModal(null)}
        onSubmit={handleUploadCertification}
        loading={loading}
        workforce={workforce}
      />
      
      <AssignTrainingModal
        isOpen={showModal === 'assign-training'}
        onClose={() => setShowModal(null)}
        onSubmit={handleAssignTraining}
        loading={loading}
        workforce={workforce}
      />
      
      <ForgotPasswordModal
        isOpen={showModal === 'forgot-password'}
        onClose={() => setShowModal(null)}
        onSubmit={handlePasswordReset}
        loading={loading}
      />
      
      <AddWorkerModal
        isOpen={showModal === 'add-worker'}
        onClose={() => setShowModal(null)}
        onSubmit={handleAddWorker}
        loading={loading}
      />
      
      <GenerateReportModal
        isOpen={showModal === 'generate-report'}
        onClose={() => setShowModal(null)}
        onSubmit={handleGenerateReport}
        loading={loading}
      />
    </div>
  );
};

export default App; 