import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AddRoomModal from '../components/AddRoomModal';
import supabase from '../lib/supabase';

const OwnerDashboard = ({ user }) => {
  const [myRooms, setMyRooms] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

  useEffect(() => {
    loadMyRooms();
  }, []);

  const loadMyRooms = () => {
    const rooms = JSON.parse(localStorage.getItem('rooms') || '[]');
    setMyRooms(rooms.filter(room => room.ownerId === user.id));
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await supabase.from('rooms').delete().eq('id', roomId);
      loadMyRooms();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Room Listings</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Add New Room
        </button>
      </div>

      {myRooms.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">You haven't added any rooms yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Your First Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRooms.map(room => (
            <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={room.images[0]} alt={room.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                <p className="text-gray-600 mb-2">{room.location}</p>
                <p className="text-green-600 font-bold text-xl mb-3">₹{room.rent.toLocaleString()}/month</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditRoom(room); setShowAddModal(true); }}
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddRoomModal
          editRoom={editRoom}
          onClose={() => { setShowAddModal(false); setEditRoom(null); }}
          onSuccess={() => { setShowAddModal(false); setEditRoom(null); loadMyRooms(); }}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;