// filterService.js
// Single source of truth for filter state and logic

export const filterService = (() => {
  const DEFAULT_FILTERS = {
    military: 'all',
    degree: 'all',
    gender: 'all'
  };

  let currentFilters = { ...DEFAULT_FILTERS };
  let subscribers = [];

  const notifySubscribers = () => {
    subscribers.forEach(callback => callback({ ...currentFilters }));
  };

  return {
    /**
     * Get a copy of the current filter state
     */
    getFilters() {
      return { ...currentFilters };
    },

    /**
     * Update a single filter and notify subscribers
     */
    setFilter(key, value) {
      if (key in currentFilters && currentFilters[key] !== value) {
        currentFilters[key] = value;
        notifySubscribers();
      }
    },

    /**
     * Update multiple filters at once
     */
    setFilters(newFilters) {
      const merged = { ...currentFilters, ...newFilters };
      if (JSON.stringify(merged) !== JSON.stringify(currentFilters)) {
        currentFilters = merged;
        notifySubscribers();
      }
    },

    /**
     * Reset all filters to defaults
     */
    reset() {
      if (JSON.stringify(currentFilters) !== JSON.stringify(DEFAULT_FILTERS)) {
        currentFilters = { ...DEFAULT_FILTERS };
        notifySubscribers();
      }
    },

    /**
     * Subscribe to filter changes
     * Returns unsubscribe function
     */
    subscribe(callback) {
      subscribers.push(callback);
      return () => {
        subscribers = subscribers.filter(sub => sub !== callback);
      };
    }
  };
})();