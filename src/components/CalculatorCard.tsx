import React from 'react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface CalculatorCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  path: string;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ icon, title, description, path }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <button 
          onClick={() => navigate(path)}
          className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Utforska
        </button>
      </div>
    </div>
  );
};

export default CalculatorCard;