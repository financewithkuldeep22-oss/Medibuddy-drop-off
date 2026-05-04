import { useDashboardStore } from '../hooks/useDashboardStore';

export default function FilterBar() {
  const { 
    dateRange, 
    searchQuery, 
    selectedCity, 
    cities,
    setDateRange,
    setSearchQuery,
    setSelectedCity
  } = useDashboardStore();

  return (
    <div className="filter-bar glass-card">
      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-inputs">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(e.target.value, dateRange.end)}
          />
          <span>to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(dateRange.start, e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search by name, ID, barcode..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>City</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="all">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
