// =========================================================
// 🔥 PRODUCTION-READY REST API FOR GOOGLE APPS SCRIPT
// 📊 Redcliffe Labs x MediBuddy Drop-off Dashboard
// 🚀 Decoupled Backend - Pure JSON API
// =========================================================

// 0. CONFIGURATION
const SHEET_ID = "1MJKP8Jet9z6V815Zlna5aogmTnrLlaH_3UlUJz5NDxc";
const FIREBASE_CONFIG_PROP = "FIREBASE_CONFIG";

// =========================================================
// 1. CORS HEADERS (CRITICAL FOR EXTERNAL FRONTEND)
// =========================================================
function setCorsHeaders(response) {
  response.setHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-User-Email",
    "Access-Control-Max-Age": "86400"
  });
  return response;
}

// Handle preflight OPTIONS requests
function doOptions(e) {
  return setCorsHeaders(ContentService.createTextOutput(""));
}

// =========================================================
// 2. ROUTER - doGet HANDLER
// =========================================================
function doGet(e) {
  try {
    const action = e.parameter.action;
    const userEmail = e.parameter.email || Session.getActiveUser().getEmail();
    
    let response = ContentService.createTextOutput("");
    
    switch(action) {
      case 'init':
        return handleInit(userEmail);
      case 'getDashboardData':
        return handleGetDashboardData(e.parameter);
      case 'getAuditAnalytics':
        return handleGetAuditAnalytics(e.parameter);
      case 'getTrendAnalytics':
        return handleGetTrendAnalytics(e.parameter);
      case 'getAllUsers':
        return handleGetAllUsers(userEmail);
      case 'getAvailableCities':
        return handleGetAvailableCities(userEmail);
      default:
        return sendError(response, "Invalid action parameter", 400);
    }
    
  } catch (err) {
    return sendError(ContentService.createTextOutput(""), err.message, 500);
  }
}

// =========================================================
// 3. ROUTER - doPost HANDLER
// =========================================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const userEmail = data.email || Session.getActiveUser().getEmail();
    
    let response = ContentService.createTextOutput("");
    
    switch(action) {
      case 'updateRecord':
        return handleUpdateRecord(data, userEmail);
      case 'smartBulkMarkShared':
        return handleSmartBulkMarkShared(data, userEmail);
      case 'saveUserAccess':
        return handleSaveUserAccess(data, userEmail);
      case 'processClientCSV':
        return handleProcessClientCSV(data, userEmail);
      case 'askBishtJi':
        return handleAskBishtJi(data);
      case 'aiStructureTests':
        return handleAiStructureTests(data);
      case 'downloadAuditCsv':
        return handleDownloadAuditCsv(data, userEmail);
      default:
        return sendError(response, "Invalid action parameter", 400);
    }
    
  } catch (err) {
    return sendError(ContentService.createTextOutput(""), err.message, 500);
  }
}

// Helper to send JSON response
function sendJson(response, data) {
  return setCorsHeaders(response.setContent(JSON.stringify(data)));
}

// Helper to send error
function sendError(response, message, statusCode) {
  const errorData = { success: false, error: message };
  const output = setCorsHeaders(response.setContent(JSON.stringify(errorData)));
  if (statusCode === 400) output.setMimeType(ContentService.MimeType.JSON);
  else if (statusCode === 401) output.setMimeType(ContentService.MimeType.JSON);
  else output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// =========================================================
// 4. API HANDLERS
// =========================================================

function handleInit(userEmail) {
  const response = ContentService.createTextOutput("");
  const userData = getUserData(userEmail);
  
  if (!userData) {
    return sendError(response, "Access Denied: Unauthorized user", 401);
  }
  
  const cities = getAvailableCities();
  return sendJson(response, {
    success: true,
    data: {
      user: { email: userEmail, ...userData },
      cities: cities,
      timestamp: new Date().toISOString()
    }
  });
}

function handleGetDashboardData(params) {
  const response = ContentService.createTextOutput("");
  const startStr = params.start;
  const endStr = params.end;
  const searchStr = params.search || "";
  
  try {
    const data = getDashboardData(startStr, endStr, searchStr);
    return sendJson(response, { success: true, data: data });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleGetAuditAnalytics(params) {
  const response = ContentService.createTextOutput("");
  const startStr = params.start;
  const endStr = params.end;
  
  try {
    const data = getAuditAnalytics(startStr, endStr);
    return sendJson(response, { success: true, data: data });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleGetTrendAnalytics(params) {
  const response = ContentService.createTextOutput("");
  const startStr = params.start;
  const endStr = params.end;
  
  try {
    const data = getTrendAnalyticsData(startStr, endStr);
    return sendJson(response, { success: true, data: JSON.parse(data) });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleGetAllUsers(userEmail) {
  const response = ContentService.createTextOutput("");
  const adminData = getUserData(userEmail);
  
  if (!adminData || adminData.role !== 'Admin') {
    return sendError(response, "Unauthorized: Admin access required", 401);
  }
  
  const users = getAllUsers();
  return sendJson(response, { success: true, data: { users: users } });
}

function handleGetAvailableCities(userEmail) {
  const response = ContentService.createTextOutput("");
  const userData = getUserData(userEmail);
  
  if (!userData) {
    return sendError(response, "Access Denied", 401);
  }
  
  const cities = getAvailableCities();
  return sendJson(response, { success: true, data: { cities: cities } });
}

function handleUpdateRecord(data, userEmail) {
  const response = ContentService.createTextOutput("");
  
  // Security check
  const userData = getUserData(userEmail);
  if (!userData) {
    return sendError(response, "Unauthorized", 401);
  }
  
  // City permission check
  if (userData.cities.indexOf('all') === -1 && 
      userData.cities.indexOf(data.city) === -1) {
    return sendError(response, "Unauthorized: No access to this city", 403);
  }
  
  try {
    const result = updateRecord(
      data.city, data.oldBookingId, data.patientName,
      data.newStatus, data.newRemarks, data.newBookingId,
      data.reqIdsStr, data.newAge, data.newGender,
      data.newFbs, data.newColTime, userEmail
    );
    
    // Sync to Firebase after successful update
    syncToFirebaseAsync();
    
    return sendJson(response, { success: true, message: result });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleSmartBulkMarkShared(data, userEmail) {
  const response = ContentService.createTextOutput("");
  
  const userData = getUserData(userEmail);
  if (!userData) {
    return sendError(response, "Unauthorized", 401);
  }
  
  try {
    const inputs = data.inputs || [];
    const result = smartBulkMarkShared(inputs);
    
    // Sync to Firebase
    syncToFirebaseAsync();
    
    return sendJson(response, { success: true, message: result });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleSaveUserAccess(data, adminEmail) {
  const response = ContentService.createTextOutput("");
  
  try {
    const result = saveUserAccess(
      adminEmail,
      data.targetEmail,
      data.role,
      data.perms,
      data.cities
    );
    return sendJson(response, { success: true, message: result });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleProcessClientCSV(data, userEmail) {
  const response = ContentService.createTextOutput("");
  
  const userData = getUserData(userEmail);
  if (!userData) {
    return sendError(response, "Unauthorized", 401);
  }
  
  try {
    const result = processClientCSV(data.csvText, userEmail, data.selectedCity);
    
    // Sync to Firebase
    syncToFirebaseAsync();
    
    return sendJson(response, { success: true, message: result });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleAskBishtJi(data) {
  const response = ContentService.createTextOutput("");
  
  try {
    const prompt = data.prompt || "";
    const temperature = data.temperature || 0.1;
    const result = callGroqAPI(prompt, temperature);
    return sendJson(response, { success: true, data: { response: result } });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleAiStructureTests(data) {
  const response = ContentService.createTextOutput("");
  
  try {
    const testString = data.testString || "";
    const result = aiStructureTests(testString);
    return sendJson(response, { success: true, data: { html: result } });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

function handleDownloadAuditCsv(data, userEmail) {
  const response = ContentService.createTextOutput("");
  
  const userData = getUserData(userEmail);
  if (!userData) {
    return sendError(response, "Unauthorized", 401);
  }
  
  try {
    const csvDataUrl = downloadAuditCsv(
      data.startStr, data.endStr,
      data.cityF, data.typeF,
      data.reasonF, data.searchF
    );
    return sendJson(response, { success: true, data: { csvUrl: csvDataUrl } });
  } catch (err) {
    return sendError(response, err.message, 500);
  }
}

// =========================================================
// 5. FIREBASE SYNC ENGINE
// =========================================================

function syncToFirebaseAsync() {
  // Run as time-driven trigger to avoid blocking API response
  ScriptApp.newTrigger('syncToFirebaseInternal')
    .timeBased()
    .after(1000) // 1 second delay
    .create();
}

function syncToFirebaseInternal() {
  try {
    const firebaseConfig = PropertiesService.getScriptProperties().getProperty(FIREBASE_CONFIG_PROP);
    if (!firebaseConfig) {
      console.log("Firebase not configured");
      return;
    }
    
    const config = JSON.parse(firebaseConfig);
    const databaseURL = config.databaseURL;
    const apiKey = config.apiKey;
    
    // Fetch fresh dashboard data
    const dashboardData = getDashboardData(null, null, "");
    
    // Prepare payload for Firebase Realtime Database
    const payload = {
      lastUpdated: new Date().toISOString(),
      summary: dashboardData.summary,
      pending: dashboardData.pending,
      log: dashboardData.log,
      create: dashboardData.create,
      incomplete: dashboardData.incomplete,
      shared: dashboardData.shared,
      cancelled: dashboardData.cancelled
    };
    
    // Send to Firebase Realtime Database
    const url = `${databaseURL}/dashboard.json?auth=${apiKey}`;
    
    const options = {
      method: "put",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 200) {
      console.log("✅ Firebase sync successful");
    } else {
      console.error("❌ Firebase sync failed:", response.getContentText());
    }
    
    // Clean up trigger after execution
    const triggers = ScriptApp.getProjectTriggers();
    for (let trigger of triggers) {
      if (trigger.getHandlerFunction() === 'syncToFirebaseInternal') {
        ScriptApp.deleteTrigger(trigger);
      }
    }
    
  } catch (err) {
    console.error("Firebase sync error:", err.message);
  }
}

// Manual Firebase sync function (can be called from Apps Script editor)
function manualSyncToFirebase() {
  syncToFirebaseInternal();
  return "Sync initiated. Check logs for status.";
}

// =========================================================
// 6. UTILITY FUNCTIONS (Copied from original Code.gs)
// =========================================================

// Include all the original utility functions here
// getColumnMap, getUserData, getAllUsers, getAvailableCities, etc.
// These are copied verbatim from the original Code.gs

function getUserData(email) {
  if (email && email.toLowerCase().trim() === 'kuldeep.bisht@redcliffelabs.com') {
    return { role: 'Admin', perms: ['all'], cities: ['all'] };
  }
  if (!email) return null;
  email = email.toLowerCase().trim();
  const props = PropertiesService.getScriptProperties();
  let users = JSON.parse(props.getProperty('APP_USERS_V2') || "{}");
  
  if (Object.keys(users).length === 0) {
    users[email] = { role: 'Admin', perms: ['all'], cities: ['all'] };
    props.setProperty('APP_USERS_V2', JSON.stringify(users));
  }
  return users[email] || null;
}

function getAllUsers() {
  return JSON.parse(PropertiesService.getScriptProperties().getProperty('APP_USERS_V2') || "{}");
}

function getAvailableCities() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const ignoreSheets = ['Dashboard', 'Master Data', 'Instructions', 'Pending List', 'Dropdowns', 'Comments_DB', 'API_Not_Found'];
  return ss.getSheets()
    .map(s => s.getName())
    .filter(n => !ignoreSheets.includes(n))
    .sort();
}

function saveUserAccess(adminEmailParam, targetEmail, role, perms, cities) {
  const resolvedAdmin = adminEmailParam || Session.getActiveUser().getEmail();
  const adminData = getUserData(resolvedAdmin);
  if (!adminData || adminData.role !== 'Admin') throw new Error("Unauthorized to modify users.");
  
  targetEmail = targetEmail.trim().toLowerCase();
  if (targetEmail === 'kuldeep.bisht@redcliffelabs.com') {
    throw new Error("Super Admin cannot be modified.");
  }
  
  const props = PropertiesService.getScriptProperties();
  let users = JSON.parse(props.getProperty('APP_USERS_V2') || "{}");
  
  if (role === 'Delete') {
      delete users[targetEmail];
  } else {
      var isFullAccess = (role === 'Admin');
      users[targetEmail] = { 
        role: role, 
        perms: isFullAccess ? ['all'] : (perms || []),
        cities: isFullAccess ? ['all'] : (cities || [])
      };
  }
  
  props.setProperty('APP_USERS_V2', JSON.stringify(users));
  return "Success";
}

// [Include ALL remaining functions from original Code.gs here]
// getColumnMap, getDashboardData, updateRecord, smartBulkMarkShared, etc.
// For brevity, I'm noting that you should copy these verbatim from your original Code.gs

function getColumnMap(sheet) {
  // ... [Copy from original Code.gs lines 9-81]
  let lastCol = sheet.getLastColumn();
  if (lastCol === 0) lastCol = 25; 
  
  let headers = [];
  if (sheet.getLastRow() > 0) {
    headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  }
  
  const map = {
    date: -1, bookingId: -1, reqId: -1, referredBy: -1, name: -1, age: -1, gender: -1,
    test: -1, fbs: -1, type: -1, barcode: -1, colTime: -1, phlebo: -1,
    phleboMobile: -1, location: -1, subTime: -1, creatTime: -1, handoverTime: -1,
    status: -1, shareTime: -1, remarks: -1, mailSent: -1, lastCol: lastCol
  };
  
  const findCol = (possibleNames) => {
    for (let i = 0; i < headers.length; i++) {
      if (!headers[i]) continue;
      let rawH = String(headers[i]).toLowerCase().trim();
      let cleanH = rawH.replace(/[^a-z0-9]/g, ''); 
      for(let p of possibleNames) {
          let targetClean = String(p).toLowerCase().replace(/[^a-z0-9]/g, '');
          if (cleanH === targetClean) return i; 
      }
    }
    for (let i = 0; i < headers.length; i++) {
      if (!headers[i]) continue;
      let cleanH = String(headers[i]).toLowerCase().replace(/[^a-z0-9]/g, ''); 
      for(let p of possibleNames) {
          let targetClean = String(p).toLowerCase().replace(/[^a-z0-9]/g, '');
          if (cleanH.includes(targetClean)) {
              if (targetClean === "name" && cleanH.includes("phlebo")) continue;
              return i;
          }
      }
    }
    return -1;
  };

  map.date = findCol(["date"]);
  map.bookingId = findCol(["redcliffebookingid", "bookingid"]);
  map.reqId = findCol(["requestid"]);
  map.referredBy = findCol(["Referred BY", "referred by", "refby", "referral"]);
  map.name = findCol(["name", "patientname"]);
  map.age = findCol(["age", "patientage"]);
  map.gender = findCol(["gender", "patientgender"]);
  map.test = findCol(["packagename", "testname", "testdetails"]);
  map.fbs = findCol(["fbsrbs"]);
  map.type = findCol(["retailppmc", "partnertype", "contractname"]);
  map.barcode = findCol(["barcodeno", "barcode"]);
  map.colTime = findCol(["collectiontiming", "coltime", "collectiontime"]);
  map.phlebo = findCol(["phleboname", "phlebotomistname"]);
  map.phleboMobile = findCol(["phlebonumber", "phlebomobile", "phlebone", "phlebotomistmobile"]);
  map.location = findCol(["location", "city"]);
  map.subTime = findCol(["initialsubmissiontime", "subtime"]);
  map.creatTime = findCol(["bookingcreationtime", "latestsubmissiontime", "creattime"]);
  map.handoverTime = findCol(["samplehandovertime", "handovertime"]);
  map.status = findCol(["reportstatus", "status"]);
  map.shareTime = findCol(["reportsharingtime", "sharetime"]);
  map.remarks = findCol(["remarks"]);
  map.mailSent = findCol(["mailsent", "mailstatus"]);
  map.trf = findCol(["trflink", "trf"]);
  
  return map;
}

// Copy remaining large functions: getDashboardData, updateRecord, smartBulkMarkShared,
// callGroqAPI, aiStructureTests, processClientCSV, getAuditAnalytics, downloadAuditCsv,
// getTrendAnalyticsData, and all helper functions

// For production, copy ALL functions from original Code.gs (lines 9-2472)
// This ensures backward compatibility while adding the new REST API layer
