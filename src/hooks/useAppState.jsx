import { useState } from 'react';
import { mockData } from '../data/mockData.jsx';

export const useAppState = () => {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // ==============================================
  // MOCK DATA
  // ==============================================
  const [workforce, setWorkforce] = useState(mockData.workforce);
  const [incidents, setIncidents] = useState(mockData.incidents);
  const [companies] = useState(mockData.companies);
  const [certifications, setCertifications] = useState(mockData.certifications);
  const [trainings, setTrainings] = useState(mockData.trainings);
  const [reports] = useState(mockData.reports);

  // ==============================================
  // UTILITY FUNCTIONS
  // ==============================================
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const withLoading = async (action) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await action();
    } catch (error) {
      console.error('Action failed:', error);
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ==============================================
  // EVENT HANDLERS
  // ==============================================
  const handleLogin = async (credentials) => {
    if (!credentials.email || !credentials.password) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({ 
        name: credentials.email.includes('foreman') ? 'John Smith' : 'Maria Rodriguez',
        email: credentials.email,
        role: credentials.email.includes('foreman') ? 'foreman' : 'worker',
        company: 'ABC Construction Corp'
      });
      setCurrentPage('dashboard');
      showToast('Welcome back! Login successful.');
    } catch (error) {
      console.error('Login error:', error);
      showToast('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (userData) => {
    if (!userData.name || !userData.email || !userData.password || !userData.role) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({ ...userData, company: null });
      setCurrentPage('company-setup');
      showToast('Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error);
      showToast('Signup failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowModal('forgot-password');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setSidebarOpen(false);
    showToast('You have been logged out successfully.');
  };

  const handlePasswordReset = async (email) => {
    await withLoading(async () => {
      console.log('Password reset requested for:', email);
      setShowModal(null);
      showToast('Password reset link sent to your email!');
    });
  };

  const handleCreateCompany = async (companyData) => {
    await withLoading(async () => {
      setUser({...user, company: companyData.name});
      setCurrentPage('dashboard');
      showToast('Company created successfully!');
    });
  };

  const handleJoinCompany = async (company) => {
    await withLoading(async () => {
      console.log('Request to join company:', company.name);
      setUser({...user, company: company.name});
      setCurrentPage('dashboard');
      showToast('Request sent! You have been added to the company.');
    });
  };

  const handleLogIncident = async (incidentData) => {
    await withLoading(async () => {
      const newIncident = {
        id: incidents.length + 1,
        date: new Date().toISOString().split('T')[0],
        ...incidentData,
        status: 'Open'
      };
      setIncidents([newIncident, ...incidents]);
      setShowModal(null);
      showToast('Incident logged successfully!');
    });
  };

  const handleUploadCertification = async (certData) => {
    await withLoading(async () => {
      const newCert = {
        id: certifications.length + 1,
        worker: certData.worker,
        type: certData.certType,
        expiry: certData.expiryDate,
        status: 'Valid'
      };
      setCertifications([...certifications, newCert]);
      setShowModal(null);
      showToast('Certification uploaded successfully!');
    });
  };

  const handleAssignTraining = async (trainingData) => {
    await withLoading(async () => {
      const newTraining = {
        id: trainings.length + 1,
        worker: trainingData.assignTo,
        title: trainingData.title,
        assigned: new Date().toISOString().split('T')[0],
        due: trainingData.dueDate,
        progress: 0,
        status: 'In Progress'
      };
      setTrainings([...trainings, newTraining]);
      setShowModal(null);
      showToast('Training assigned successfully!');
    });
  };

  const handleViewProfile = (workerId) => {
    const worker = workforce.find(w => w.id === workerId);
    setCurrentPage('worker-profile');
    showToast(`Viewing profile for ${worker.name}`);
  };

  const handleDownloadReport = async (report) => {
    await withLoading(async () => {
      const blob = new Blob(['Mock report content for ' + report.name], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(`Downloading ${report.name}...`);
    });
  };

  const handleGenerateReport = async (reportData) => {
    await withLoading(async () => {
      console.log('Generating report:', reportData);
      setShowModal(null);
      showToast('Report generated successfully!');
    });
  };

  const handleQuickAction = async (action) => {
    await withLoading(async () => {
      switch (action) {
        case 'briefing':
          showToast('Daily safety briefing generated and sent to all workers.');
          break;
        case 'audit':
          showToast('Safety audit initiated. Checklist sent to supervisors.');
          break;
        case 'training':
          setShowModal('assign-training');
          break;
        case 'reports':
          setCurrentPage('reports');
          break;
        default:
          showToast('Action completed successfully!');
      }
    });
  };

  const handleUpdateAccount = async (accountData) => {
    await withLoading(async () => {
      setUser({...user, ...accountData});
      showToast('Account updated successfully!');
    });
  };

  const handleChangePassword = async (passwordData) => {
    await withLoading(async () => {
      if (passwordData.new !== passwordData.confirm) {
        showToast('New passwords do not match', 'error');
        return;
      }
      showToast('Password changed successfully!');
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setUser(null);
      setCurrentPage('login');
      showToast('Account deleted successfully.');
    }
  };

  const handleAddWorker = async (workerData) => {
    await withLoading(async () => {
      const newWorker = {
        id: workforce.length + 1,
        ...workerData,
        certifications: 0
      };
      setWorkforce([...workforce, newWorker]);
      setShowModal(null);
      showToast('Worker added successfully!');
    });
  };

  return {
    // State
    currentPage,
    setCurrentPage,
    user,
    setUser,
    sidebarOpen,
    setSidebarOpen,
    showModal,
    setShowModal,
    loading,
    setLoading,
    toast,
    setToast,
    
    // Data
    workforce,
    setWorkforce,
    incidents,
    setIncidents,
    companies,
    certifications,
    setCertifications,
    trainings,
    setTrainings,
    reports,
    
    // Utility functions
    showToast,
    withLoading,
    
    // Event handlers
    handleLogin,
    handleSignup,
    handleForgotPassword,
    handleLogout,
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
  };
}; 