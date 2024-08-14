import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-[#153448]">
        MediStock: A comprehensive medicine inventory management system
      </h1>
      <p className="mb-4 text-[#153448]">
        A web-based application specifically designed for managing medicine
        inventory and customer purchases in pharmacies.
      </p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
};
