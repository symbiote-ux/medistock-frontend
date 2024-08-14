import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#153448] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medistock</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-gray-300' : 'hover:text-gray-200'
                }
              >
                Home
              </NavLink>
            </li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="hover:text-gray-200 focus:outline-none"
              >
                Customers
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 bg-white text-gray-800 mt-2 w-48 rounded shadow-lg">
                  <li>
                    <Link
                      to="/add-customer"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Add Customer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/update-customer"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Update Customer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customers"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View Customers
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/signup" className="hover:text-gray-200">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
