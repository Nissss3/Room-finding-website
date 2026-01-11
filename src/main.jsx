import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import SearchBox from './components/SearchBox'
import AuthModal from './components/AuthModal'
import RoomsPage from './pages/RoomsPage'
import OwnerDashboardPage from './pages/OwnerDashboardPage'

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'rooms', 'dashboard'

  // Initialize sample rooms in localStorage
  React.useEffect(() => {
  if (!localStorage.getItem('rooms')) {
    const sampleRooms = [
      {
        id: '1',
        title: 'Spacious 2BHK in Koramangala',
        location: 'Koramangala, Bangalore',
        city: 'Bangalore',
        rent: 25000,
        propertyType: '2 BHK',
        tenantPreference: 'Family',
        contactNumber: '9876543210',
        ownerName: 'Rajesh Kumar',
        amenities: 'AC, WiFi, Parking, Security',
        description: 'Beautiful 2BHK apartment with modern amenities.',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500'],
        ownerId: 'owner1'
      },
      {
        id: '2',
        title: 'Cozy 1BHK near Metro',
        location: 'Indiranagar, Bangalore',
        city: 'Bangalore',
        rent: 18000,
        propertyType: '1 BHK',
        tenantPreference: 'Bachelor',
        contactNumber: '9876543211',
        ownerName: 'Priya Sharma',
        amenities: 'WiFi, Gym, Power Backup',
        description: 'Perfect for working professionals.',
        images: ['https://images.unsplash.com/photo-1502672260066-6bc35f0a1077?w=500'],
        ownerId: 'owner2'
      },
      {
        id: '3',
        title: 'Girls PG with Food',
        location: 'HSR Layout, Bangalore',
        city: 'Bangalore',
        rent: 12000,
        propertyType: '1 Bed',
        tenantPreference: 'Girls',
        contactNumber: '9876543212',
        ownerName: 'Lakshmi Devi',
        amenities: 'Food, WiFi, AC, Laundry',
        description: 'Safe and secure PG for working women.',
        images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500'],
        ownerId: 'owner3'
      },
      {
        id: '4',
        title: 'Luxury 3BHK Apartment',
        location: 'Whitefield, Bangalore',
        city: 'Bangalore',
        rent: 45000,
        propertyType: '3 BHK',
        tenantPreference: 'Family',
        contactNumber: '9876543213',
        ownerName: 'Amit Patel',
        amenities: 'AC, WiFi, Parking, Swimming Pool',
        description: 'Premium apartment with all modern facilities.',
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'],
        ownerId: 'owner4'
      },
      {
        id: '5',
        title: 'Affordable Studio Apartment',
        location: 'Marathahalli, Bangalore',
        city: 'Bangalore',
        rent: 15000,
        propertyType: '1 BHK',
        tenantPreference: 'Bachelor',
        contactNumber: '9876543214',
        ownerName: 'Sunita Reddy',
        amenities: 'WiFi, Power Backup',
        description: 'Compact and affordable for single professionals.',
        images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500'],
        ownerId: 'owner5'
      },
      {
        id: '6',
        title: 'Boys PG Near IT Park',
        location: 'Electronic City, Bangalore',
        city: 'Bangalore',
        rent: 10000,
        propertyType: '2 Bed',
        tenantPreference: 'Bachelor',
        contactNumber: '9876543215',
        ownerName: 'Ramesh Iyer',
        amenities: 'Food, WiFi, Laundry',
        description: 'Convenient PG for IT professionals.',
        images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500'],
        ownerId: 'owner6'
      },
      {
        id: '7',
        title: 'Premium Villa with Garden',
        location: 'Sarjapur Road, Bangalore',
        city: 'Bangalore',
        rent: 65000,
        propertyType: '3 BHK',
        tenantPreference: 'Family',
        contactNumber: '9876543216',
        ownerName: 'Kavita Menon',
        amenities: 'AC, WiFi, Parking, Garden, Security',
        description: 'Spacious villa perfect for families.',
        images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500'],
        ownerId: 'owner7'
      },
      {
        id: '8',
        title: 'Modern 2BHK Furnished',
        location: 'BTM Layout, Bangalore',
        city: 'Bangalore',
        rent: 28000,
        propertyType: '2 BHK',
        tenantPreference: 'Family',
        contactNumber: '9876543217',
        ownerName: 'Deepak Singh',
        amenities: 'Fully Furnished, AC, WiFi',
        description: 'Ready to move in with all furniture.',
        images: ['https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=500'],
        ownerId: 'owner8'
      },
      {
        id: '9',
        title: 'Shared Room for Students',
        location: 'Jayanagar, Bangalore',
        city: 'Bangalore',
        rent: 7000,
        propertyType: '1 Bed',
        tenantPreference: 'Bachelor',
        contactNumber: '9876543218',
        ownerName: 'Geeta Nair',
        amenities: 'WiFi, Study Table',
        description: 'Budget-friendly option for students.',
        images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500'],
        ownerId: 'owner9'
      },
      {
        id: '10',
        title: 'Penthouse with Terrace',
        location: 'MG Road, Bangalore',
        city: 'Bangalore',
        rent: 85000,
        propertyType: '3 BHK',
        tenantPreference: 'Family',
        contactNumber: '9876543219',
        ownerName: 'Arjun Malhotra',
        amenities: 'AC, WiFi, Parking, Terrace, Gym',
        description: 'Luxurious penthouse in prime location.',
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'],
        ownerId: 'owner10'
      },
      {
        id: '11',
        title: 'Working Women Hostel',
        location: 'Malleshwaram, Bangalore',
        city: 'Bangalore',
        rent: 11000,
        propertyType: '1 Bed',
        tenantPreference: 'Girls',
        contactNumber: '9876543220',
        ownerName: 'Meera Krishnan',
        amenities: 'Food, WiFi, Security, Laundry',
        description: 'Safe hostel with all facilities.',
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500'],
        ownerId: 'owner11'
      },
      {
        id: '12',
        title: 'Duplex House for Rent',
        location: 'Hebbal, Bangalore',
        city: 'Bangalore',
        rent: 55000,
        propertyType: '3 BHK',
        tenantPreference: 'Family',
        contactNumber: '9876543221',
        ownerName: 'Sanjay Gupta',
        amenities: 'AC, WiFi, Parking, Garden',
        description: 'Spacious duplex with modern amenities.',
        images: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500'],
        ownerId: 'owner12'
      }
    ];
    localStorage.setItem('rooms', JSON.stringify(sampleRooms));
  }
}, []);


  const handleLogin = () => {
    setIsLogin(true);
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setIsLogin(false);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData) => {
  setUser(userData);
  setShowAuthModal(false);
  // Removed alert
  
  // If owner, redirect to dashboard
  if (userData.role === 'owner') {
    setCurrentView('dashboard');
  }
};

  const handleLogout = () => {
  setUser(null);
  localStorage.removeItem('user');
  setCurrentView('home');
  // Removed alert
};

 const handleLoginRequired = () => {
  // Removed alert
  setShowAuthModal(true);
  setIsLogin(true);
};

  // Render different views based on currentView
  const renderContent = () => {
    if (currentView === 'dashboard' && user?.role === 'owner') {
      return <OwnerDashboardPage user={user} />;
    }

    if (currentView === 'rooms') {
      return <RoomsPage user={user} onLoginRequired={handleLoginRequired} />;
    }

    // Home view
    return (
      <>
        <HeroSlider />
        
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <SearchBox 
            onSearch={(data) => {
              console.log('Search:', data);
              setCurrentView('rooms');
            }}
            user={user}
            onLoginRequired={handleLoginRequired}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">🏠 View All Rooms</h3>
              <p className="text-gray-600 mb-4">Browse all available rooms and apply filters</p>
              <button
                onClick={() => setCurrentView('rooms')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse Rooms
              </button>
            </div>

            {user?.role === 'owner' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">📊 Owner Dashboard</h3>
                <p className="text-gray-600 mb-4">Manage your room listings</p>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Go to Dashboard
                </button>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">👤 User Status</h3>
              <p className="text-gray-600 mb-2">
                {user ? `Logged in as: ${user.name || user.email}` : 'Not logged in'}
              </p>
              <p className="text-gray-600">
                {user ? `Role: ${user.role}` : 'Please login to continue'}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="text-lg font-bold text-purple-800">✅ Testing Pages!</h3>
            <ul className="text-purple-700 mt-2 space-y-1">
              <li>• Click "Browse Rooms" to test RoomsPage</li>
              <li>• Register as "Room Owner" to see Dashboard button</li>
              <li>• Test navigation between pages</li>
              <li>• Current view: <strong>{currentView}</strong></li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onLoginClick={handleLogin}
        onRegisterClick={handleRegister}
        user={user}
        onLogout={handleLogout}
      />

      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-3 py-1 rounded ${currentView === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView('rooms')}
            className={`px-3 py-1 rounded ${currentView === 'rooms' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Rooms
          </button>
          {user?.role === 'owner' && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1 rounded ${currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Dashboard
            </button>
          )}
        </div>
      </div>
      
      {renderContent()}

      {showAuthModal && (
        <AuthModal 
          isLogin={isLogin}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}

const rootElement = document.getElementById('root');
if (!rootElement._reactRoot) {
  rootElement._reactRoot = ReactDOM.createRoot(rootElement);
}
rootElement._reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);