import React from 'react';
import { Home, LogIn, UserPlus, Mail } from 'lucide-react';

const Navbar = ({ onLoginClick, onRegisterClick, onContactClick, user, onLogout }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Home className="text-blue-600" size={32} />
          <span className="text-2xl font-bold text-gray-800">EasyHousing</span>
        </div>
        <div className="flex gap-3">
          {user ? (
            <>
              <span className="px-4 py-2 text-gray-700">
                Hi, {user.name || user.email}
              </span>
              <button 
                onClick={onContactClick} 
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <Mail size={18} /> Contact Us
              </button>
              <button 
                onClick={onLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={onLoginClick} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <LogIn size={18} /> Login
              </button>
              <button 
                onClick={onRegisterClick} 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <UserPlus size={18} /> Register
              </button>
              <button 
                onClick={onContactClick}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <Mail size={18} /> Contact Us
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;