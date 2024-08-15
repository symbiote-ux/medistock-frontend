import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const CustomerDetailPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/customers/${id}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error('Error fetching customer:', error));
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#153448]">
        Customer Details
      </h1>
      <p>
        <strong>First Name:</strong> {customer.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {customer.lastName}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {customer.phoneNumber}
      </p>
      <p>
        <strong>Address:</strong> {customer.address}
      </p>
      <p>
        <strong>Date of Birth:</strong>{' '}
        {new Date(customer.dateOfBirth).toLocaleDateString()}
      </p>
      <Link
        to={`/update-customer/${customer.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    </div>
  );
};
