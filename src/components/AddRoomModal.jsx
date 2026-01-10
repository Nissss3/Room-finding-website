import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import supabaseClient from '../lib/supabase.js';
import { validatePhone } from '../utils/validation';

console.log('=== DEBUG ===');
console.log('supabaseClient:', supabaseClient);
console.log('supabaseClient.from:', supabaseClient.from);
console.log('typeof supabaseClient.from:', typeof supabaseClient.from);

const AddRoomModal = ({ onClose, onSuccess, editRoom }) => {
  const [formData, setFormData] = useState(editRoom || {
    title: '',
    location: '',
    city: '',
    rent: '',
    propertyType: '1 BHK',
    tenantPreference: 'Bachelor',
    amenities: '',
    description: '',
    contactNumber: '',
    ownerName: '',
    images: []
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.rent || formData.rent < 0) newErrors.rent = 'Valid rent is required';
    if (!validatePhone(formData.contactNumber)) newErrors.contactNumber = 'Valid phone number required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async () => {
    if (!validate()) {
      //alert('Please fix all errors before submitting');
      return;
    }
    
    const user = JSON.parse(localStorage.getItem('user'));
    const roomData = { 
      ...formData, 
      ownerId: user.id,
      rent: parseInt(formData.rent)
    };
    
    if (editRoom) {
      await supabaseClient.from('rooms').update(roomData).eq('id', editRoom.id);
      alert('Room updated successfully!');
    } else {
      await supabaseClient.from('rooms').insert(roomData);
      alert('Room added successfully!');
    }
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full my-8">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-2xl font-bold">{editRoom ? 'Edit Room' : 'Add New Room'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., Spacious 2BHK in Koramangala"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Koramangala, Bangalore"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Bangalore"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rent (₹/month) *</label>
              <input
                type="number"
                value={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${errors.rent ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 25000"
              />
              {errors.rent && <p className="text-red-500 text-xs mt-1">{errors.rent}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Property Type *</label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="1 Bed">1 Bed</option>
                <option value="2 Bed">2 Bed</option>
                <option value="3 Bed">3 Bed</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tenant Preference *</label>
            <select
              value={formData.tenantPreference}
              onChange={(e) => setFormData({ ...formData, tenantPreference: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Bachelor">Bachelor</option>
              <option value="Family">Family</option>
              <option value="Girls">Girls</option>
              <option value="Working">Working Professionals</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Amenities</label>
            <input
              type="text"
              placeholder="e.g., AC, WiFi, Parking"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Describe your property..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Owner Name *</label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${errors.ownerName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Your name"
              />
              {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Number *</label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="10-digit number"
              />
              {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Upload Images *</label>
            <div className="flex items-center gap-2">
              <label className="flex-1 cursor-pointer">
                <div className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                  <Upload size={20} className="text-gray-400" />
                  <span className="text-gray-600">Choose images</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
            
            {formData.images.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Preview ${idx}`} className="w-full h-20 object-cover rounded" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t px-6 py-4 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
          <button 
            onClick={onClose} 
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editRoom ? 'Update Room' : 'Add Room'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;