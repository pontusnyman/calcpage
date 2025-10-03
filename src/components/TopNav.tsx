import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.svg';

interface Category {
  id: string;
  title: string;
}

interface TopNavProps {
  currentPage?: 'home' | 'blog';
  categories?: Category[];
  onCategoryClick?: (categoryId: string) => void;
  showCalculators?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ 
  currentPage = 'home', 
  categories = [], 
  onCategoryClick,
  showCalculators = false 
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex justify-center md:justify-start">
            <Link to="/">
              <img src={logo} alt="logo" className="w-[15rem]" />
            </Link>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 md:ml-4">
            <Link
              to="/blog"
              className={`flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap ${
                currentPage === 'blog' 
                  ? 'text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Blogg
            </Link>
            {showCalculators && categories.length > 0 && (
              <div className="flex overflow-x-auto pb-2 -mb-2 space-x-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryClick?.(category.id)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 whitespace-nowrap"
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
