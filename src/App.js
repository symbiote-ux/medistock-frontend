import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Signup } from './components/authentication/Signup';
import { Login } from './components/authentication/Login';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddCustomerPage } from './components/customers/AddCustomerPage';
import { CustomerDetailPage } from './components/customers/CustomerDetailPage';
import { CustomerListPage } from './components/customers/CustomerListPage';
import { UpdateCustomerPage } from './components/customers/UpdateCustomerPage';

export const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customers" element={<CustomerListPage />} />
            <Route path="/customers/:id" element={<CustomerDetailPage />} />
            <Route path="/add-customer" element={<AddCustomerPage />} />
            <Route
              path="/update-customer/:id"
              element={<UpdateCustomerPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
