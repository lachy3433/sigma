# JobShield - Construction Safety Management Platform

A comprehensive React application for managing construction safety, workforce, compliance, incidents, training, and reporting.

## Project Structure

```
jobshield-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.js          # Main layout with sidebar
│   │   ├── LoadingSpinner.js  # Loading spinner component
│   │   └── Toast.js           # Toast notification component
│   ├── data/
│   │   └── mockData.js        # Mock data for the application
│   ├── hooks/
│   │   └── useAppState.js     # Custom hook for state management
│   ├── pages/
│   │   ├── AuthPage.js        # Login/Signup page
│   │   ├── CompanySetupPage.js # Company creation/joining
│   │   ├── DashboardPage.js   # Main dashboard
│   │   ├── WorkforcePage.js   # Worker management
│   │   ├── CompliancePage.js  # Certifications management
│   │   ├── IncidentsPage.js   # Incident management
│   │   ├── TrainingPage.js    # Training management
│   │   ├── ReportsPage.js     # Reports and analytics
│   │   ├── SettingsPage.js    # User settings
│   │   └── WorkerProfilePage.js # Individual worker profiles
│   ├── styles/
│   │   └── index.css          # Main CSS with Tailwind imports
│   ├── App.js                 # Main application component
│   └── index.js               # Application entry point
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Features

- **Authentication**: Login/Signup with role-based access
- **Company Management**: Create or join companies
- **Dashboard**: Overview of safety metrics and quick actions
- **Workforce Management**: View and manage workers
- **Compliance Tracking**: Monitor certifications and compliance status
- **Incident Management**: Log and track safety incidents
- **Training Management**: Assign and track training progress
- **Reports & Analytics**: Generate and download reports
- **Settings**: User account and notification preferences

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technology Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling framework
- **Custom Hooks** - State management
- **Mock Data** - Simulated backend data

## Key Components

### State Management
The application uses a custom hook (`useAppState`) to manage all application state, including:
- User authentication
- Navigation state
- Mock data (workforce, incidents, certifications, etc.)
- Loading states
- Toast notifications

### Layout System
The `Layout` component provides:
- Responsive sidebar navigation
- Mobile-friendly design
- Consistent header and navigation

### Page Components
Each page is a separate component that:
- Uses the shared layout
- Accesses state through the custom hook
- Implements specific functionality for its domain

## Development Notes

- All data is currently mocked in the `mockData.js` file
- The application is ready for backend integration
- Responsive design works on mobile and desktop
- Tailwind CSS provides consistent styling
- Components are modular and reusable

## Future Enhancements

- Backend API integration
- Real-time notifications
- File upload functionality
- Advanced reporting features
- Mobile app development
- Multi-language support 