import { useState, useMemo, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BusinessCard from "../components/BusinessCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import PasswordModal from "../components/PasswordModal";
import { Business } from "../components/BusinessCard";
import dataset from "../data/dataset.json";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("business-directory-auth") === "true";
  });
  
  const itemsPerPage = 9;

  // Extract unique categories and locations
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set((dataset as Business[]).map(b => b.categoryName)));
    return uniqueCategories.sort();
  }, []);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set((dataset as Business[]).map(b => b.city).filter(Boolean)));
    return uniqueLocations.sort();
  }, []);

  const neighborhoods = useMemo(() => {
    const uniqueNeighborhoods = Array.from(new Set((dataset as Business[]).map(b => b.neighborhood).filter(Boolean)));
    return uniqueNeighborhoods.sort();
  }, []);

  const states = useMemo(() => {
    const uniqueStates = Array.from(new Set((dataset as Business[]).map(b => b.state).filter(Boolean)));
    return uniqueStates.sort();
  }, []);
  
  dataset.forEach(business => {
    if (business.categoryName == undefined) {
      // console.log(business);
      business.categoryName = "Uncategorized";
    }
    if (business.city == undefined) {
      // console.log(business);
      business.city = "Uncategorized";
    }
    if (business.neighborhood == undefined) {
      // console.log(business);
      business.neighborhood = "Uncategorized";
    }
    if (business.state == undefined) {
      // console.log(business);
      business.state = "Uncategorized";
    }
    else {
      // console.log(business.categoryName);
    }
  });
  
  const filteredBusinesses = useMemo(() => {
    let filtered = dataset as Business[];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((business) =>
        business.title.toLowerCase().includes(query) ||
        business.categoryName.toLowerCase().includes(query) ||
        business.city.toLowerCase().includes(query) ||
        (business.neighborhood && business.neighborhood.toLowerCase().includes(query)) ||
        (business.state && business.state.toLowerCase().includes(query))
    );
  }
  
  
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((business) => business.categoryName === selectedCategory);
    }

    // Apply location filter
    if (selectedLocation) {
      filtered = filtered.filter((business) => business.city === selectedLocation);
    }

    // Apply neighborhood filter
    if (selectedNeighborhood) {
      filtered = filtered.filter((business) => business.neighborhood === selectedNeighborhood);
    }

    // Apply state filter
    if (selectedState) {
      filtered = filtered.filter((business) => business.state === selectedState);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLocation, selectedNeighborhood, selectedState]);

  // Pagination
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const paginatedBusinesses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBusinesses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBusinesses, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLocation, selectedNeighborhood, selectedState]);

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedNeighborhood("");
    setSelectedState("");
    setSearchQuery("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <PasswordModal 
        isOpen={!isAuthenticated} 
        onClose={() => setIsAuthenticated(true)} 
      />
      
      <div className={`min-h-screen bg-background transition-all duration-300 ${!isAuthenticated ? 'blur-md pointer-events-none' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Modern Hero Section */}
          <div className="text-center mb-16 hero-gradient rounded-3xl p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-heading mb-6 tracking-tight">
              Discover Local Businesses
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
              Find the best businesses in Nigeria. Search by name, category, or city to discover your next favorite service provider.
            </p>
            
            {/* Enhanced Search Section */}
            <div className="mb-8 max-w-2xl mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search businesses by name, category, or city..."
              />
            </div>
          </div>

          {/* Filter Section */}
          <FilterBar
            categories={categories}
            locations={locations}
            neighborhoods={neighborhoods}
            states={states}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            selectedNeighborhood={selectedNeighborhood}
            selectedState={selectedState}
            onCategoryChange={setSelectedCategory}
            onLocationChange={setSelectedLocation}
            onNeighborhoodChange={setSelectedNeighborhood}
            onStateChange={setSelectedState}
            onClearFilters={handleClearFilters}
          />

          {/* Results Counter */}
          <div className="text-center mb-10">
            <div className="bg-surface-elevated rounded-xl p-6 shadow-card max-w-md mx-auto">
              <p className="text-text-secondary">
                {searchQuery || selectedCategory || selectedLocation || selectedNeighborhood || selectedState ? (
                  <>Showing <span className="font-bold text-primary">{filteredBusinesses.length}</span> filtered results</>
                ) : (
                  <>Showing <span className="font-bold text-primary">{filteredBusinesses.length}</span> businesses</>
                )}
                {totalPages > 1 && (
                  <span className="ml-2 text-text-muted">• Page {currentPage} of {totalPages}</span>
                )}
              </p>
            </div>
          </div>

          {/* Business Grid */}
          {paginatedBusinesses.length > 0 ? (
            <>
              <div className="business-grid">
                {paginatedBusinesses.map((business) => (
                  <BusinessCard key={business.placeId} business={business} />
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-surface-elevated rounded-2xl p-12 max-w-lg mx-auto shadow-elevated">
                <div className="bg-primary-light p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-heading mb-4">No Results Found</h3>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  We couldn't find any businesses matching your filters. Try adjusting your search criteria to discover new opportunities.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;