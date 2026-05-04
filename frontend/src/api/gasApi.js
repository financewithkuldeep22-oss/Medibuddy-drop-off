import axios from 'axios';
import { GAS_API_URL } from './config';

/**
 * Google Apps Script API Service
 * Handles all communication with the GAS backend
 */

const api = axios.create({
  baseURL: GAS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Service Methods
export const gasApi = {
  /**
   * Initialize app and get user data
   */
  async init(email) {
    const response = await api.get('', {
      params: { action: 'init', email }
    });
    return response.data;
  },

  /**
   * Get dashboard data
   */
  async getDashboardData(start, end, search = '') {
    const response = await api.get('', {
      params: { 
        action: 'getDashboardData',
        start,
        end,
        search
      }
    });
    return response.data;
  },

  /**
   * Get audit analytics data
   */
  async getAuditAnalytics(start, end) {
    const response = await api.get('', {
      params: {
        action: 'getAuditAnalytics',
        start,
        end
      }
    });
    return response.data;
  },

  /**
   * Get trend analytics data
   */
  async getTrendAnalytics(start, end) {
    const response = await api.get('', {
      params: {
        action: 'getTrendAnalytics',
        start,
        end
      }
    });
    return response.data;
  },

  /**
   * Update a record
   */
  async updateRecord(data, email) {
    const response = await api.post('', {
      action: 'updateRecord',
      email,
      ...data
    });
    return response.data;
  },

  /**
   * Bulk mark records as shared
   */
  async smartBulkMarkShared(inputs, email) {
    const response = await api.post('', {
      action: 'smartBulkMarkShared',
      email,
      inputs
    });
    return response.data;
  },

  /**
   * Save user access permissions
   */
  async saveUserAccess(targetEmail, role, perms, cities, adminEmail) {
    const response = await api.post('', {
      action: 'saveUserAccess',
      targetEmail,
      role,
      perms,
      cities,
      email: adminEmail
    });
    return response.data;
  },

  /**
   * Process client CSV upload
   */
  async processClientCSV(csvText, selectedCity, email) {
    const response = await api.post('', {
      action: 'processClientCSV',
      csvText,
      selectedCity,
      email
    });
    return response.data;
  },

  /**
   * Ask Bisht Ji AI
   */
  async askBishtJi(prompt, temperature = 0.1) {
    const response = await api.post('', {
      action: 'askBishtJi',
      prompt,
      temperature
    });
    return response.data;
  },

  /**
   * AI structure tests
   */
  async aiStructureTests(testString) {
    const response = await api.post('', {
      action: 'aiStructureTests',
      testString
    });
    return response.data;
  },

  /**
   * Download audit CSV
   */
  async downloadAuditCsv(startStr, endStr, cityF, typeF, reasonF, searchF, email) {
    const response = await api.post('', {
      action: 'downloadAuditCsv',
      startStr,
      endStr,
      cityF,
      typeF,
      reasonF,
      searchF,
      email
    });
    return response.data;
  },

  /**
   * Get all users (Admin only)
   */
  async getAllUsers(email) {
    const response = await api.get('', {
      params: { action: 'getAllUsers', email }
    });
    return response.data;
  },

  /**
   * Get available cities
   */
  async getAvailableCities(email) {
    const response = await api.get('', {
      params: { action: 'getAvailableCities', email }
    });
    return response.data;
  }
};

export default api;
