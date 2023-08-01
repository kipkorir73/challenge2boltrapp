import React from 'react';

const SortBar = ({ sortType, onSortTypeChange, filters, onFilterChange }) => {
  const handleSortTypeChange = (event) => {
    onSortTypeChange(event.target.value);
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    onFilterChange(filter);
  };

  return (
    <div className="sort-bar">
      <label htmlFor="sortType">Sort By:</label>
      <select id="sortType" value={sortType} onChange={handleSortTypeChange}>
        <option value="">--Select--</option>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
      <div>
        <label>Filter By Class:</label>
        <label>
          <input type="checkbox" value="Support" checked={filters.includes('Support')} onChange={handleFilterChange} />
          Support
        </label>
        <label>
          <input type="checkbox" value="Medic" checked={filters.includes('Medic')} onChange={handleFilterChange} />
          Medic
        </label>
        <label>
          <input type="checkbox" value="Assault" checked={filters.includes('Assault')} onChange={handleFilterChange} />
          Assault
        </label>
        <label>
          <input type="checkbox" value="Defender" checked={filters.includes('Defender')} onChange={handleFilterChange} />
          Defender
        </label>
        <label>
          <input type="checkbox" value="Captain" checked={filters.includes('Captain')} onChange={handleFilterChange} />
          Captain
        </label>
        <label>
          <input type="checkbox" value="Witch" checked={filters.includes('Witch')} onChange={handleFilterChange} />
          Witch
        </label>
      </div>
    </div>
  );
};

export default SortBar;
