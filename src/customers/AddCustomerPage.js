import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddCustomerPage = () => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then(() => navigate('/customers'))
      .catch((error) => console.error('Error adding customer:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#153448]">
        Add New Customer
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={customer.firstName}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={customer.lastName}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={customer.phoneNumber}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={customer.dateOfBirth}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};
