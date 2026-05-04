// Firebase Configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Google Apps Script API Configuration
export const GAS_API_URL = import.meta.env.VITE_GAS_API_URL || "https://script.google.com/macros/s/AKfycbxVGPygavvON2AKM-aTDPuKXQS0IDdc-ASj4wB7gCwqL4gldI8e9-r7zJC_EbI8tcts/exec";

// Validate configuration
if (!firebaseConfig.databaseURL) {
  console.warn("⚠️ Firebase database URL not configured. Real-time sync will not work.");
}

if (GAS_API_URL.includes("YOUR_DEPLOYMENT_ID")) {
  console.warn("⚠️ Google Apps Script API URL not configured. Set VITE_GAS_API_URL in your .env file.");
}
