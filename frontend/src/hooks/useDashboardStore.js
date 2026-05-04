import { create } from 'zustand';
import { gasApi } from '../api/gasApi';
import { subscribeToDashboard, initFirebase } from '../api/firebaseService';

/**
 * Global State Management with Zustand
 * Handles dashboard data, user state, and real-time updates
 */

export const useDashboardStore = create((set, get) => ({
  // User State
  user: null,
  cities: [],
  partnerTypes: [],
  
  // Dashboard Data
  summary: [],
  pending: [],
  log: [],
  create: [],
  incomplete: [],
  shared: [],
  cancelled: [],
  
  // Filters
  dateRange: {
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  },
  searchQuery: '',
  selectedCity: 'all',
  selectedPartnerType: 'all',
  
  // UI State
  isLoading: false,
  error: null,
  lastUpdated: null,
  isRealtimeEnabled: false,
  
  // Firebase unsubscribe function
  firebaseUnsubscribe: null,
  
  // Actions
  initialize: async (email) => {
    set({ isLoading: true });
    try {
      const result = await gasApi.init(email);
      if (result.success) {
        const { user, cities } = result.data;
        set({ 
          user, 
          cities,
          isLoading: false 
        });
        
        // Initialize Firebase for real-time updates
        initFirebase();
        
        return true;
      }
      throw new Error(result.error || 'Initialization failed');
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  fetchDashboardData: async () => {
    const { dateRange, searchQuery } = get();
    set({ isLoading: true });
    
    try {
      const result = await gasApi.getDashboardData(
        dateRange.start,
        dateRange.end,
        searchQuery
      );
      
      if (result.success) {
        const { summary, cities, partnerTypes, pending, log, create, incomplete, shared, cancelled } = result.data;
        set({
          summary,
          cities: cities.length > 0 ? cities : get().cities,
          partnerTypes: partnerTypes.length > 0 ? partnerTypes : get().partnerTypes,
          pending,
          log,
          create,
          incomplete,
          shared,
          cancelled,
          lastUpdated: new Date().toISOString(),
          isLoading: false,
          error: null
        });
      } else {
        throw new Error(result.error || 'Failed to fetch data');
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  enableRealtimeUpdates: () => {
    const { firebaseUnsubscribe } = get();
    
    // Unsubscribe if already subscribed
    if (firebaseUnsubscribe) {
      firebaseUnsubscribe();
    }
    
    const unsubscribe = subscribeToDashboard((update) => {
      if (update.success && update.source === 'firebase') {
        const { summary, pending, log, create, incomplete, shared, cancelled } = update.data;
        set({
          summary: summary || get().summary,
          pending: pending || get().pending,
          log: log || get().log,
          create: create || get().create,
          incomplete: incomplete || get().incomplete,
          shared: shared || get().shared,
          cancelled: cancelled || get().cancelled,
          lastUpdated: update.data.lastUpdated,
          isRealtimeEnabled: true
        });
      }
    });
    
    if (unsubscribe) {
      set({ firebaseUnsubscribe: unsubscribe, isRealtimeEnabled: true });
    }
  },
  
  disableRealtimeUpdates: () => {
    const { firebaseUnsubscribe } = get();
    if (firebaseUnsubscribe) {
      firebaseUnsubscribe();
      set({ firebaseUnsubscribe: null, isRealtimeEnabled: false });
    }
  },
  
  setDateRange: (start, end) => {
    set({ 
      dateRange: { start, end },
      lastUpdated: null // Force refresh
    });
    get().fetchDashboardData();
  },
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  
  setSelectedCity: (city) => {
    set({ selectedCity: city });
  },
  
  setSelectedPartnerType: (type) => {
    set({ selectedPartnerType: type });
  },
  
  updateRecord: async (recordData) => {
    const { user } = get();
    if (!user) throw new Error('User not authenticated');
    
    set({ isLoading: true });
    try {
      const result = await gasApi.updateRecord(recordData, user.email);
      if (result.success) {
        set({ isLoading: false });
        // Refresh data after update
        await get().fetchDashboardData();
        return result.message;
      }
      throw new Error(result.error || 'Update failed');
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  bulkMarkShared: async (inputs) => {
    const { user } = get();
    if (!user) throw new Error('User not authenticated');
    
    set({ isLoading: true });
    try {
      const result = await gasApi.smartBulkMarkShared(inputs, user.email);
      if (result.success) {
        set({ isLoading: false });
        await get().fetchDashboardData();
        return result.message;
      }
      throw new Error(result.error || 'Bulk update failed');
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  clearError: () => {
    set({ error: null });
  },
  
  logout: () => {
    const { firebaseUnsubscribe } = get();
    if (firebaseUnsubscribe) {
      firebaseUnsubscribe();
    }
    set({
      user: null,
      cities: [],
      partnerTypes: [],
      summary: [],
      pending: [],
      log: [],
      create: [],
      incomplete: [],
      shared: [],
      cancelled: [],
      firebaseUnsubscribe: null,
      isRealtimeEnabled: false
    });
  }
}));

export default useDashboardStore;
