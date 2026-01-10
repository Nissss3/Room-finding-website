import React from 'react';
import { Filter } from 'lucide-react';

const FilterSection = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} />
        <h3 className="text-lg font-bold">Filters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            <option value="0-10000">Under ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
            <option value="20000-30000">₹20,000 - ₹30,000</option>
            <option value="30000+">Above ₹30,000</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="1 Bed">1 Bed</option>
            <option value="2 Bed">2 Bed</option>
            <option value="3 Bed">3 Bed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tenant Preference</label>
          <select
            value={filters.tenantPreference}
            onChange={(e) => onFilterChange({ ...filters, tenantPreference: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Family">Family</option>
            <option value="Girls">Girls</option>
            <option value="Working">Working</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;