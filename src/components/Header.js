import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const Header = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <header className="bg-[#153448] text-white p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medistock</h1>
        <nav>
          <ul className="flex space-x-4">
            {auth ? (
              <>
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
                  <NavLink
                    to="/customers"
                    className={({ isActive }) =>
                      isActive ? 'text-gray-300' : 'hover:text-gray-200'
                    }
                  >
                    Customers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/medicines"
                    className={({ isActive }) =>
                      isActive ? 'text-gray-300' : 'hover:text-gray-200'
                    }
                  >
                    Medicines
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/purchases"
                    className={({ isActive }) =>
                      isActive ? 'text-gray-300' : 'hover:text-gray-200'
                    }
                  >
                    Purchases
                  </NavLink>
                </li>
                <li onClick={logout}>Logout</li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
