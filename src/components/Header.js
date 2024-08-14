import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
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
