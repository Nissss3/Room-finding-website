// Database helper functions
function getFromLocalStorage(table) {
  return JSON.parse(localStorage.getItem(table) || '[]');
}

function saveToLocalStorage(table, data) {
  localStorage.setItem(table, JSON.stringify(data));
}

// Supabase client
const supabaseClient = {
  auth: {
    signUp: async ({ email, password, options }) => {
      const user = { 
        id: 'user_' + Date.now(), 
        email, 
        ...options.data 
      };
      localStorage.setItem('user', JSON.stringify(user));
      return { data: { user }, error: null };
    },
    signInWithPassword: async ({ email, password }) => {
      const user = { 
        id: 'user_' + Date.now(), 
        email, 
        role: 'user' 
      };
      localStorage.setItem('user', JSON.stringify(user));
      return { data: { user }, error: null };
    },
    signOut: async () => {
      localStorage.removeItem('user');
      return { error: null };
    },
    getUser: async () => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      return { data: { user }, error: null };
    }
  }
};

// Add the from method
supabaseClient.from = function(table) {
  console.log('from() called with table:', table);
  return {
    select: function() {
      const allData = getFromLocalStorage(table);
      return {
        eq: function(field, value) {
          return {
            data: allData.filter(item => item[field] === value),
            error: null
          };
        },
        data: allData,
        error: null
      };
    },
    insert: function(data) {
      console.log('insert() called with data:', data);
      const items = getFromLocalStorage(table);
      const newItem = { 
        ...data, 
        id: 'room_' + Date.now()
      };
      items.push(newItem);
      saveToLocalStorage(table, items);
      console.log('Room saved successfully:', newItem);
      return { data: newItem, error: null };
    },
    update: function(data) {
      return {
        eq: function(field, value) {
          const items = getFromLocalStorage(table);
          const index = items.findIndex(item => item[field] === value);
          if (index !== -1) {
            items[index] = { ...items[index], ...data };
            saveToLocalStorage(table, items);
            return { data: items[index], error: null };
          }
          return { data: null, error: { message: 'Item not found' } };
        }
      };
    },
    delete: function() {
      return {
        eq: function(field, value) {
          const items = getFromLocalStorage(table);
          const filtered = items.filter(item => item[field] !== value);
          saveToLocalStorage(table, filtered);
          return { error: null };
        }
      };
    }
  };
};

// Storage
supabaseClient.storage = {
  from: function() {
    return {
      upload: async function(path, file) {
        return { data: { path: URL.createObjectURL(file) }, error: null };
      },
      getPublicUrl: function(path) {
        return { data: { publicUrl: path } };
      }
    };
  }
};

// Sample data
const sampleRooms = [
  {
    id: '1',
    title: 'Spacious 2BHK in Koramangala',
    location: 'Koramangala, Bangalore',
    city: 'Bangalore',
    rent: 25000,
    propertyType: '2 BHK',
    tenantPreference: 'Family',
    amenities: 'AC, WiFi, Parking',
    description: 'Beautiful 2BHK apartment with modern amenities',
    contactNumber: '9876543210',
    ownerName: 'Rajesh Kumar',
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
    amenities: 'WiFi, Gym',
    description: 'Perfect for working professionals',
    contactNumber: '9876543211',
    ownerName: 'Priya Sharma',
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
    amenities: 'Food, WiFi, AC',
    description: 'Safe and secure PG for working women',
    contactNumber: '9876543212',
    ownerName: 'Lakshmi Devi',
    images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500'],
    ownerId: 'owner3'
  }
];

if (!localStorage.getItem('rooms')) {
  localStorage.setItem('rooms', JSON.stringify(sampleRooms));
}

export default supabaseClient;