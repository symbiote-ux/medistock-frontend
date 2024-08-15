import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/customers', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#153448]">Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} className="mb-2">
            <Link
              to={`/customers/${customer.id}`}
              className="text-blue-500 hover:underline"
            >
              {customer.firstName} {customer.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
