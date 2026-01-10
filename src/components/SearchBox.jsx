import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const SearchBox = ({ onSearch, user, onLoginRequired }) => {
  const [searchData, setSearchData] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  });
  const [errors, setErrors] = useState({});

  const validateSearch = () => {
    const newErrors = {};
    if (!searchData.city.trim()) newErrors.city = 'City is required';
    if (!searchData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!searchData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (!searchData.guests || searchData.guests < 1) {
      newErrors.guests = 'Number of guests is required';
    }
    
    if (searchData.checkIn && searchData.checkOut && 
        new Date(searchData.checkIn) >= new Date(searchData.checkOut)) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (!user) {
      onLoginRequired();
      return;
    }
    if (validateSearch()) {
      onSearch(searchData);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto -mt-10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter city name"
              value={searchData.city}
              onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg ${
                errors.checkIn ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg ${
                errors.checkOut ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="number"
              min="1"
              placeholder="Number of guests"
              value={searchData.guests}
              onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg ${
                errors.guests ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-semibold"
      >
        <Search size={20} /> Search Rooms
      </button>
    </div>
  );
};

export default SearchBox;