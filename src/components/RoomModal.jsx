import React from 'react';
import { X, MapPin, IndianRupee, Bed, User, Phone } from 'lucide-react';

const RoomModal = ({ room, onClose }) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{room.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <img 
            src={room.images[0]} 
            alt={room.title} 
            className="w-full h-64 object-cover rounded-lg mb-4" 
          />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="font-semibold flex items-center">
                <MapPin size={16} className="mr-1" /> {room.location}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Rent</p>
              <p className="font-bold text-green-600 text-xl flex items-center">
                <IndianRupee size={20} /> {room.rent.toLocaleString()}/month
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Property Type</p>
              <p className="font-semibold flex items-center">
                <Bed size={16} className="mr-1" /> {room.propertyType}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Tenant Preference</p>
              <p className="font-semibold flex items-center">
                <User size={16} className="mr-1" /> {room.tenantPreference}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Amenities</p>
            <p className="font-semibold">{room.amenities}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Description</p>
            <p className="text-gray-700">{room.description}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Owner Details</p>
            <p className="font-semibold">{room.ownerName}</p>
            <p className="flex items-center text-gray-700">
              <Phone size={16} className="mr-2" /> {room.contactNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;