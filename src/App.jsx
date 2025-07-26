import React from 'react';
import AuthPage from './pages/AuthPage.jsx';
import CompanySetupPage from './pages/CompanySetupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import WorkforcePage from './pages/WorkforcePage.jsx';
import CompliancePage from './pages/CompliancePage.jsx';
import IncidentsPage from './pages/IncidentsPage.jsx';
import TrainingPage from './pages/TrainingPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import WorkerProfilePage from './pages/WorkerProfilePage.jsx';
import Toast from './components/Toast.jsx';
import LogIncidentModal from './components/modals/LogIncidentModal.jsx';
import UploadCertificationModal from './components/modals/UploadCertificationModal.jsx';
import AssignTrainingModal from './components/modals/AssignTrainingModal.jsx';
import ForgotPasswordModal from './components/modals/ForgotPasswordModal.jsx';
import AddWorkerModal from './components/modals/AddWorkerModal.jsx';
import GenerateReportModal from './components/modals/GenerateReportModal.jsx';
import { useAppState } from './hooks/useAppState.jsx';

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