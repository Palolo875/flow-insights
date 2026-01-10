import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardClient } from './components/dashboard/dashboard-client';
import { ThemeProvider } from './components/theme-provider';
import { DatabaseBootstrapper } from './components/database-bootstrapper';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <DatabaseBootstrapper />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardClient />} />
          {/* Autres routes du dashboard */}
          <Route path="/dashboard/audit" element={<DashboardClient />} />
          <Route path="/dashboard/bibliotheque" element={<DashboardClient />} />
          <Route path="/dashboard/capture" element={<DashboardClient />} />
          <Route path="/dashboard/evening" element={<DashboardClient />} />
          <Route path="/dashboard/focus/:taskId" element={<DashboardClient />} />
          <Route path="/dashboard/governance" element={<DashboardClient />} />
          <Route path="/dashboard/maintenance" element={<DashboardClient />} />
          <Route path="/dashboard/playlist" element={<DashboardClient />} />
          <Route path="/dashboard/retrospective" element={<DashboardClient />} />
          <Route path="/dashboard/settings" element={<DashboardClient />} />
          <Route path="/dashboard/timeline" element={<DashboardClient />} />
          <Route path="/dashboard/verification" element={<DashboardClient />} />
          <Route path="/dashboard/visualisation" element={<DashboardClient />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;