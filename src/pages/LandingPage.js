import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Card } from '../components/Card';

export const LandingPage = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="-mt-28">
        <nav>
          <ul className="list-none">
            {auth ? (
              <>
                <li className="inline-block">
                  <Link
                    to="/customers"
                    className="px-6 py-2hover:cursor-pointer"
                  >
                    <Card
                      url={
                        'https://e7.pngegg.com/pngimages/401/227/png-clipart-computer-icons-user-google-account-icon-design-microsoft-account-create-account-text-number-thumbnail.png'
                      }
                      name={'Customers'}
                    />
                  </Link>
                </li>
                <li className="inline-block">
                  <Link
                    to="/medicines"
                    className="px-6 py-2 rounded-lg hover:cursor-pointer"
                  >
                    <Card
                      url={
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeqNOxyP_V27Bsjje9mzHluL9R0vTNryK0M1OYEqmVakicqd2ykLEVfEzs-LCs43HgIao&usqp=CAU'
                      }
                      name={'Medicines'}
                    />
                  </Link>
                </li>
                <li className="inline-block">
                  <Link
                    to="/purchases"
                    className="px-6 py-2hover:cursor-pointer"
                  >
                    <Card
                      url={
                        'https://cdn.iconscout.com/icon/premium/png-256-thumb/rupees-bill-1-1156917.png'
                      }
                      name={'Purchases'}
                    />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="inline-block">
                  <Link
                    to="/signup"
                    className="px-6 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  >
                    Signup
                  </Link>
                </li>
                <li className="inline-block">
                  <Link
                    to="/login"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-[#153448]">
        Welcome to Medistock
      </h1>
    </div>
  );
};
