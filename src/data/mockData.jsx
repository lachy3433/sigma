export const mockData = {
  workforce: [
    { id: 1, name: 'John Martinez', role: 'Worker', status: 'Active', site: 'Site Alpha', certifications: 5 },
    { id: 2, name: 'Sarah Johnson', role: 'Foreman', status: 'Active', site: 'Site Beta', certifications: 8 },
    { id: 3, name: 'Mike Wilson', role: 'Worker', status: 'Inactive', site: 'Site Alpha', certifications: 3 },
    { id: 4, name: 'Emily Chen', role: 'Worker', status: 'Active', site: 'Site Beta', certifications: 6 },
    { id: 5, name: 'David Brown', role: 'Worker', status: 'Active', site: 'Site Alpha', certifications: 4 }
  ],

  incidents: [
    { id: 1, date: '2025-01-20', site: 'Site Alpha', description: 'Minor equipment malfunction in crane operation', status: 'Open', severity: 'Low' },
    { id: 2, date: '2025-01-18', site: 'Site Beta', description: 'Worker slipped on wet surface near building entrance', status: 'Resolved', severity: 'Medium' },
    { id: 3, date: '2025-01-15', site: 'Site Alpha', description: 'Safety harness inspection found worn components', status: 'Open', severity: 'High' }
  ],

  companies: [
    { id: 1, name: 'ABC Construction Corp', location: 'New York, NY', industry: 'Commercial Construction' },
    { id: 2, name: 'BuildRight Industries', location: 'Los Angeles, CA', industry: 'Residential Construction' },
    { id: 3, name: 'Metro Construction Group', location: 'Chicago, IL', industry: 'Infrastructure' },
    { id: 4, name: 'Skyline Builders LLC', location: 'Miami, FL', industry: 'Commercial Construction' },
    { id: 5, name: 'Foundation Pro Construction', location: 'Dallas, TX', industry: 'Industrial' }
  ],

  certifications: [
    { id: 1, worker: 'John Martinez', type: 'OSHA 30', expiry: '2025-03-15', status: 'Valid' },
    { id: 2, worker: 'Sarah Johnson', type: 'Fall Protection', expiry: '2025-02-01', status: 'Expiring Soon' },
    { id: 3, worker: 'Mike Wilson', type: 'Crane Operation', expiry: '2024-12-01', status: 'Expired' },
    { id: 4, worker: 'Emily Chen', type: 'Confined Space', expiry: '2025-06-15', status: 'Valid' },
    { id: 5, worker: 'David Brown', type: 'OSHA 10', expiry: '2025-01-30', status: 'Expiring Soon' }
  ],

  trainings: [
    { id: 1, worker: 'John Martinez', title: 'OSHA Fall Protection', assigned: '2025-01-15', due: '2025-02-15', progress: 75, status: 'In Progress' },
    { id: 2, worker: 'Sarah Johnson', title: 'Crane Safety Certification', assigned: '2025-01-10', due: '2025-02-10', progress: 100, status: 'Completed' },
    { id: 3, worker: 'Mike Wilson', title: 'Confined Space Entry', assigned: '2025-01-20', due: '2025-02-20', progress: 25, status: 'In Progress' },
    { id: 4, worker: 'Emily Chen', title: 'Hazmat Handling', assigned: '2025-01-12', due: '2025-02-12', progress: 90, status: 'In Progress' },
    { id: 5, worker: 'David Brown', title: 'First Aid CPR', assigned: '2025-01-08', due: '2025-02-08', progress: 100, status: 'Completed' }
  ],

  reports: [
    { id: 1, name: 'Monthly Safety Audit Report', type: 'Audit', created: '2025-01-20', size: '2.3 MB' },
    { id: 2, name: 'Daily Safety Briefing - Jan 19', type: 'Briefing', created: '2025-01-19', size: '1.1 MB' },
    { id: 3, name: 'Incident Report - Crane Malfunction', type: 'Incident', created: '2025-01-18', size: '3.2 MB' },
    { id: 4, name: 'Training Completion Report', type: 'Training', created: '2025-01-15', size: '1.8 MB' },
    { id: 5, name: 'Compliance Status Summary', type: 'Compliance', created: '2025-01-14', size: '2.7 MB' }
  ]
}; 