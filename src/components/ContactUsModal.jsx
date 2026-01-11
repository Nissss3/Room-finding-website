import React from 'react';
import { X, Mail, Phone } from 'lucide-react';

const ContactUsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Have Any Feedback, Reports, or Anything You Want to Tell Us?
            </h3>
            <p className="text-gray-600">
              Please reach out to us! We'd love to hear from you.
            </p>
          </div>

          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <a 
                href="mailto:ashishk@example.com" 
                className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Mail size={20} />
                <span>aniskabachar@gmail.com</span>
              </a>
              <p className="text-xs text-gray-500 mt-1 ml-8">Click to send email</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Phone size={20} />
                <span>+91 96195 19493</span>
              </a>
              <p className="text-xs text-gray-500 mt-1 ml-8">Click to call</p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>We typically respond within 24-48 hours</p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsModal;