# RoomFinder

A comprehensive room rental platform built with React and Vite that connects room seekers with property owners. The application features role-based authentication, advanced search and filtering capabilities, and a complete property management system.

---

## Overview

RoomFinder is a modern web application designed to streamline the process of finding and listing rental accommodations. The platform provides distinct experiences for two user types: room seekers looking for their ideal space, and property owners managing their listings. Built with a focus on user experience and responsive design, the application offers real-time search, advanced filtering, and comprehensive property information display.

---

## Key Features

### Core Functionality
- **Dual User Roles**: Separate interfaces and capabilities for room seekers and property owners
- **Advanced Search System**: Multi-parameter search with city, dates, and guest count
- **Comprehensive Filtering**: Filter results by price range, property type, and tenant preferences
- **Real-time Updates**: Immediate reflection of data changes across the application
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### For Room Seekers
- Browse extensive property listings with detailed information
- Search functionality with date-based availability checking
- Multi-parameter filtering system (price, type, preference)
- Detailed property views with amenities and contact information
- Secure authentication and profile management

### For Property Owners
- Dedicated management dashboard
- Complete property listing workflow (create, read, update, delete)
- Multi-image upload capability
- Real-time listing status and management
- Contact information management

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Frontend Framework | React | 18.2.0 |
| Build Tool | Vite | 4.4.5 |
| Styling | Tailwind CSS | 3.3.3 |
| Icons | Lucide React | 0.263.1 |
| CSS Processing | PostCSS + Autoprefixer | 8.4.27 + 10.4.14 |
| Data Storage | LocalStorage API | - |

---

## Architecture

### Project Structure

```
room-finder/
│
├── public/                          # Static assets
│   └── images/
│       └── placeholder.jpg
│
├── src/
│   ├── components/                  # React components
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── HeroSlider.jsx          # Homepage carousel
│   │   ├── SearchBox.jsx           # Search interface
│   │   ├── RoomCard.jsx            # Room display card
│   │   ├── RoomModal.jsx           # Detailed room view
│   │   ├── AuthModal.jsx           # Authentication forms
│   │   ├── FilterSection.jsx      # Filter controls
│   │   ├── AddRoomModal.jsx        # Room creation/edit form
│   │   ├── OwnerDashboard.jsx      # Owner management interface
│   │   └── ContactUsModal.jsx      # Contact information
│   │
│   ├── pages/                       # Page components
│   │   ├── HomePage.jsx            # Landing page
│   │   ├── RoomsPage.jsx           # Room listings
│   │   └── OwnerDashboardPage.jsx  # Owner dashboard page
│   │
│   ├── lib/                         # External service integrations
│   │   └── supabase.js             # Database client simulation
│   │
│   ├── utils/                       # Utility functions
│   │   └── validation.js           # Form validation logic
│   │
│   ├── App.css                      # Global styles
│   ├── index.css                    # Tailwind imports
│   └── main.jsx                     # Application entry point
│
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js              # Tailwind configuration
└── postcss.config.js               # PostCSS configuration
```

### Component Architecture

```
App (main.jsx)
│
├── Navbar
│   └── ContactUsModal
│
├── Navigation Breadcrumb
│
├── HomePage
│   ├── HeroSlider
│   ├── SearchBox
│   └── Quick Navigation Cards
│
├── RoomsPage
│   ├── FilterSection
│   ├── RoomCard (multiple)
│   └── RoomModal
│
└── OwnerDashboardPage
    └── OwnerDashboard
        └── AddRoomModal
```

---

## Component Documentation

### 1. Navbar Component

**File**: `src/components/Navbar.jsx`

**Purpose**: Primary navigation component providing consistent navigation across all pages.

**Props**:
```javascript
{
  onLoginClick: Function,      // Triggers login modal
  onRegisterClick: Function,   // Triggers registration modal
  onContactClick: Function,    // Triggers contact modal
  user: Object | null,         // Current authenticated user
  onLogout: Function          // Handles user logout
}
```

**Features**:
- Conditional rendering based on authentication state
- Dynamic button display for authenticated/unauthenticated users
- Sticky positioning for persistent access
- Responsive layout with mobile optimization

<img width="1353" height="496" alt="image" src="https://github.com/user-attachments/assets/cbf6a5db-d56c-4232-8c29-d764ff1a102a" />



---

### 2. HeroSlider Component

**File**: `src/components/HeroSlider.jsx`

**Purpose**: Carousel component displaying featured property images on the homepage.

**Features**:
- Auto-rotating slides with 4-second intervals
- Manual navigation via indicator dots
- Smooth fade transitions between slides
- Overlay gradient for text readability
- Responsive image scaling

**Technical Implementation**:
```javascript
// Auto-rotation logic
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 4000);
  return () => clearInterval(timer);
}, []);
```

<img width="1350" height="549" alt="image" src="https://github.com/user-attachments/assets/db7b1b0e-ebf8-4fed-8aca-2a579aa85fb8" />


---

### 3. SearchBox Component

**File**: `src/components/SearchBox.jsx`

**Purpose**: Main search interface enabling users to find rooms based on multiple criteria.

**Props**:
```javascript
{
  onSearch: Function,           // Callback with search parameters
  user: Object | null,          // Current user object
  onLoginRequired: Function     // Triggered when unauthenticated user searches
}
```

**Input Fields**:
- City (text input with validation)
- Check-in Date (date picker)
- Check-out Date (date picker with validation)
- Number of Guests (numeric input)

**Validation Rules**:
```javascript
- City: Required, non-empty string
- Check-in: Required, valid date
- Check-out: Required, must be after check-in date
- Guests: Required, positive integer
```

<img width="1025" height="185" alt="image" src="https://github.com/user-attachments/assets/66819bb9-d892-404b-b17a-0ca08e31675c" />

---

### 4. RoomCard Component

**File**: `src/components/RoomCard.jsx`

**Purpose**: Compact display of room information in card format for listing views.

**Props**:
```javascript
{
  room: {
    id: String,
    title: String,
    location: String,
    rent: Number,
    propertyType: String,
    tenantPreference: String,
    contactNumber: String,
    images: Array<String>
  },
  onClick: Function
}
```

**Display Elements**:
- Featured image (fixed aspect ratio)
- Property title
- Location with icon
- Monthly rent with currency symbol
- Property type badge
- Tenant preference badge
- Contact number

**Interactions**:
- Click to view full details
- Hover effect for visual feedback

<img width="1349" height="639" alt="image" src="https://github.com/user-attachments/assets/208f3700-2db4-44d3-aaa2-ba1e388ab269" />


---

### 5. RoomModal Component

**File**: `src/components/RoomModal.jsx`

**Purpose**: Full-screen modal displaying comprehensive room information.

**Props**:
```javascript
{
  room: Object,      // Complete room data object
  onClose: Function  // Modal close handler
}
```

**Information Sections**:
1. **Header**: Room title with close button
2. **Image Display**: Featured image
3. **Property Details Grid**:
   - Location
   - Monthly rent
   - Property type
   - Tenant preference
4. **Amenities Section**: Comma-separated list
5. **Description**: Full property description
6. **Owner Contact**: Name and phone number in highlighted section

<img width="1346" height="621" alt="image" src="https://github.com/user-attachments/assets/48c0e6f7-e9cb-416c-9521-f9883bb2d4ac" />


---

### 6. AuthModal Component

**File**: `src/components/AuthModal.jsx`

**Purpose**: Unified authentication interface handling both login and registration.

**Props**:
```javascript
{
  isLogin: Boolean,     // Toggle between login/register mode
  onClose: Function,    // Modal close handler
  onSuccess: Function   // Callback with user data after authentication
}
```

**Registration Fields**:
```javascript
{
  name: String,           // Validated: 2-50 chars, letters only
  email: String,          // Validated: standard email format
  phone: String,          // Validated: 10 digits, starts with 6-9
  password: String,       // Validated: minimum 6 characters
  role: Enum['user', 'owner']  // User type selection
}
```

**Login Fields**:
```javascript
{
  email: String,
  password: String
}
```

**Validation Implementation**:
```javascript
// Email validation
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Phone validation (Indian format)
/^[6-9]\d{9}$/.test(phone)

// Name validation
/^[a-zA-Z\s]{2,50}$/.test(name)
```

<img width="1350" height="638" alt="image" src="https://github.com/user-attachments/assets/944d27f4-657d-4044-9c23-74445e383368" />


---

### 7. FilterSection Component

**File**: `src/components/FilterSection.jsx`

**Purpose**: Advanced filtering controls for refining room search results.

**Props**:
```javascript
{
  filters: {
    priceRange: String,
    propertyType: String,
    tenantPreference: String,
    sortBy: String
  },
  onFilterChange: Function
}
```

**Filter Options**:

**Price Range**:
- All
- Under ₹10,000
- ₹10,000 - ₹20,000
- ₹20,000 - ₹30,000
- Above ₹30,000

**Property Type**:
- All
- 1 BHK
- 2 BHK
- 1 Bed
- 2 Bed
- 3 Bed

**Tenant Preference**:
- All
- Bachelor
- Family
- Girls
- Working

**Sort Options**:
- Default
- Price: Low to High
- Price: High to Low

<img width="1101" height="242" alt="image" src="https://github.com/user-attachments/assets/eda51762-8c52-4540-8b3a-bd339bf52c7b" />


---

### 8. AddRoomModal Component

**File**: `src/components/AddRoomModal.jsx`

**Purpose**: Form interface for creating new room listings or editing existing ones.

**Props**:
```javascript
{
  onClose: Function,
  onSuccess: Function,
  editRoom: Object | null  // If provided, modal operates in edit mode
}
```

**Form Structure**:

**Required Fields**:
- Title (text)
- Location (text)
- City (text)
- Monthly Rent (number, must be positive)
- Owner Name (text)
- Contact Number (validated phone)

**Optional Fields**:
- Property Type (dropdown, default: 1 BHK)
- Tenant Preference (dropdown, default: Bachelor)
- Amenities (text)
- Description (textarea)

**Image Upload**:
- Multiple file selection
- Client-side preview
- URL generation for storage

**Validation Rules**:
```javascript
{
  title: required && non-empty,
  location: required && non-empty,
  city: required && non-empty,
  rent: required && positive number,
  ownerName: required && non-empty,
  contactNumber: required && valid Indian phone
}
```

<img width="1107" height="508" alt="image" src="https://github.com/user-attachments/assets/bc4b5a18-27ce-46ef-85b4-e6c6e91b131d" />

<img width="1110" height="521" alt="image" src="https://github.com/user-attachments/assets/7fd24e5a-0bfd-42f0-84a6-415188577ec5" />


---

### 9. OwnerDashboard Component

**File**: `src/components/OwnerDashboard.jsx`

**Purpose**: Central management interface for property owners.

**Props**:
```javascript
{
  user: Object  // Current authenticated owner
}
```

**Features**:
- Display all rooms owned by current user
- Add new room button (always visible)
- Edit room functionality
- Delete room with confirmation dialog
- Empty state message for new owners
- Responsive grid layout (1-3 columns)

**Data Operations**:
```javascript
// Load owner's rooms
loadMyRooms() {
  const rooms = JSON.parse(localStorage.getItem('rooms') || '[]');
  return rooms.filter(room => room.ownerId === user.id);
}

// Delete room
handleDelete(roomId) {
  confirm('Are you sure?') && 
    supabase.from('rooms').delete().eq('id', roomId);
}
```

<img width="1120" height="524" alt="image" src="https://github.com/user-attachments/assets/07208989-4b4d-461b-912c-9f0796b71074" />


---

### 10. ContactUsModal Component

**File**: `src/components/ContactUsModal.jsx`

**Purpose**: Display platform contact information for user inquiries.

**Props**:
```javascript
{
  onClose: Function
}
```

**Features**:
- Professional messaging
- Clickable email link (mailto:)
- Clickable phone link (tel:)
- Response time information
- Clean, minimal design

**Contact Methods**:
```javascript
{
  email: "ashishk@example.com",  // Opens email client
  phone: "+91 98765 43210"       // Opens phone dialer
}
```

<img width="1352" height="630" alt="image" src="https://github.com/user-attachments/assets/4ead4f5e-5644-4f90-8b46-fbad6637d110" />


---

## Page Documentation

### HomePage

**File**: `src/pages/HomePage.jsx`

**Purpose**: Main landing page providing overview and quick navigation.

**Layout Structure**:
1. Hero slider section
2. Search box (centered, elevated)
3. Quick navigation cards:
   - View All Rooms
   - Owner Dashboard (conditional)
   - User Status

**User Experience Flow**:
```
Landing → Search/Browse → View Details → Contact Owner
         ↓
    (if owner)
         ↓
    Add/Manage Listings
```

<img width="1351" height="643" alt="image" src="https://github.com/user-attachments/assets/f8497724-76e4-4e7d-a2b7-8ffdb23ea942" />


---

### RoomsPage

**File**: `src/pages/RoomsPage.jsx`

**Purpose**: Display all available room listings with filtering capabilities.

**Props**:
```javascript
{
  user: Object | null,
  onLoginRequired: Function
}
```

**Features**:
- Grid layout of room cards
- Filter section (visible only to authenticated users)
- Real-time filtering and sorting
- Empty state handling
- Modal view for detailed information

**Data Flow**:
```javascript
loadRooms() {
  let rooms = getAllRooms();
  rooms = applyFilters(rooms, filters);
  rooms = applySorting(rooms, sortBy);
  setRooms(rooms);
}
```

<img width="1110" height="526" alt="image" src="https://github.com/user-attachments/assets/ae5281d8-d3e6-42d1-bd7d-3c19bf096936" />

---

### OwnerDashboardPage

**File**: `src/pages/OwnerDashboardPage.jsx`

**Purpose**: Wrapper page for owner dashboard functionality.

**Props**:
```javascript
{
  user: Object
}
```

**Access Control**:
- Only accessible to users with role: 'owner'
- Redirects non-owners to home page
- Validates authentication status

<img width="1366" height="621" alt="image" src="https://github.com/user-attachments/assets/9fe262e5-8a44-4561-89a6-43f39f08e5fb" />

---

## User Roles and Permissions

### Room Finder (User)

**Role Identifier**: `role: 'user'`

**Capabilities**:
| Feature | Access |
|---------|--------|
| Browse Rooms | ✓ |
| Search Functionality | ✓ |
| Apply Filters | ✓ |
| View Room Details | ✓ |
| Contact Owners | ✓ |
| Add Rooms | ✗ |
| Edit Rooms | ✗ |
| Delete Rooms | ✗ |
| Access Owner Dashboard | ✗ |

---

### Room Owner

**Role Identifier**: `role: 'owner'`

**Capabilities**:
| Feature | Access |
|---------|--------|
| Browse Rooms | ✓ |
| Search Functionality | ✓ |
| Apply Filters | ✓ |
| View Room Details | ✓ |
| Contact Owners | ✓ |
| Add Rooms | ✓ |
| Edit Own Rooms | ✓ |
| Delete Own Rooms | ✓ |
| Access Owner Dashboard | ✓ |
| Edit Others' Rooms | ✗ |
| Delete Others' Rooms | ✗ |

---

## Data Management

### LocalStorage Schema

**User Object**:
```javascript
{
  id: String,              // Unique identifier
  email: String,           // User email
  name: String,            // Full name
  phone: String,           // Contact number
  role: Enum['user', 'owner']  // User type
}
```

**Room Object**:
```javascript
{
  id: String,              // Unique identifier
  title: String,           // Property title
  location: String,        // Detailed location
  city: String,            // City name
  rent: Number,            // Monthly rent amount
  propertyType: String,    // Type of property
  tenantPreference: String, // Preferred tenant type
  amenities: String,       // Comma-separated amenities
  description: String,     // Detailed description
  contactNumber: String,   // Owner contact
  ownerName: String,       // Owner full name
  images: Array<String>,   // Image URLs
  ownerId: String         // Reference to owner user ID
}
```

**Storage Keys**:
- `user`: Current authenticated user
- `rooms`: Array of all room listings

### Data Operations

**Create Room**:
```javascript
const newRoom = { ...formData, id: generateId(), ownerId: user.id };
const rooms = getFromStorage('rooms');
rooms.push(newRoom);
saveToStorage('rooms', rooms);
```

**Update Room**:
```javascript
const rooms = getFromStorage('rooms');
const index = rooms.findIndex(r => r.id === roomId);
rooms[index] = { ...rooms[index], ...updates };
saveToStorage('rooms', rooms);
```

**Delete Room**:
```javascript
const rooms = getFromStorage('rooms');
const filtered = rooms.filter(r => r.id !== roomId);
saveToStorage('rooms', filtered);
```

---

## Validation System

### Email Validation

**Pattern**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**Valid Examples**:
- user@example.com
- john.doe@company.co.in
- contact123@domain.org

**Invalid Examples**:
- user@domain
- @example.com
- user.domain.com

---

### Phone Number Validation

**Pattern**: `/^[6-9]\d{9}$/`

**Rules**:
- Exactly 10 digits
- First digit must be 6, 7, 8, or 9
- Indian mobile number format

**Valid Examples**:
- 9876543210
- 7012345678
- 8899001122

**Invalid Examples**:
- 5876543210 (starts with 5)
- 98765432 (only 8 digits)
- 987-654-3210 (contains hyphens)

---

### Name Validation

**Pattern**: `/^[a-zA-Z\s]{2,50}$/`

**Rules**:
- Minimum 2 characters
- Maximum 50 characters
- Only letters and spaces allowed
- No numbers or special characters

**Valid Examples**:
- John Doe
- Mary Jane Watson
- Raj

**Invalid Examples**:
- J (too short)
- John123 (contains numbers)
- John_Doe (contains underscore)

---

## Future Enhancements

### Phase 1: Backend Integration
- Replace LocalStorage with PostgreSQL/MongoDB
- Implement JWT-based authentication
- Add server-side validation and sanitization
- Create RESTful API endpoints

### Phase 2: Advanced Features
- User reviews and ratings system
- Favorite/wishlist functionality
- Interactive map integration (Google Maps/Mapbox)
- Email notification system
- Real-time chat between users and owners
- Payment gateway integration
- Booking calendar with availability management

### Phase 3: Media Management
- Cloud storage integration (AWS S3/Cloudinary)
- Image compression and optimization
- Multiple image uploads with gallery view
- Video tour capability

### Phase 4: Analytics & Insights
- User behavior tracking
- Popular search analytics
- Conversion metrics
- Owner dashboard analytics
- Revenue tracking

### Phase 5: Enhanced Security
- Password encryption (bcrypt)
- Rate limiting
- CSRF protection
- XSS prevention
- SQL injection prevention
- Two-factor authentication

### Phase 6: Mobile Application
- React Native mobile app
- Push notifications
- Offline mode
- Location-based search
- Camera integration for image upload
