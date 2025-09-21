import { useState } from "react";
import { Filter, MapPin, Tag, X } from "lucide-react";

interface FilterBarProps {
  categories: string[];
  locations: string[];
  neighborhoods: string[];
  states: string[];
  selectedCategory: string;
  selectedLocation: string;
  selectedNeighborhood: string;
  selectedState: string;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
  onStateChange: (state: string) => void;
  onClearFilters: () => void;
}

const FilterBar = ({
  categories,
  locations,
  neighborhoods,
  states,
  selectedCategory,
  selectedLocation,
  selectedNeighborhood,
  selectedState,
  onCategoryChange,
  onLocationChange,
  onNeighborhoodChange,
  onStateChange,
  onClearFilters,
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = selectedCategory !== "" || selectedLocation !== "" || selectedNeighborhood !== "" || selectedState !== "";

  return (
    <div className="bg-card border border-card-border rounded-xl p-6 mb-8">
      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-heading">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {(selectedCategory ? 1 : 0) + (selectedLocation ? 1 : 0) + (selectedNeighborhood ? 1 : 0) + (selectedState ? 1 : 0)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors text-sm"
            >
              <X className="h-4 w-4" />
              Clear All
            </button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-primary hover:text-primary-hover transition-colors"
          >
            {showFilters ? "Hide" : "Show"} Filters
          </button>
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-text-muted" />
              <label className="text-sm font-medium text-text-primary">Category</label>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full bg-input border border-input-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-text-muted" />
              <label className="text-sm font-medium text-text-primary">City</label>
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full bg-input border border-input-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            >
              <option value="">All Cities</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Neighborhood Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-text-muted" />
              <label className="text-sm font-medium text-text-primary">Neighborhood</label>
            </div>
            <select
              value={selectedNeighborhood}
              onChange={(e) => onNeighborhoodChange(e.target.value)}
              className="w-full bg-input border border-input-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            >
              <option value="">All Neighborhoods</option>
              {neighborhoods.map((neighborhood) => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-text-muted" />
              <label className="text-sm font-medium text-text-primary">State</label>
            </div>
            <select
              value={selectedState}
              onChange={(e) => onStateChange(e.target.value)}
              className="w-full bg-input border border-input-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-card-border">
          {selectedCategory && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <Tag className="h-3 w-3" />
              {selectedCategory}
              <button
                onClick={() => onCategoryChange("")}
                className="ml-1 hover:text-primary-hover"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {selectedLocation && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <MapPin className="h-3 w-3" />
              City: {selectedLocation}
              <button
                onClick={() => onLocationChange("")}
                className="ml-1 hover:text-primary-hover"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {selectedNeighborhood && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <MapPin className="h-3 w-3" />
              Area: {selectedNeighborhood}
              <button
                onClick={() => onNeighborhoodChange("")}
                className="ml-1 hover:text-primary-hover"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {selectedState && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <MapPin className="h-3 w-3" />
              State: {selectedState}
              <button
                onClick={() => onStateChange("")}
                className="ml-1 hover:text-primary-hover"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;