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
  data: [], // Combined data for table
  
  // Filters & Tabs
  activeTab: 'pending',
  dateRange: {
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  },
  searchQuery: '',
  selectedCity: 'all',
  selectedPartnerType: 'all',
  pendingTimeFilter: 'all',
  hideHighTat: false,
  tatBase: 'col',
  
  // UI State
  isLoading: false,
  error: null,
  lastUpdated: null,
  isRealtimeEnabled: false,
  sidebarOpen: true,
  expandedRows: [],
  modalOpen: false,
  modalData: null,
  fullPageOpen: false,
  fullPageData: null,
  
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
        
        // Combine all data into single array for table
        const allData = [...(pending || []), ...(log || []), ...(create || []), ...(incomplete || []), ...(shared || [])];
        
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
          data: allData,
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
        
        const allData = [...(pending || []), ...(log || []), ...(create || []), ...(incomplete || []), ...(shared || [])];
        
        set({
          summary: summary || get().summary,
          pending: pending || get().pending,
          log: log || get().log,
          create: create || get().create,
          incomplete: incomplete || get().incomplete,
          shared: shared || get().shared,
          cancelled: cancelled || get().cancelled,
          data: allData,
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
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  
  setPendingTimeFilter: (filter) => {
    set({ pendingTimeFilter: filter });
  },
  
  setHideHighTat: (hide) => {
    set({ hideHighTat: hide });
  },
  
  setTatBase: (base) => {
    set({ tatBase: base });
  },
  
  toggleSidebar: () => {
    set({ sidebarOpen: !get().sidebarOpen });
  },
  
  expandRow: (id) => {
    const { expandedRows } = get();
    if (!expandedRows.includes(id)) {
      set({ expandedRows: [...expandedRows, id] });
    }
  },
  
  collapseRow: (id) => {
    const { expandedRows } = get();
    set({ expandedRows: expandedRows.filter(rowId => rowId !== id) });
  },
  
  openModal: (data) => {
    set({ modalOpen: true, modalData: data });
  },
  
  closeModal: () => {
    set({ modalOpen: false, modalData: null });
  },
  
  openFullPage: (data) => {
    set({ fullPageOpen: true, fullPageData: data });
  },
  
  closeFullPage: () => {
    set({ fullPageOpen: false, fullPageData: null });
  },
  
  refreshData: () => {
    get().fetchDashboardData();
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
      data: [],
      firebaseUnsubscribe: null,
      isRealtimeEnabled: false,
      sidebarOpen: true,
      expandedRows: [],
      modalOpen: false,
      modalData: null,
      fullPageOpen: false,
      fullPageData: null
    });
  }
}));

export default useDashboardStore;
