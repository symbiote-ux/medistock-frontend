import React, { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import AuthContext from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { CustomerManagement } from './pages/CustomerManagement';
import { MedicineManagement } from './pages/MedicineManagement';
import { PurchaseManagement } from './pages/PurchaseManagement';

const AppRoutes = () => {
  const { auth } = useContext(AuthContext);

  const routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/login', element: <LoginPage /> },
    {
      path: '/customers',
      element: auth ? <CustomerManagement /> : <Navigate to="/login" />,
    },
    {
      path: '/medicines',
      element: auth ? <MedicineManagement /> : <Navigate to="/login" />,
    },
    {
      path: '/purchases',
      element: auth ? <PurchaseManagement /> : <Navigate to="/login" />,
    },
  ]);
  return routes;
};

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
};
