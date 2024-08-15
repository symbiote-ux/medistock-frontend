import React from 'react';

export const Card = ({ url, name }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 m-4">
      <img className="w-full h-48 object-cover" src={url} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{name}</div>
      </div>
    </div>
  );
};
