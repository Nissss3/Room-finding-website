import React, { useState, useEffect } from 'react';
import { MapPin, IndianRupee, Phone, X } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import SearchBox from '../components/SearchBox';
import FilterSection from '../components/FilterSection';
import RoomCard from '../components/RoomCard';
import RoomModal from '../components/RoomModal';
import AuthModal from '../components/AuthModal';

const RoomsPage = ({ user, onLoginRequired }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: '',
    propertyType: '',
    tenantPreference: '',
    sortBy: ''
  });
  const [searchQuery, setSearchQuery] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    loadRooms();
  }, [filters, searchQuery]);

  const loadRooms = () => {
    let allRooms = JSON.parse(localStorage.getItem('rooms') || '[]');
    
    if (searchQuery?.city) {
      allRooms = allRooms.filter(room => 
        room.city.toLowerCase().includes(searchQuery.city.toLowerCase())
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-');
      if (max) {
        allRooms = allRooms.filter(room => room.rent >= parseInt(min) && room.rent <= parseInt(max));
      } else {
        allRooms = allRooms.filter(room => room.rent >= parseInt(min));
      }
    }

    if (filters.propertyType) {
      allRooms = allRooms.filter(room => room.propertyType === filters.propertyType);
    }

    if (filters.tenantPreference) {
      allRooms = allRooms.filter(room => room.tenantPreference === filters.tenantPreference);
    }

    if (filters.sortBy === 'price-low') {
      allRooms.sort((a, b) => a.rent - b.rent);
    } else if (filters.sortBy === 'price-high') {
      allRooms.sort((a, b) => b.rent - a.rent);
    }

    setRooms(allRooms);
  };

  const handleRoomClick = (room) => {
    if (!user) {
      setShowAuthModal(true);
      setIsLogin(true);
    } else {
      setSelectedRoom(room);
    }
  };

  const handleSearch = (searchData) => {
    setSearchQuery(searchData);
  };

  const handleLoginRequiredLocal = () => {
    setShowAuthModal(true);
    setIsLogin(true);
    if (onLoginRequired) onLoginRequired();
  };

  const handleAuthSuccess = (userData) => {
    setShowAuthModal(false);
    window.location.reload(); // Reload to update user state
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSlider />
      
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <SearchBox onSearch={handleSearch} user={user} onLoginRequired={handleLoginRequiredLocal} />
      </div>

      {user && (
        <div className="max-w-7xl mx-auto px-4">
          <FilterSection filters={filters} onFilterChange={setFilters} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold mb-6">
          {searchQuery ? `Rooms in ${searchQuery.city}` : 'Featured Rooms'}
        </h2>
        {rooms.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No rooms found matching your criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show only 6 rooms if not logged in, otherwise show all */}
              {(user ? rooms : rooms.slice(0, 6)).map(room => (
                <RoomCard key={room.id} room={room} onClick={() => handleRoomClick(room)} />
              ))}
            </div>
            
            {/* Show "View More" button only if not logged in and there are more than 6 rooms */}
            {!user && rooms.length > 6 && (
              <div className="text-center mt-10">
                <button
                  onClick={handleLoginRequiredLocal}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                   View More Rooms
                </button>
                <p className="text-gray-600 mt-3 text-sm">
                  Sign in to access all rooms, filters, and exclusive features
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {showAuthModal && (
        <AuthModal
          isLogin={isLogin}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </div>
  );
};

export default RoomsPage;