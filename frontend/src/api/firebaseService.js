import { initializeApp } from 'firebase/app';
import { 
  getDatabase, 
  ref, 
  onValue, 
  off,
  query,
  limitToLast
} from 'firebase/database';
import { firebaseConfig } from './config';

/**
 * Firebase Realtime Database Service
 * Provides real-time data synchronization
 */

let db = null;
let isInitialized = false;

// Initialize Firebase
export const initFirebase = () => {
  if (isInitialized) return db;
  
  if (!firebaseConfig.databaseURL) {
    console.warn('⚠️ Firebase not configured. Real-time sync disabled.');
    return null;
  }
  
  try {
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    isInitialized = true;
    console.log('✅ Firebase initialized successfully');
    return db;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    return null;
  }
};

// Get database instance
export const getDb = () => {
  if (!db) {
    return initFirebase();
  }
  return db;
};

// Subscribe to dashboard data changes
export const subscribeToDashboard = (callback) => {
  const database = getDb();
  if (!database) {
    console.warn('Firebase not available, using polling fallback');
    return null;
  }
  
  try {
    const dashboardRef = ref(database, 'dashboard');
    
    const unsubscribe = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback({
          success: true,
          data: data,
          source: 'firebase'
        });
      }
    }, (error) => {
      console.error('Firebase subscription error:', error);
      callback({
        success: false,
        error: error.message,
        source: 'firebase'
      });
    });
    
    return () => off(dashboardRef, 'value', unsubscribe);
  } catch (error) {
    console.error('Error subscribing to dashboard:', error);
    return null;
  }
};

// Subscribe to specific city data
export const subscribeToCityData = (city, callback) => {
  const database = getDb();
  if (!database) return null;
  
  try {
    const cityRef = ref(database, `cities/${city}`);
    
    const unsubscribe = onValue(cityRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
    
    return () => off(cityRef, 'value', unsubscribe);
  } catch (error) {
    console.error('Error subscribing to city data:', error);
    return null;
  }
};

// Get latest update timestamp
export const getLastUpdateTime = () => {
  const database = getDb();
  if (!database) return null;
  
  const timeRef = ref(database, 'dashboard/lastUpdated');
  return new Promise((resolve, reject) => {
    onValue(timeRef, (snapshot) => {
      resolve(snapshot.val());
    }, { onlyOnce: true });
  });
};

export default {
  initFirebase,
  getDb,
  subscribeToDashboard,
  subscribeToCityData,
  getLastUpdateTime
};
