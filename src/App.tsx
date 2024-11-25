import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import FieldMapping from './pages/FieldMapping';
import DiseaseDetection from './pages/DiseaseDetection';
import Weather from './pages/Weather';
import Market from './pages/Market';
import Settings from './pages/Settings';
import { AuthProvider, useAuth } from './context/AuthContext';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } />
            
            <Route path="/crops" element={
              <PrivateRoute>
                <Layout>
                  <Crops />
                </Layout>
              </PrivateRoute>
            } />
            
            <Route path="/field-mapping" element={
              <PrivateRoute>
                <Layout>
                  <FieldMapping />
                </Layout>
              </PrivateRoute>
            } />
            
            <Route path="/disease-detection" element={
              <PrivateRoute>
                <Layout>
                  <DiseaseDetection />
                </Layout>
              </PrivateRoute>
            } />
            
            <Route path="/weather" element={
              <PrivateRoute>
                <Layout>
                  <Weather />
                </Layout>
              </PrivateRoute>
            } />
            
            <Route path="/market" element={
              <PrivateRoute>
                <Layout>
                  <Market />
                </Layout>
              </PrivateRoute>
            } />
            
            <Route path="/settings" element={
              <PrivateRoute>
                <Layout>
                  <Settings />
                </Layout>
              </PrivateRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;