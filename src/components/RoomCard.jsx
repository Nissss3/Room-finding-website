import React from 'react';
import { MapPin, IndianRupee, Phone } from 'lucide-react';

const RoomCard = ({ room, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    >
      <img 
        src={room.images[0]} 
        alt={room.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{room.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{room.location}</span>
        </div>
        <div className="flex items-center text-green-600 font-bold text-xl mb-2">
          <IndianRupee size={20} />
          <span>{room.rent.toLocaleString()}/month</span>
        </div>
        <div className="flex gap-2 mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {room.propertyType}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
            {room.tenantPreference}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Phone size={14} className="mr-1" />
          <span>{room.contactNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;