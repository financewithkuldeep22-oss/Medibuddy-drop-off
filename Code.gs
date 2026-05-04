  // =========================================================
  // 0. CONFIGURATION & API KEYS
  // =========================================================
  const OLD_SHEET_ID = "1MJKP8Jet9z6V815Zlna5aogmTnrLlaH_3UlUJz5NDxc"; 

  // =========================================================
  // 1. DYNAMIC COLUMN MAPPING (BULLETPROOF)
  // =========================================================
  function getColumnMap(sheet) {
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
      // 🚀 FIX: Smart Left-to-Right Search. Pehle exact match dhoondega, taaki Phlebo Name ko Customer Name na samjhe.
      for (let i = 0; i < headers.length; i++) {
        if (!headers[i]) continue;
        let rawH = String(headers[i]).toLowerCase().trim();
        let cleanH = rawH.replace(/[^a-z0-9]/g, ''); 
        for(let p of possibleNames) {
            let targetClean = String(p).toLowerCase().replace(/[^a-z0-9]/g, '');
            // First priority: Exact match
            if (cleanH === targetClean) return i; 
        }
      }
      // Agar exact nahi mila toh 'includes' check karega (Lekin Phlebo ko ignore karega)
      for (let i = 0; i < headers.length; i++) {
        if (!headers[i]) continue;
        let cleanH = String(headers[i]).toLowerCase().replace(/[^a-z0-9]/g, ''); 
        for(let p of possibleNames) {
            let targetClean = String(p).toLowerCase().replace(/[^a-z0-9]/g, '');
            if (cleanH.includes(targetClean)) {
                // Phlebo ke column ko normal name banne se roko
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
    
    // 🚀 Ab chahe sheet me "Referred BY" ho ya kuch bhi, ye pakad lega
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
    map.phleboMobile = findCol(["phlebonumber", "phlebomobile", "phlebophone", "phlebotomistmobile"]);
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
  // =========================================================
  // 2. MENU, APP SETUP & GRANULAR RBAC
  // =========================================================

  function getUserData(email) {
    if (email && email.toLowerCase().trim() === 'kuldeep.bisht@redcliffelabs.com') {
      return { role: 'Admin', perms: ['all'], cities: ['all'] };
    }
    if (!email) return null;
    email = email.toLowerCase().trim();
    const props = PropertiesService.getScriptProperties();
    
    // We use a new key (APP_USERS_V2) so it starts fresh and doesn't conflict with old data
    let users = JSON.parse(props.getProperty('APP_USERS_V2') || "{}");
    
    // The first person to run this becomes the ultimate Admin
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
    const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
    const ignoreSheets = ['Dashboard', 'Master Data', 'Instructions', 'Pending List', 'Dropdowns', 'Comments_DB', 'API_Not_Found'];
    return ss.getSheets()
      .map(s => s.getName())
      .filter(n => !ignoreSheets.includes(n))
      .sort();
  }

  function saveUserAccess(adminEmailParam, targetEmail, role, perms, cities) {
    // Primary guard: explicit adminEmail from frontend
    const resolvedAdmin = adminEmailParam || Session.getActiveUser().getEmail();
    const adminData = getUserData(resolvedAdmin);
    if (!adminData || adminData.role !== 'Admin') throw new Error("Unauthorized to modify users.");
    
    targetEmail = targetEmail.trim().toLowerCase();
    // Super Admin cannot be demoted
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

  function enforceAccess() {
    // Purely acts as a backend security wall for database edit functions
    const email = Session.getActiveUser().getEmail();
    if (!getUserData(email)) throw new Error("Access Denied: Unauthorized action.");
  }

  function onOpen() {
    const menu = SpreadsheetApp.getUi().createMenu('🔒 Security & App');
    menu.addItem('🖥️ Open Live Dashboard', 'showDashboard');
    menu.addToUi();
  }

  function showDashboard() {
    const template = HtmlService.createTemplateFromFile('Index'); // Adjust to Dashboard if your file is named Dashboard
    template.isSheetContext = true;
    template.userEmail = Session.getActiveUser().getEmail();
    template.userData = getUserData(template.userEmail);
    
    const html = template.evaluate()
        .setTitle('Redcliffe x MediBuddy Drop-off') 
        .setWidth(1900).setHeight(1000).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    SpreadsheetApp.getUi().showModalDialog(html, 'Redcliffe x MediBuddy Drop-off'); 
  }

  function doGet() {
    const email = Session.getActiveUser().getEmail();
    const userData = getUserData(email);
    
    if (!userData) {
      return HtmlService.createHtmlOutput(`<h1 style="font-family:sans-serif; text-align:center; margin-top:50px;">Access Denied</h1><p style="text-align:center; font-family:sans-serif;">Your email (${email}) is not authorized. Contact an Administrator.</p>`);
    }

    const template = HtmlService.createTemplateFromFile('Index'); // Adjust to Dashboard if your file is named Dashboard
    template.isSheetContext = false;
    template.userEmail = email;
    template.userData = userData;
    
    return template.evaluate()
        .setTitle('Redcliffe x MediBuddy Drop-off').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  // =========================================================
  // NEW: ADVANCED SMART BULK DROPZONE & PASTE SECURITY
  // =========================================================
  function smartBulkMarkShared(inputs) {
    const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
    const allSheets = ss.getSheets();
    const ignoreSheets = ['Dashboard', 'Master Data', 'Instructions', 'Pending List', 'Dropdowns', 'Comments_DB'];
    
    const now = new Date();
    const timeFormat = "hh:mm:ss AM/PM";
    
    const salutationRegex = /^(mr\.|mrs\.|ms\.|dr\.|master|miss|baby|b\/o|s\/o|d\/o|mr|mrs|ms|dr)\s+/i;
    
    let searchItems = inputs.map(str => {
        let cleanStr = String(str).toLowerCase().replace(/\.pdf$/i, '').trim(); 
        let noSalutation = cleanStr.replace(salutationRegex, '').trim();
        return { original: str, clean: cleanStr, nameOnly: noSalutation };
    });

    let matchCount = 0;
    let matchedInputs = new Set();
    let conflicts = [];

    let pendingNameCounts = {}; 
    let sheetDataCache = []; // 🚀 NAYA: Speed double karne ke liye data cache
    
    // PASS 1: Data Read Karna (Sirf 1 Baar Sheets read hogi)
    for (let sheet of allSheets) {
        if (ignoreSheets.includes(sheet.getName())) continue;
        const map = getColumnMap(sheet);
        if (map.status === -1) continue;
        
        const lastRow = sheet.getLastRow();
        if (lastRow < 2) continue;

        const data = sheet.getRange(1, 1, lastRow, map.lastCol).getValues();
        sheetDataCache.push({ sheet, map, data }); // RAM me save kar liya
        
        for (let i = 1; i < data.length; i++) {
            let status = data[i][map.status] ? String(data[i][map.status]).trim().toLowerCase() : "";
            if (status === "shared" || status === "n/a") continue; 
            
            let pName = map.name > -1 && data[i][map.name] ? String(data[i][map.name]).trim().toLowerCase().replace(salutationRegex, '').trim() : "";
            if (pName) {
                pendingNameCounts[pName] = (pendingNameCounts[pName] || 0) + 1;
            }
        }
    }

    // PASS 2: Match & Write (Wapas Read kiye bina)
    for (let cache of sheetDataCache) {
        const { sheet, map, data } = cache;
        
        for (let i = 1; i < data.length; i++) {
            let row = data[i];
            let status = row[map.status] ? String(row[map.status]).trim().toLowerCase() : "";
            if (status === "shared" || status === "n/a") continue; 
            
            let bId = (map.bookingId > -1 && row[map.bookingId]) ? String(row[map.bookingId]).trim().toLowerCase() : null;
            let reqId = (map.reqId > -1 && row[map.reqId]) ? String(row[map.reqId]).trim().toLowerCase() : null;
            let rawName = (map.name > -1 && row[map.name]) ? String(row[map.name]).trim().toLowerCase() : null;
            let cleanPName = rawName ? rawName.replace(salutationRegex, '').trim() : null;

            if (!bId && !reqId && !cleanPName) continue;

            let isMatchFound = false;
            let matchedOriginal = "";

            for (let item of searchItems) {
                if ((bId && bId !== "--" && item.clean.includes(bId)) || 
                    (reqId && reqId !== "--" && item.clean.includes(reqId))) {
                    isMatchFound = true;
                    matchedOriginal = item.original;
                    break;
                }
                
                if (cleanPName && item.nameOnly.includes(cleanPName)) {
                    if (pendingNameCounts[cleanPName] > 1) {
                        if (!conflicts.includes(rawName.toUpperCase())) conflicts.push(rawName.toUpperCase());
                    } else {
                        isMatchFound = true;
                        matchedOriginal = item.original;
                        break;
                    }
                }
            }

            if (isMatchFound) {
                let currentRow = i + 1;
                sheet.getRange(currentRow, map.status + 1).setValue("Shared");
                if (map.shareTime > -1) {
                    sheet.getRange(currentRow, map.shareTime + 1).setValue(now).setNumberFormat(timeFormat);
                }
                matchedInputs.add(matchedOriginal);
                matchCount++;
            }
        }
    }

    let unmatchedCount = inputs.length - matchedInputs.size;
    let resultMsg = `✅ SUCCESS: ${matchCount} records updated to 'Shared'.\n`;
    resultMsg += `🎯 Total Inputs Processed: ${inputs.length}\n`;
    resultMsg += `📌 Successfully Matched: ${matchedInputs.size}\n`;
    
    if (conflicts.length > 0) {
        resultMsg += `\n⚠️ SECURITY ALERT: Skipped ${conflicts.length} name(s) due to Duplicates in pending list. Please paste their exact Booking IDs to mark them shared.\n`;
    }
    
    if (unmatchedCount > 0 && inputs.length > 0) {
        resultMsg += `\n❌ Not Found / Skipped: ${unmatchedCount} item(s) did not match securely.`;
    }
    
    notifyDashboards(); // 🚀 NAYA: Bulk upload hote hi screen sync
    return resultMsg;
  }
  // =========================================================
  // 3. UNIVERSAL TEXT AI ENGINE (Powered by Groq / Llama 3)
  // =========================================================
  // 🚀 Main Engine
  function callGroqAPI(prompt, temperature = 0.1) {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GROQ_API_KEY'); 
    if (!apiKey) return "⚠️ AI Error: GROQ_API_KEY is missing in Apps Script Properties.";
    
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const payload = {
      "model": "llama-3.3-70b-versatile", 
      "messages": [{ "role": "user", "content": prompt }],
      "temperature": temperature,
      "max_tokens": 1024
    };
    
    const options = {
      "method": "post",
      "headers": { "Authorization": "Bearer " + apiKey },
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };
    
    try {
      const response = UrlFetchApp.fetch(url, options);
      if (response.getResponseCode() === 429) return "⏳ Groq API is taking a breath! Please wait 10 seconds."; 
      
      const json = JSON.parse(response.getContentText());
      if (json.error) return "⚠️ API Error: " + json.error.message;
      return json.choices[0].message.content;
      
    } catch(e) { 
      return "Bisht Ji network error: " + e.toString(); 
    }
  }

  // 🚀 NAYA: Frontend Compatibility Wrappers (Taki HTML side ka code break na ho)
  function callGeminiAPI(prompt, temp) { return callGroqAPI(prompt, temp); }
  function callGrokAPI(prompt, temp) { return callGroqAPI(prompt, temp); }

  function askBishtJiSimple(prompt) { return callGeminiAPI(prompt, 0.1); }

  function askBishtJiAdvanced(userMessage, jsonDataString) {
    const systemPrompt = `You are "Bisht Ji", the expert Operations Analyst for Redcliffe Labs. STRICTLY PROFESSIONAL ENGLISH ONLY. Dashboard JSON provided below: ${jsonDataString}\nUser Query: ${userMessage}`;
    return callGeminiAPI(systemPrompt, 0.1);
  }

  function aiStructureTests(testString) {
    const prompt = `You are a strict medical lab assistant. Categorize these tests: "${testString}".
    Categories to use: LFT, KFT, Urine, and Others.
    Rules:
    1. Output ONLY raw HTML. NO explanation, NO intro, NO markdown backticks (\`\`\`).
    2. Format exactly like this: <b>LFT:</b> testA, testB | <b>KFT:</b> testC | <b>Others:</b> testD
    3. CRITICAL: Do not put 'KFT' as a parameter inside KFT. Make it one single horizontal line.`;

    let result = callGeminiAPI(prompt, 0.1);

    if (result && !result.includes("⚠️")) {
        result = result.replace(/```html/gi, "") 
                      .replace(/```/g, "")      
                      .replace(/\n/g, " ")      
                      .trim();
    }

    return result;
  }

  function aiAskAboutTests(testString, query) {
    const prompt = `Context tests: ${testString}. User query: ${query}. 
    Provide a very brief 1-2 sentence response explaining use cases or alternative names. 
    Do not use markdown blocks.`;
    return callGeminiAPI(prompt, 0.2);
  }

  function aiAnalyzeRow(rowContext) {
    const prompt = `You are Bisht Ji. Read the following patient row data.
    Task 1: Give exactly 1-sentence operational insight (e.g., "ID missing since 3 hours", or "Late TAT").
    Task 2: Draft a short, professional WhatsApp message to the lab team demanding action for this specific row.
    Data: ${rowContext}
    Format output strictly as raw HTML (no markdown blocks):
    <b>Insight:</b> [Your 1 sentence]<br><br><b>WA Draft:</b> [Your message]`;
    return callGeminiAPI(prompt, 0.2);
  }

  function aiSmartPaste(text) {
    const prompt = `Extract patient details from the following text strictly into valid JSON format matching this schema: 
    { "name": "", "age": "", "gender": "Male or Female", "tests": "Comma separated", "colTime": "HH:MM AM/PM" }.
    Return ONLY the raw JSON object, no markdown, no \`\`\`json block. Text: "${text}"`;
    return callGeminiAPI(prompt, 0.1);
  }

  function getAiAuditSummary(startStr, endStr) {
    const analytics = getAuditAnalytics(startStr, endStr);
    if (analytics.counts.total === 0) return "No audit data found for this date range.";
    let citySummary = {};
    analytics.reports.forEach(r => {
        if(!citySummary[r.city]) citySummary[r.city] = { late: 0, onTime: 0 };
        if(r.reason === "Late") citySummary[r.city].late++; else citySummary[r.city].onTime++;
    });
    const prompt = `You are Bisht Ji. Write a quick 2-sentence executive summary of this audit data. REPLY STRICTLY IN ENGLISH. Overall Stats: ${JSON.stringify(analytics.counts)} City Breakdown: ${JSON.stringify(citySummary)}`;
    return callGeminiAPI(prompt, 0.2);
  }

  function optimizeEmailWithBishtJi(emailHtml, instructions) {
    const prompt = `You are Bisht Ji. Rewrite this email text professionally. CRITICAL: DO NOT alter or remove the HTML <table>. Original: ${emailHtml} Instructions: ${instructions}`;
    return callGeminiAPI(prompt, 0.3);
  }

  // =========================================================
  // 4. SMART TIME & DATE PARSERS
  // =========================================================
  function cleanTimeStr(str) {
    if (!str) return "";
    let s = String(str).trim();
    
    // 1. Agar Google Sheet ne poora lamba Date object bhej diya
    let jsDateMatch = s.match(/\d{4}\s(\d{1,2}:\d{2}:\d{2})/);
    if (jsDateMatch) {
        let d = new Date(s);
        if (!isNaN(d.getTime())) {
            let h = d.getHours();
            let m = d.getMinutes();
            let ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12;
            h = h ? h : 12;
            let min = m < 10 ? '0' + m : m;
            return `${("0" + h).slice(-2)}:${min} ${ampm}`;
        }
    }

    // 2. Normal Time ya Date+Time (e.g. 24/03/2026 12:27 PM)
    let timeMatch = s.match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*([APap][Mm])?/);
    if (timeMatch) {
        let h = parseInt(timeMatch[1], 10);
        let m = timeMatch[2];
        let ampm = timeMatch[3] ? timeMatch[3].toUpperCase() : "";
        if (!ampm) {
            ampm = h >= 12 ? "PM" : "AM";
            if (h > 12) h -= 12;
            if (h === 0) h = 12;
        }
        return `${("0" + h).slice(-2)}:${m} ${ampm}`;
    }

    // 3. 🚀 THE FIX: Agar isme koi Time nahi mila, sirf date format hai (24/03/2026) toh blank kardo
    if (s.match(/^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}$/)) {
        return ""; 
    }

    // 4. Fallback cleaning
    s = s.replace(/(\d{1,2})[.,;](\d{2})/g, "$1:$2");
    return s.replace(/\s*(am|pm)/i, match => " " + match.toUpperCase());
  }

  function parseRowDate(dateStr) {
      if (!dateStr) return new Date();
      let s = String(dateStr).trim();

      let parts = s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
      if (parts) {
          let p1 = parseInt(parts[1], 10);
          let p2 = parseInt(parts[2], 10);
          let year = parseInt(parts[3], 10);

          if (p2 > 12) {
              return new Date(year, p1 - 1, p2);
          } else if (p1 > 12) {
              return new Date(year, p2 - 1, p1);
          } else {
              let tempDate = new Date(s);
              if (!isNaN(tempDate.getTime())) return tempDate;
          }
      }

      let d = new Date(s);
      return isNaN(d.getTime()) ? new Date() : d;
  }

  function parseDateTimeStrict(timeStr, baseDateStr) {
    if (!timeStr || timeStr === "N/A" || timeStr === "--" || timeStr === "-") return null;
    let s = String(timeStr).trim(); let baseDate = parseRowDate(baseDateStr);
    try {
      let toolFormat = s.match(/^[a-z]{3}\s+\d{1,2}\s+[a-z]{3}\s+(\d{1,2}):(\d{2})([ap]m)$/i);
      if (toolFormat) { let hrs = parseInt(toolFormat[1], 10), mins = parseInt(toolFormat[2], 10), ampm = toolFormat[3].toUpperCase(); if (ampm === "PM" && hrs < 12) hrs += 12; else if (ampm === "AM" && hrs === 12) hrs = 0; baseDate.setHours(hrs, mins, 0, 0); return baseDate; }
      s = cleanTimeStr(s);
      let matchTime = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([APap][Mm])?/);
      if (matchTime) { let hours = parseInt(matchTime[1], 10), mins = parseInt(matchTime[2], 10), ampm = matchTime[4] ? matchTime[4].toUpperCase() : null; if (ampm) { if (ampm === "PM" && hours < 12) hours += 12; else if (ampm === "AM" && hours === 12) hours = 0; } baseDate.setHours(hours, mins, 0, 0); return baseDate; }
    } catch(e) {} return null;
  }

  function getBaseDate(timeStr, dateStr) {
      let d = parseDateTimeStrict(timeStr, dateStr);
      if (!d) { d = parseRowDate(dateStr); d.setHours(12, 0, 0, 0); } return d;
  }

  // =========================================================
  // 5. COMMENTS DB & RECORD UPDATING
  // =========================================================
  function appendToCommentsDB(ss, bId, userName, logText) {
      if (!bId || bId === "" || bId === "--") return; 
      let sheet = ss.getSheetByName("Comments_DB");
      if (!sheet) {
          sheet = ss.insertSheet("Comments_DB");
          sheet.appendRow(["Timestamp", "Booking/Req ID", "User", "Log/Comment", "", "Booking ID (Mail)", "Mail Status"]);
          sheet.getRange("A1:G1").setFontWeight("bold");
      }
      let ts = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
      sheet.getRange(sheet.getLastRow() + 1, 1, 1, 4).setValues([[ts, bId, userName, logText]]);
  }

  function addNewComment(bookingId, userName, commentText) {
      if (!bookingId || !commentText) return "Error: Missing data";
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      appendToCommentsDB(ss, bookingId, userName, commentText);
      return "Comment added!";
  }

  function getRecordComments(bookingOrReqId) {
      if (!bookingOrReqId) return "Error: Invalid ID";
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      const sheet = ss.getSheetByName("Comments_DB");
      if (!sheet) return "No comments found.";
      
      const lastRow = sheet.getLastRow();
      if (lastRow < 2) return "No comments found.";
      
      const maxCols = Math.min(sheet.getLastColumn(), 4);
      if (maxCols < 4) return "No comments found.";

      const data = sheet.getRange(2, 1, lastRow - 1, maxCols).getDisplayValues();
      let comments = [];
      
      for (let i = 0; i < data.length; i++) {
          let rowId = data[i][1];
          if (rowId === bookingOrReqId || rowId === "Req_" + bookingOrReqId || "Req_" + rowId === bookingOrReqId) {
              comments.push(`[${data[i][0]}] ${data[i][2]}: ${data[i][3]}`);
          }
      }
      return comments.length > 0 ? comments.join("\n") : "No comments found.";
  }

  // =========================================================
  // 🟢 NAYA: EDIT FULL RECORD (TRACKS ALL 13 COLUMNS)
  // =========================================================
  function editFullRecord(city, searchId, patientName, newData, userName) {
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID); 
      const sheet = ss.getSheetByName(city);
      if (!sheet) throw new Error("City sheet not found: " + city);
      
      const map = getColumnMap(sheet);
      const lastRow = sheet.getLastRow(); if (lastRow < 2) throw new Error("No data found.");
      const data = sheet.getRange(2, 1, lastRow - 1, map.lastCol).getValues(); 
      let rowIndex = -1; let oldRow = [];
      
      // Find the row
      for (let i = 0; i < data.length; i++) {
          let rId = map.bookingId > -1 && data[i][map.bookingId] ? data[i][map.bookingId].toString().trim() : "";
          let rReqId = map.reqId > -1 && data[i][map.reqId] ? data[i][map.reqId].toString().trim() : "";
          let rName = map.name > -1 && data[i][map.name] ? data[i][map.name].toString().trim() : "";
          
          if (searchId && searchId !== "--" && (rId === searchId || rReqId === searchId || "Req_"+rReqId === searchId)) { 
              rowIndex = i + 2; oldRow = data[i]; break; 
          } else if ((!searchId || searchId === "--") && rName === patientName) { 
              rowIndex = i + 2; oldRow = data[i]; break; 
          }
      }
      
      if (rowIndex === -1) throw new Error("Record not found to edit.");
      
      let logEntry = "";
      
      // Smart Compare Function
      const compareAndLog = (newVal, fieldName, mapIndex) => {
          if (mapIndex === -1) return; 
          let cleanNew = newVal ? newVal.toString().trim() : "";
          let cleanOld = oldRow[mapIndex] ? oldRow[mapIndex].toString().trim() : "";
          
          if (cleanNew !== "" && cleanNew !== cleanOld) {
              sheet.getRange(rowIndex, mapIndex + 1).setValue(cleanNew); 
              logEntry += `${fieldName} changed to '${cleanNew}'. `;
          }
      };

      // Update all 13 possible fields
      compareAndLog(newData.bookingId, "Booking ID", map.bookingId);
      compareAndLog(newData.name, "Name", map.name);
      compareAndLog(newData.age, "Age", map.age);
      compareAndLog(newData.gender, "Gender", map.gender);
      compareAndLog(newData.tests, "Tests", map.test);
      compareAndLog(newData.fbs, "FBS/RBS", map.fbs);
      compareAndLog(newData.type, "Partner Type", map.type);
      compareAndLog(newData.barcode, "Barcode", map.barcode);
      compareAndLog(newData.colTime, "Col Time", map.colTime);
      compareAndLog(newData.phleboName, "Phlebo Name", map.phlebo);
      compareAndLog(newData.phleboPhone, "Phlebo Mobile", map.phleboMobile);
      compareAndLog(newData.status, "Status", map.status);
      compareAndLog(newData.remarks, "Remarks", map.remarks);
      
      if (logEntry !== "") {
          let targetId = newData.bookingId || searchId || patientName;
          appendToCommentsDB(ss, targetId, userName, `[Full Edit]: ${logEntry}`);
          notifyDashboards(); // 🚀 NAYA: Edit hote hi baki sabko ping jayega
          
          // 🚀 NAYA JADOO: Ab ye exact list bhejega ki kya-kya update hua hai
          return "✅ RECORD UPDATED SUCCESSFULLY!\n\nChanges Made:\n" + logEntry.replace(/\. /g, '.\n');
      }
      return "⚠️ No changes detected. (Aapne kuch badla nahi tha)";
  }

  // =========================================================
  // INLINE ROW UPDATER (For quick single-click saves)
  // =========================================================
  function updateRecord(city, oldBookingId, patientName, newStatus, newRemarks, newBookingId, reqIdsStr, newAge, newGender, newFbs, newColTime, userName) {
    const ss = SpreadsheetApp.openById(OLD_SHEET_ID); const sheet = ss.getSheetByName(city);
    if (!sheet) throw new Error("City sheet not found: " + city);
    
    const map = getColumnMap(sheet);
    const lastRow = sheet.getLastRow(); if (lastRow < 2) throw new Error("No data found.");
    const data = sheet.getRange(2, 1, lastRow - 1, map.lastCol).getValues(); 
    let reqIds = reqIdsStr ? reqIdsStr.split(",").map(id => id.trim()) : []; 
    let updatedCount = 0; 
    
    const timeString = Utilities.formatDate(new Date(), "Asia/Kolkata", "hh:mm a");
    const actor = userName || "System";

    const safeSetValue = (rIdx, cIdx, val) => {
      if(cIdx > -1) {
        try {
          sheet.getRange(rIdx, cIdx + 1).setValue(val);
        } catch (e) {
          console.error(`Protected cell skipped at row ${rIdx}, col ${cIdx}: ${e.message}`);
        }
      }
    };

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      let rId = map.bookingId > -1 && row[map.bookingId] ? row[map.bookingId].toString().trim() : "";
      let rReqId = map.reqId > -1 && row[map.reqId] ? row[map.reqId].toString().trim() : "";
      let rName = map.name > -1 && row[map.name] ? row[map.name].toString().trim() : "";
      
      let isMatch = false;
      let isRowEmptyId = (rId === "" || rId === "--" || rId.toLowerCase() === "na");
      
      // STRONG MATCHING LOGIC
      if (oldBookingId && oldBookingId !== "--" && oldBookingId !== "" && rId === oldBookingId) {
          isMatch = true; 
      } else if (newBookingId && newBookingId !== "" && isRowEmptyId) {
          if (reqIds.length > 0 && rReqId && reqIds.includes(rReqId)) isMatch = true;
          else if (rName.toLowerCase() === patientName.toLowerCase()) isMatch = true; 
      } else if (reqIds.length > 0 && rReqId && reqIds.includes(rReqId)) {
          isMatch = true;
      } else if ((!oldBookingId || oldBookingId === "--") && isRowEmptyId && rName.toLowerCase() === patientName.toLowerCase()) {
          isMatch = true;
      }

      if (isMatch) {
        const rowIndex = i + 2; let logEntry = ""; let targetBId = newBookingId || rId || "Req_"+rReqId;
        let oldStatus = map.status > -1 && row[map.status] ? row[map.status].toString().trim() : "Blank";
        
        if (newStatus && newStatus !== oldStatus && map.status > -1) { 
          safeSetValue(rowIndex, map.status, newStatus); 
          logEntry += `Status changed to '${newStatus}'. `;
          if (newStatus === "Shared" && map.shareTime > -1) {
              safeSetValue(rowIndex, map.shareTime, timeString); 
          }
        }
        
        if (newRemarks && map.remarks > -1) { 
          safeSetValue(rowIndex, map.remarks, newRemarks); 
          logEntry += `Added remarks: '${newRemarks}'. `; 
        }
        
        if (newBookingId && newBookingId.trim() !== "" && newBookingId.trim() !== rId && map.bookingId > -1) {
            safeSetValue(rowIndex, map.bookingId, newBookingId.trim()); 
            if(map.creatTime > -1 && (!row[map.creatTime] || row[map.creatTime] === "")) {
                safeSetValue(rowIndex, map.creatTime, timeString); 
            }
            logEntry += `Generated Bkg ID: '${newBookingId}'. `;
        }
        
        const compareInline = (newVal, oldVal, field, mapIndex) => {
            if(mapIndex > -1 && newVal && newVal.toString().trim() !== "" && newVal.toString().trim() !== (oldVal?oldVal.toString().trim():"")) {
                safeSetValue(rowIndex, mapIndex, newVal.toString().trim()); 
                logEntry += `${field} changed to '${newVal}'. `;
            }
        };
        
        compareInline(newAge, row[map.age], "Age", map.age);
        compareInline(newGender, row[map.gender], "Gender", map.gender);
        compareInline(newFbs, row[map.fbs], "FBS/RBS", map.fbs);
        compareInline(newColTime, row[map.colTime], "Col Time", map.colTime);

        if (logEntry !== "" && targetBId) appendToCommentsDB(ss, targetBId, actor, `[Inline Action]: ${logEntry}`);
        updatedCount++;
      }
    }
    if (updatedCount === 0) throw new Error("Could not find any records to update.");
    
    SpreadsheetApp.flush(); // Google Sheet me turant likho
    
    // 🚀 FIX: Minimal buffer after flush — data is already committed
    Utilities.sleep(300); 
    
    notifyDashboards(); // Ab saare dashboards ko naya (fresh) data milega
    return `✅ Updated ${updatedCount} row(s) successfully.`;
  }
  // =========================================================
  // TREND ANALYTICS DATA (FOR DASHBOARD)
  // =========================================================
  function getTrendAnalyticsData(startDateStr, endDateStr) {
    try {
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      const ignoreSheets = ['Dashboard', 'Master Data', 'Instructions', 'Pending List', 'Dropdowns', 'Comments_DB', 'API_Not_Found'];
      const sheets = ss.getSheets().filter(s => !ignoreSheets.includes(s.getName()));
      
      let sDate = startDateStr ? new Date(startDateStr) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      let eDate = endDateStr ? new Date(endDateStr) : new Date();
      sDate.setHours(0, 0, 0, 0);
      eDate.setHours(23, 59, 59, 999);

      let stats = {};

      sheets.forEach(sheet => {
        let city = sheet.getName();
        let map = getColumnMap(sheet);
        if (map.date === -1) return;

        let lastRow = sheet.getLastRow();
        if (lastRow < 2) return;
        let data = sheet.getRange(2, 1, lastRow - 1, map.lastCol).getValues();
        
        data.forEach(row => {
          let rDateRaw = row[map.date];
          if (!rDateRaw) return;
          let rDate = parseRowDate(rDateRaw); 
          if (isNaN(rDate.getTime())) return;
          
          if (rDate >= sDate && rDate <= eDate) {
            let dateKey = `${rDate.getFullYear()}-${("0" + (rDate.getMonth() + 1)).slice(-2)}-${("0" + rDate.getDate()).slice(-2)}`;
            if (!stats[dateKey]) stats[dateKey] = {};
            if (!stats[dateKey][city]) stats[dateKey][city] = { PPMC: 0, RETAIL: 0, API: 0, MANUAL: 0 };
            
            let type = map.type > -1 && row[map.type] ? String(row[map.type]).toUpperCase().trim() : "";
            let source = map.referredBy > -1 && row[map.referredBy] ? String(row[map.referredBy]).toUpperCase().trim() : "";
            
            if (type.includes("PPMC") || type.includes("PARTNER")) stats[dateKey][city].PPMC++;
            else stats[dateKey][city].RETAIL++;
            
            if (source.includes("API") || source.includes("MEDIBUDDY")) stats[dateKey][city].API++;
            else stats[dateKey][city].MANUAL++;
          }
        });
      });

      return JSON.stringify({ stats: stats });
    } catch (e) {
      return JSON.stringify({ error: e.message });
    }
  }

  // =========================================================
  // 6. CSV IMPORT LOGIC (WITH SMART CITY ROUTING, EXACT DATE & TIME)
  // =========================================================
  function processClientCSV(csvText, userName, selectedCity) { 
    if (!selectedCity) return "Error: City not specified.";
    try {
      // 🟢 BUG FIX 1: Remove Hidden BOM Character
      if (csvText.charCodeAt(0) === 0xFEFF) {
          csvText = csvText.slice(1);
      }
      
      const data = Utilities.parseCsv(csvText);
      if (!data || data.length < 2) return "Error: CSV is empty or has only headers.";
      
      const headers = data[0].map(h => h.toString().trim().replace(/^\uFEFF/, ''));
      const idx = {
        reqId: headers.indexOf("appointmentId"), status: headers.indexOf("currentStatus"),
        name: headers.indexOf("patientName"), city: headers.indexOf("city"),
        appTime: headers.indexOf("AppointmentTime"), testName: headers.indexOf("labTestName"), 
        barcode: headers.indexOf("customerBarcodeArr"), gender: headers.indexOf("patientGender"), 
        contract: headers.indexOf("contractName"), phlebo: headers.indexOf("PhleboName"), 
        phone: headers.indexOf("PhleboPhoneNumber1"), age: headers.indexOf("patientAge"),
        dob: headers.indexOf("patientDOB"), subArea: headers.indexOf("subArea") // 🚀 DOB & Location mapped
      };
      
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID); 
      let stats = { added: 0, skippedDup: 0, skippedStatus: 0 };
      let sheetDataMap = {}; let existingKeysMap = {}; let sheetColumnMapsCache = {};

      let addedLogs = [];
      let skippedLogs = [];

      // 🟢 IST Time Generator
      function getExactIST() {
          let d = new Date();
          let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
          let ist = new Date(utc + (3600000 * 5.5));
          
          let h = ist.getHours(), m = ist.getMinutes();
          let ampm = h >= 12 ? 'PM' : 'AM';
          h = h % 12; h = h ? h : 12; 
          let min = m < 10 ? '0' + m : m;
          return `${("0" + h).slice(-2)}:${min} ${ampm}`;
      }

      let currentSubmissionTime = getExactIST(); 

      for (let i = 1; i < data.length; i++) {
        let row = data[i];
        if (!row || row.join("").trim() === "") continue;
        
        let rawName = idx.name > -1 ? row[idx.name] : "";
        let rawReq = idx.reqId > -1 ? row[idx.reqId] : "";
        if (!rawName && !rawReq) continue; 

        let currentStatus = idx.status > -1 && row[idx.status] ? row[idx.status].toString().trim().toLowerCase() : "";
        if (currentStatus !== "sample and bar code submitted" && currentStatus !== "order rescheduled to same day") {
          stats.skippedStatus++; continue;
        }

        let rawCity = idx.city > -1 && row[idx.city] ? row[idx.city].toString().trim().toLowerCase() : "";
        let targetSheetName = selectedCity; 
        
        if (rawCity) {
            if (rawCity.includes("delhi") || rawCity.includes("faridabad") || rawCity.includes("gurgaon") || rawCity.includes("ghaziabad") || rawCity.includes("noida")) targetSheetName = "Delhi NCR";
            else if (rawCity.includes("lucknow")) targetSheetName = "Lucknow";
            else if (rawCity.includes("chandigarh")) targetSheetName = "Chandigarh";
            else if (rawCity.includes("mumbai")) targetSheetName = "Mumbai";
            else if (rawCity.includes("chennai")) targetSheetName = "Chennai";
            else if (rawCity.includes("jaipur")) targetSheetName = "Jaipur";
            else if (rawCity.includes("kolkata")) targetSheetName = "Kolkata";
            else if (rawCity.includes("kanpur")) targetSheetName = "Kanpur";
            else targetSheetName = row[idx.city].toString().trim().replace(/[\[\]*?:\/]/g, '').substring(0, 50); 
        }

        if (!sheetDataMap[targetSheetName]) {
          sheetDataMap[targetSheetName] = [];
          let sheet = ss.getSheetByName(targetSheetName);
          if (!sheet) {
              sheet = ss.insertSheet(targetSheetName);
              let templateSheet = ss.getSheetByName("Delhi NCR") || ss.getSheets()[0];
              let tLastCol = templateSheet.getLastColumn();
              if (tLastCol > 0) {
                  sheet.getRange(1, 1, 1, tLastCol).setValues(templateSheet.getRange(1, 1, 1, tLastCol).getValues());
                  sheet.getRange(1, 1, 1, tLastCol).setFontWeight("bold");
              }
          }
          
          let map = getColumnMap(sheet);
          sheetColumnMapsCache[targetSheetName] = map;
          existingKeysMap[targetSheetName] = new Set();
          
          let lr = sheet.getLastRow();
          if (lr > 1 && map.reqId > -1 && map.test > -1) {
              let existingData = sheet.getRange(2, 1, lr - 1, map.lastCol).getValues();
              existingData.forEach(r => {
                  let req = r[map.reqId] ? r[map.reqId].toString().trim() : "";
                  let tst = r[map.test] ? r[map.test].toString().trim() : "";
                  if (req) existingKeysMap[targetSheetName].add(`${req}_${tst}`);
              });
          }
        }

        let reqId = idx.reqId > -1 && row[idx.reqId] ? row[idx.reqId].toString().trim() : "";
        let testName = idx.testName > -1 && row[idx.testName] ? row[idx.testName].toString().trim() : "";
        let patientName = idx.name > -1 && row[idx.name] ? row[idx.name].toString().trim() : "Unknown";
        let dedupKey = `${reqId}_${testName}`;

        if (existingKeysMap[targetSheetName].has(dedupKey)) { 
            stats.skippedDup++; 
            skippedLogs.push(`⏭️ Skipped: ${patientName} (${reqId}) - Already exists`);
            continue; 
        }

        let appTime = idx.appTime > -1 && row[idx.appTime] ? row[idx.appTime].toString() : "";
        
        // 🚀 PROPER DATE STRING FIX: Bypasses Google Sheets strict validation permanently
        let finalDateStr = ""; 
        let timeStr = "";
        if (appTime) {
          let parts = appTime.split(" "); 
          let rawDate = parts[0]; 
          if(parts[1]) timeStr = parts[1]; 
          
          if (rawDate) {
              let dParts = rawDate.split("-"); // e.g., 2026-03-15
              if (dParts.length === 3) {
                  let y = dParts[0];
                  let m = ("0" + dParts[1]).slice(-2); 
                  let d = ("0" + dParts[2]).slice(-2);
                  finalDateStr = `${d}/${m}/${y}`; // "15/03/2026" (Strict text representation)
              }
          }
          
          if(timeStr) {
              let tParts = timeStr.split(":"); 
              if(tParts.length >= 2) {
                  let h = parseInt(tParts[0], 10), min = tParts[1];
                  let ampm = h >= 12 ? "PM" : "AM"; h = h % 12; h = h ? h : 12;
                  timeStr = `${("0"+h).slice(-2)}:${min} ${ampm}`;
              }
          }
        } else {
          let d = new Date();
          let dStr = ("0" + d.getDate()).slice(-2);
          let mStr = ("0" + (d.getMonth() + 1)).slice(-2);
          finalDateStr = `${dStr}/${mStr}/${d.getFullYear()}`;
        }

        let barcodeRaw = idx.barcode > -1 && row[idx.barcode] ? row[idx.barcode].toString() : "";
        let barcode = barcodeRaw ? barcodeRaw.replace(/\[|\]|"/g, '') : "";
        let phleboString = idx.phlebo > -1 && row[idx.phlebo] ? row[idx.phlebo].toString().trim() : "";
        let phleboPhone = idx.phone > -1 && row[idx.phone] ? row[idx.phone].toString().trim() : "";
        let location = idx.subArea > -1 && row[idx.subArea] ? row[idx.subArea].toString().trim() : "";

        let ageStr = (idx.age > -1 && row[idx.age]) ? row[idx.age].toString().trim() : "";
        if (!ageStr && idx.dob > -1 && row[idx.dob]) {
            let dobParts = row[idx.dob].toString().split("-");
            if (dobParts.length === 3) {
                let birthYear = parseInt(dobParts[0], 10);
                let currentYear = new Date().getFullYear();
                let calcAge = currentYear - birthYear;
                if(calcAge > 0) ageStr = calcAge.toString();
            }
        }
        
        let map = sheetColumnMapsCache[targetSheetName];
        let newRow = new Array(map.lastCol).fill("");
        
        if(map.date > -1) newRow[map.date] = finalDateStr; // 🟢 Clean pure string
        if(map.reqId > -1) newRow[map.reqId] = reqId || "";
        if(map.name > -1) newRow[map.name] = patientName || "";
        if(map.age > -1) newRow[map.age] = ageStr;
        if(map.gender > -1) newRow[map.gender] = (idx.gender > -1 && row[idx.gender]) ? row[idx.gender].toString().trim() : "";
        if(map.test > -1) newRow[map.test] = testName || "";
        if(map.type > -1) newRow[map.type] = (idx.contract > -1 && row[idx.contract]) ? row[idx.contract].toString().trim() : "";
        if(map.barcode > -1) newRow[map.barcode] = barcode || "";
        
        if(map.colTime > -1) newRow[map.colTime] = timeStr || "";
        if(map.phlebo > -1) newRow[map.phlebo] = phleboString || "";
        if(map.phleboMobile > -1) newRow[map.phleboMobile] = phleboPhone || "";
        if(map.location > -1) newRow[map.location] = location || ""; 
        
        // 🟢 BIG FIX: Correct Time Placement based on your UI screenshot!
        if(map.subTime > -1) newRow[map.subTime] = currentSubmissionTime; 
        if(map.creatTime > -1) newRow[map.creatTime] = ""; 

        sheetDataMap[targetSheetName].push(newRow);
        existingKeysMap[targetSheetName].add(dedupKey); 
        stats.added++;
        addedLogs.push(`✅ Added: ${patientName} (${reqId}) ➔ ${targetSheetName}`);

        appendToCommentsDB(ss, "Req_" + reqId, userName, `[System]: Imported via CSV into ${targetSheetName}. Test: ${testName}`);
      }

      for (let sheetName in sheetDataMap) {
          let newRows = sheetDataMap[sheetName];
          if (newRows.length > 0) {
              let sheet = ss.getSheetByName(sheetName);
              let map = sheetColumnMapsCache[sheetName];
              
              sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, map.lastCol).setValues(newRows);
          }
      }
      
      let resultMsg = `📊 Import Summary:\n\n${stats.added} Records Successfully Added.\n${stats.skippedDup} Duplicates Skipped.\n\n`;
      if (addedLogs.length > 0) {
          resultMsg += `--- RECENTLY ADDED ---\n${addedLogs.slice(0, 15).join('\n')}\n${addedLogs.length > 15 ? '...and more' : ''}\n\n`;
      }
      if (skippedLogs.length > 0) {
          resultMsg += `--- SKIPPED (ALREADY EXIST) ---\n${skippedLogs.slice(0, 15).join('\n')}`;
      }

      // 🚀 FIX: CSV import ke baad turant sabhi dashboards ko notify karo!
      if (stats.added > 0) {
        SpreadsheetApp.flush();
        notifyDashboards();
      }

      return resultMsg;
    } catch (e) { 
        return "Error processing CSV: " + e.message; 
    }
  }
  // =========================================================
  // 7. MAIN DASHBOARD DATA ENGINE (TIMEZONE FIXED + API/MANUAL SPLIT)
  // =========================================================
  function getISTDate() {
      let d = new Date();
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      return new Date(utc + (3600000 * 5.5)); 
  }

  function forceParseDate(dateStr) {
      if (!dateStr || String(dateStr).trim() === "") return new Date(0); 
      let dStr = String(dateStr).trim().split(" ")[0]; // Time hata do, sirf pehla hissa (Date) lo
      let d = new Date(0); // Default invalid date

      let parts = dStr.split(/[-/]/);
      if (parts.length === 3) {
          let p1 = parseInt(parts[0], 10);
          let p2 = parseInt(parts[1], 10);
          let p3 = parseInt(parts[2], 10);
          
          // Agar pehla hissa year hai (YYYY-MM-DD)
          if (p1 > 1000) { 
              d = new Date(p1, p2 - 1, p3); 
          } 
          // Agar aakhri hissa year hai (DD-MM-YYYY ya MM-DD-YYYY)
          else if (p3 > 1000) {
              // Agar p2 > 12 hai, iska matlab wo MM/DD/YYYY hai
              if (p2 > 12) d = new Date(p3, p1 - 1, p2); 
              // Warna strictly DD-MM-YYYY manenge
              else d = new Date(p3, p2 - 1, p1); 
          }
      } else {
          let tempD = new Date(dStr);
          if (!isNaN(tempD.getTime())) d = tempD;
      }
      
      if (!isNaN(d.getTime())) d.setHours(0, 0, 0, 0);
      return d;
  }

  function getDashboardData(startStr, endStr, globalSearchTerm) {
    try {
      const email = Session.getActiveUser().getEmail();
      const userData = getUserData(email);
      let allowedCities = userData && userData.cities && userData.cities.indexOf('all') === -1 ? userData.cities : ['all'];

      const ss = SpreadsheetApp.openById(OLD_SHEET_ID); 
      const allSheets = ss.getSheets();
      const sheetsToIgnore = ['Dashboard', 'Master Data', 'Instructions', 'Pending List', 'Dropdowns', 'Comments_DB', 'API_Not_Found'];
      
      let start = startStr ? new Date(startStr) : getISTDate();
      let end = endStr ? new Date(endStr) : getISTDate();
      if (isNaN(start.getTime())) start = getISTDate(); 
      if (isNaN(end.getTime())) end = getISTDate();
      
      start.setHours(0, 0, 0, 0); 
      end.setHours(23, 59, 59, 999);

      let searchFilter = globalSearchTerm ? globalSearchTerm.toLowerCase().trim() : null;
      let maps = { pending: {}, log: {}, create: {}, incomplete: {}, shared: {}, cancelled: {} };
      let allCityNames = [], duplicateTracker = new Set(), allPartnerTypes = new Set();

      let commentsMap = {};
      let trfLinkMap = {}; 
      let mailSentSet = new Set();
      let commentSheet = ss.getSheetByName('Comments_DB');
      
      if (commentSheet) {
          let cLastRow = commentSheet.getLastRow();
          let maxCols = commentSheet.getLastColumn();
          if(cLastRow >= 2 && maxCols >= 2) {
              let safeCols = Math.min(maxCols, 7); 
              
              let cStartRow = Math.max(2, cLastRow - 1500);
              let cNumRows = cLastRow - cStartRow + 1;
              let cData = commentSheet.getRange(cStartRow, 1, cNumRows, safeCols).getDisplayValues();
              
              for(let i=0; i<cData.length; i++) {
                  let logBId = String(cData[i][1]).trim();
                  if(logBId) {
                      if(!commentsMap[logBId]) commentsMap[logBId] = [];
                      if(safeCols >= 4 && String(cData[i][3]).trim() !== "") {
                          let cellTxt = String(cData[i][3]).trim();
                          commentsMap[logBId].push(`[${cData[i][0]}] ${cData[i][2]}: ${cellTxt}`);
                      }
                  }
                  
                  if(safeCols >= 6) {
                      let colFText = String(cData[i][5]).trim();
                      if(colFText.startsWith("http") && logBId) {
                          trfLinkMap[logBId] = colFText;
                      }
                  }

                  let mailBId = safeCols >= 6 ? String(cData[i][5]).trim() : null;
                  let mailStat = safeCols >= 7 ? String(cData[i][6]).trim() : null;
                  if(mailBId && mailStat === "Sent") mailSentSet.add(mailBId); 
              }
          }
      }

      for (const sheet of allSheets) {
        const sheetName = sheet.getName(); if (sheetsToIgnore.includes(sheetName)) continue;
        if (allowedCities[0] !== 'all' && allowedCities.indexOf(sheetName) === -1) continue;
        
        allCityNames.push(sheetName); const lastRow = sheet.getLastRow(); if (lastRow < 2) continue;

        const colMap = getColumnMap(sheet);
        if(colMap.lastCol === 0) continue; 
        
        let startRow = 2;
        let numRowsToFetch = lastRow - 1;
        const MAX_ROWS = 1500; 
        
        if (lastRow > MAX_ROWS) {
            startRow = lastRow - MAX_ROWS + 1;
            numRowsToFetch = MAX_ROWS;
        }
        
        // 🚀 SPEED UPGRADE: getDisplayValues() ki jagah getValues() use kiya gaya hai
        const data = sheet.getRange(startRow, 1, numRowsToFetch, colMap.lastCol).getValues(); 
        let reqHistory = {}, patientHistory = {}, rowClassifications = new Array(data.length).fill("Original");
        
        // 🚀 SUPER SMART FORMATTER: Date aur Time ko alag-alag pehchanega
        const val = (rowArr, idx) => {
            if (idx > -1 && rowArr[idx] !== null && rowArr[idx] !== "") {
                let cellData = rowArr[idx];
                if (Object.prototype.toString.call(cellData) === '[object Date]') {
                    let y = cellData.getFullYear();
                    let hrs = cellData.getHours();
                    let mins = cellData.getMinutes();
                    let ampm = hrs >= 12 ? 'PM' : 'AM';
                    let h12 = hrs % 12;
                    h12 = h12 ? h12 : 12; 
                    let timeStr = `${h12 < 10 ? '0'+h12 : h12}:${mins < 10 ? '0'+mins : mins} ${ampm}`;

                    if (y === 1899) {
                        return timeStr; // Sirf Time hai
                    } else {
                        let d = cellData.getDate();
                        let m = cellData.getMonth() + 1;
                        let dateStr = `${d < 10 ? '0'+d : d}/${m < 10 ? '0'+m : m}/${y}`;
                        // 🚀 JADOO: Date ke sath time bhi return karega, taaki agla function usme se time nikal sake!
                        return `${dateStr} ${timeStr}`; 
                    }
                }
                return cellData.toString().trim();
            }
            return "";
        };

        for (let i = 0; i < data.length; i++) {
            let row = data[i]; 
            let name = val(row, colMap.name);
            let reqId = val(row, colMap.reqId);
            if (!name && !reqId) continue;
            
            let rawAge = val(row, colMap.age), age = rawAge.match(/\d+/) ? rawAge.match(/\d+/)[0] : rawAge;
            let gender = val(row, colMap.gender), test = val(row, colMap.test);
            let colDate = forceParseDate(val(row, colMap.date)); 
            let pKey = `${name.toLowerCase()}_${age}_${gender.toLowerCase()}`, cType = "Original";

            if (reqId) {
                if (reqHistory[reqId]) {
                    let diff = (colDate - reqHistory[reqId].colDate) / 86400000, isAdjacent = (i - reqHistory[reqId].lastRowIndex === 1);
                    if (!isAdjacent && diff >= 0 && diff <= 3) { if (test && !reqHistory[reqId].tests.includes(test)) cType = "Missing"; } else if (diff > 3) reqHistory[reqId] = { colDate: colDate, tests: [], lastRowIndex: i };
                    if (test && !reqHistory[reqId].tests.includes(test)) reqHistory[reqId].tests.push(test);
                    reqHistory[reqId].lastRowIndex = i;
                } else {
                    if (patientHistory[pKey]) { let diff = (colDate - patientHistory[pKey].colDate) / 86400000; if (diff >= 0 && diff <= 3 && patientHistory[pKey].reqId !== reqId) cType = "Add-on"; }
                    reqHistory[reqId] = { colDate: colDate, tests: [test], lastRowIndex: i }; patientHistory[pKey] = { colDate: colDate, reqId: reqId };
                }
            }
            rowClassifications[i] = cType;
        }

        for (let i = data.length - 1; i >= 0; i--) {
          try {
            let row = data[i]; 
            let name = val(row, colMap.name) || "Unknown", refId = val(row, colMap.reqId);
            let bId = val(row, colMap.bookingId);
            
            if (name === "Unknown" && !refId && !bId) continue; 
            
            let auditLogs = commentsMap[bId] ? commentsMap[bId].join("\n") : (commentsMap["Req_"+refId] ? commentsMap["Req_"+refId].join("\n") : "");
            
            let hasApiText = row.some(cell => String(cell).toUpperCase().replace(/\s+/g, '') === "APIUSER" || String(cell).toUpperCase().replace(/\s+/g, '') === "API_USER");
            let hasApiTag = auditLogs.includes("[API-MATCHED]");
            
            let isApi = hasApiText || hasApiTag; 
            let isMixed = !hasApiText && hasApiTag; 
            
            let cleanId = bId.toLowerCase().replace(/\s+/g, '');
            let status = val(row, colMap.status), stLow = status.toLowerCase();
            
            let rowDateStr = val(row, colMap.date);
            let rowDate = forceParseDate(rowDateStr); 
            
            let subRaw = val(row, colMap.subTime);
            let creatRaw = val(row, colMap.creatTime);
            let shareRaw = val(row, colMap.shareTime);
            
            let extractedSubTime = cleanTimeStr(subRaw);
            let extractedLatestSubTime = cleanTimeStr(creatRaw);
            let extractedShareTime = cleanTimeStr(shareRaw);
            let extractedColTime = cleanTimeStr(val(row, colMap.colTime));

            let isShared = stLow.includes("share");
            let isToCreate = (cleanId === "" || cleanId === "-" || cleanId === "--" || cleanId === "noid" || cleanId === "na" || cleanId === "n/a");
            
            // 🚀 EXACT MATCH: Sirf Column A ki Date dekho!
            let withinDate = (rowDate.getTime() >= start.getTime() && rowDate.getTime() <= end.getTime());

            let testName = val(row, colMap.test);
            let cType = rowClassifications[i];
            let rawAge = val(row, colMap.age), cleanAgeNum = rawAge.match(/\d+/) ? rawAge.match(/\d+/)[0] : rawAge;
            let fbsVal = val(row, colMap.fbs);
            let gender = val(row, colMap.gender);
            if (!fbsVal && rawAge) { let raL = rawAge.toLowerCase(); if (raL.includes('fast') || raL.includes('fbs')) fbsVal = "FBS"; else if (raL.includes('rand') || raL.includes('rbs')) fbsVal = "RBS"; }
            
            let barcode = val(row, colMap.barcode); if (!barcode || barcode === "-" || barcode.toLowerCase() === "na") barcode = "Not given";
            let phleboName = val(row, colMap.phlebo);
            let phleboMobile = val(row, colMap.phleboMobile);
            let pType = val(row, colMap.type);
            let remarks = val(row, colMap.remarks);
            let referredBy = val(row, colMap.referredBy);

            if (cleanId.includes("notcollect") || cleanId.includes("cancel") || cleanId.includes("reject") || cleanId.includes("bloodnot")) {
                let groupKey = "CANC_" + i;
                addToMap(maps.cancelled, groupKey, sheetName, rowDateStr, bId, refId, name, cleanAgeNum, gender, fbsVal, pType, barcode, extractedColTime, extractedSubTime, extractedLatestSubTime, status, remarks, extractedShareTime, testName, "", "Cancelled", false, "", "", phleboName, phleboMobile, isApi, isMixed, rowTrfLink, referredBy);
                continue; 
            }

            if (pType && pType !== "-" && pType.trim() !== "") allPartnerTypes.add(pType.trim());

            let searchStr = `${bId} ${refId} ${name} ${testName} ${barcode} ${phleboName} ${remarks} ${pType}`.toLowerCase();
            
            let groupKey = bId;
            if (!groupKey || groupKey === "--" || isToCreate) {
                if (name !== "Unknown" && name !== "") groupKey = `${sheetName}_${name.toLowerCase()}_${cleanAgeNum}`;
                else if (refId) groupKey = "REQ_" + refId; 
                else groupKey = "UNKN_" + i;
            }
            
            const isDataIncomplete = (name === "Unknown" || name === "" || cleanAgeNum === "" || !gender || gender === "" || fbsVal === "" || extractedColTime === "" || extractedColTime === "-");
            
            let isDup = false, dupKey = `${sheetName}_${bId}_${name.toLowerCase()}_${testName.toLowerCase()}`;
            if (name !== "Unknown" && name !== "") { if (duplicateTracker.has(dupKey)) isDup = true; else duplicateTracker.add(dupKey); }
            
            let mailStatus = "";
            if (bId && mailSentSet.has(bId)) mailStatus = "Sent";
            else if (refId && mailSentSet.has(refId)) mailStatus = "Sent";

            let targetMap = null;

            if (stLow === "n/a" || stLow === "na") {
            } else if (isShared) {
                targetMap = maps.shared;
            } else if (isDataIncomplete && isToCreate) {
                targetMap = maps.incomplete; 
            } else if (isToCreate) {
                targetMap = maps.create;
            } else {
                targetMap = maps.pending;
            }

            let shouldProcess = false;
            if (searchFilter) {
                shouldProcess = true; 
            } else {
                if (withinDate) {
                    // Include everything matching the exact Date Filter
                    shouldProcess = true; 
                } else if (!isShared && stLow !== "n/a" && stLow !== "na") {
                    // 🚀 RULE 2: Agar purani date hai, toh SIRF tab include karo jab tak wo PENDING ho! (Taaki purana kaam na bhoolein)
                    shouldProcess = true; 
                }
            }

            let rowTrfLink = val(row, colMap.trf);
            if (!rowTrfLink || rowTrfLink === "") {
                rowTrfLink = trfLinkMap[bId] || trfLinkMap["Req_" + refId] || trfLinkMap[refId] || ""; 
            }

            if (shouldProcess && targetMap) {
                addToMap(targetMap, groupKey, sheetName, rowDateStr, (isToCreate?"":bId), refId, name, cleanAgeNum, gender, fbsVal, pType, barcode, extractedColTime, extractedSubTime, extractedLatestSubTime, status, remarks, extractedShareTime, testName, searchStr, cType, isDup, mailStatus, auditLogs, phleboName, phleboMobile, isApi, isMixed, rowTrfLink, referredBy, !withinDate); 
            }

            // 🚀 RULE 3: "Todays Logs" mein WAHI records aayenge jinme Column A ki date aaj ki hai!
            if (withinDate && !isToCreate && stLow !== "n/a") {
                addToMap(maps.log, groupKey, sheetName, rowDateStr, bId, refId, name, cleanAgeNum, gender, fbsVal, pType, barcode, extractedColTime, extractedSubTime, extractedLatestSubTime, status, remarks, extractedShareTime, testName, searchStr, cType, isDup, mailStatus, auditLogs, phleboName, phleboMobile, isApi, isMixed, rowTrfLink, referredBy, false); 
            }

          } catch (e) { console.error("Error processing row " + i, e); }
        }
      }

      let summaryStats = [];
      allCityNames.sort().forEach(city => {
          let cityLogs = Object.values(maps.log).filter(item => item.city === city).length;
          let cityPending = Object.values(maps.pending).filter(item => item.city === city).length + Object.values(maps.incomplete).filter(item => item.city === city && item.bookingId !== "").length;
          summaryStats.push({ city: city, logTotal: cityLogs, totalPending: cityPending });
      });

      return { 
          summary: summaryStats, 
          cities: allCityNames.sort(), 
          partnerTypes: Array.from(allPartnerTypes).sort(), 
          pending: Object.values(maps.pending), 
          log: Object.values(maps.log), 
          create: Object.values(maps.create), 
          incomplete: Object.values(maps.incomplete), 
          shared: Object.values(maps.shared),
          cancelled: Object.values(maps.cancelled)
      };
    } catch (criticalError) {
        throw new Error(`Fatal Backend Error: ${criticalError.message}`);
    }
  }

  function addToMap(map, key, city, date, id, refId, name, age, gender, fbs, type, barcode, colTime, subTime, latestSubTime, status, remarks, shareTime, test, searchStr, cType, isDup, mailStatus, auditLogs, phleboName, phleboMobile, isApi, isMixed, rowTrfLink, refName, isHist = false) {
    if (!map[key]) {
      map[key] = { city: city, date: date, bookingId: id, refId: refId, rIds: refId ? [refId] : [], name: name, age: age, gender: gender, fbs: fbs, type: type, barcode: barcode, colTime: colTime, subTime: subTime, latestSubTime: latestSubTime, status: status, remarks: remarks, shareTime: shareTime, tests: test ? [test] : [], searchIndex: searchStr, caseType: cType, isDuplicate: isDup, mailStatus: mailStatus, auditLogs: auditLogs, phleboName: phleboName, phleboPhone: phleboMobile, isApi: isApi || false, isMixed: isMixed || false, trfLink: rowTrfLink || "", drName: refName || "", isHistorical: isHist };
    } else {
      if (test && !map[key].tests.includes(test)) map[key].tests.push(test);
      if (refId && !map[key].rIds.includes(refId)) map[key].rIds.push(refId); 
      if (cType === "Missing" || cType === "Add-on") map[key].caseType = cType;
      map[key].isDuplicate = map[key].isDuplicate || isDup;
      if(mailStatus === "Sent") map[key].mailStatus = "Sent";
      map[key].isApi = map[key].isApi || isApi;
      map[key].isMixed = map[key].isMixed || isMixed;
      if(rowTrfLink && rowTrfLink !== "") map[key].trfLink = rowTrfLink; 
      if(refName && refName !== "") map[key].drName = refName;
    }
  }

  // 8. AUDIT ENGINE & CSV EXPORTS
  // =========================================================
  function getAuditAnalytics(startStr, endStr) {
    const email = Session.getActiveUser().getEmail();
    const userData = getUserData(email);
    let allowedCities = userData && userData.cities && userData.cities.indexOf('all') === -1 ? userData.cities : ['all'];

    const ss = SpreadsheetApp.openById(OLD_SHEET_ID); const allSheets = ss.getSheets();
    const sheetsToIgnore = ['Dashboard', 'Master Data', 'Instructions', 'Pending List', 'Dropdowns', 'Comments_DB'];
    
    let start = startStr ? new Date(startStr) : getISTDate(); 
    let end = endStr ? new Date(endStr) : getISTDate(); 
    start.setHours(0,0,0,0); end.setHours(23,59,59,999);
    
    let auditReports = []; const summaryCounts = { total: 0, late: 0, onTime: 0, pending: 0 };
    let seenKeys = new Set(); 

    allSheets.forEach(sheet => {
      let sheetName = sheet.getName();
      if (sheetsToIgnore.includes(sheetName)) return;
      if (allowedCities[0] !== 'all' && allowedCities.indexOf(sheetName) === -1) return;
      
      const lastRow = sheet.getLastRow(); if (lastRow < 2) return;
      const colMap = getColumnMap(sheet);
      if(colMap.lastCol === 0) return;
      const data = sheet.getRange(2, 1, lastRow - 1, colMap.lastCol).getDisplayValues(); 

      const val = (rowArr, idx) => idx > -1 && rowArr[idx] ? rowArr[idx].toString().trim() : "";

      data.forEach(row => {
        let bId = val(row, colMap.bookingId);
        let cleanId = bId.toLowerCase().replace(/\s+/g, '');
        let patientName = val(row, colMap.name);
        
        if (cleanId === "" || cleanId === "-" || cleanId === "--" || cleanId === "noid" || cleanId === "na" || cleanId === "n/a") return;
        
        let uniqueKey = cleanId || patientName.toLowerCase().replace(/\s+/g, '');
        
        if (seenKeys.has(uniqueKey)) return;

        let dateStr = val(row, colMap.date);
        let rowDate = parseRowDate(dateStr); rowDate.setHours(12,0,0,0);
        
        if (rowDate >= start && rowDate <= end) {
          let statusStr = val(row, colMap.status).toLowerCase(), shareDt = parseDateTimeStrict(val(row, colMap.shareTime), dateStr);
          if (!statusStr.includes("share") || !shareDt) return; 
          
          seenKeys.add(uniqueKey);

          summaryCounts.total++; 
          let baseDt = parseDateTimeStrict(val(row, colMap.creatTime), dateStr) || parseDateTimeStrict(val(row, colMap.subTime), dateStr) || parseDateTimeStrict(val(row, colMap.colTime), dateStr);
          let targetDt = baseDt ? new Date(baseDt.getTime() + (6 * 3600000)) : null; 
          let reason = "", reasonColor = "", tatStr = "-";
          if (targetDt && shareDt > targetDt) { reason = "Late"; reasonColor = "#ef4444"; summaryCounts.late++; } 
          else { reason = "On Time"; reasonColor = "var(--success)"; summaryCounts.onTime++; }
          if (baseDt) { let diff = shareDt - baseDt; if(diff < 0) diff += 86400000; tatStr = `${Math.floor(diff/3600000)}h ${Math.floor((diff%3600000)/60000)}m`; }
          
          auditReports.push({ city: sheet.getName(), date: dateStr, dateFormatted: standardizeDate(dateStr), bId: bId, name: patientName, type: val(row, colMap.type) || "-", subTime: cleanTimeStr(val(row, colMap.subTime)), latestSubTime: cleanTimeStr(val(row, colMap.creatTime)), shareTime: cleanTimeStr(val(row, colMap.shareTime)), reason: reason, reasonColor: reasonColor, tat: tatStr, remarks: val(row, colMap.remarks) || "" });
        }
      });
    });
    return { reports: auditReports, counts: summaryCounts, cities: [...new Set(auditReports.map(r => r.city))].sort() };
  }

  function standardizeDate(dateStr) {
    if (!dateStr) return ""; let parts = String(dateStr).trim().match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    let d = parts ? new Date(parts[3], parts[2] - 1, parts[1]) : new Date(dateStr); if (isNaN(d.getTime())) return dateStr; 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${("0" + d.getDate()).slice(-2)}-${months[d.getMonth()]}-${d.getFullYear()}`;
  }

  function downloadAuditCsv(startStr, endStr, cityF, typeF, reasonF, searchF) {
    let analytics = getAuditAnalytics(startStr, endStr), filtered = analytics.reports;
    cityF = cityF || 'ALL'; typeF = (typeF || 'ALL').toLowerCase(); reasonF = reasonF || 'ALL'; searchF = (searchF || '').toLowerCase().trim();
    if (cityF !== 'ALL') filtered = filtered.filter(r => r.city === cityF);
    if (typeF !== 'all') filtered = filtered.filter(r => typeF === 'ppmc' ? (r.type||'').toLowerCase().includes('ppmc') : !(r.type||'').toLowerCase().includes('ppmc'));
    if (reasonF !== 'ALL') filtered = filtered.filter(r => { if (reasonF === "On Time") return r.reason === "On Time"; if (reasonF === "Late") return r.reason === "Late"; return true; });
    if (searchF) filtered = filtered.filter(r => (r.bId||'').toLowerCase().includes(searchF) || (r.name||'').toLowerCase().includes(searchF) || (r.remarks||'').toLowerCase().includes(searchF));
    let deduplicated = [], seen = new Set();
    filtered.slice().reverse().forEach(r => { let dupKey = r.bId; if (!dupKey || dupKey === "-" || dupKey === "--" || dupKey === "No ID") dupKey = r.name + "_" + r.city; if (!seen.has(dupKey)) { seen.add(dupKey); deduplicated.push(r); }});
    filtered = deduplicated.reverse();
    let csv = "City,Date,Partner Type,Booking ID,Patient Name,Initial Sub Time,Booking Creation Time,Report Shared Time,Status,TAT,Remarks\n";
    const esc = (t) => `"${(t || "").toString().replace(/"/g, '""')}"`;
    filtered.forEach(r => { csv += [esc(r.city), esc(r.dateFormatted), esc(r.type), esc(r.bId), esc(r.name), esc(r.subTime), esc(r.latestSubTime), esc(r.shareTime), esc(r.reason), esc(r.tat), esc(r.remarks)].join(",") + "\n"; });
    return csv;
  }

  function downloadCsvReport(startStr, endStr, cityFilter) {
    const ss = SpreadsheetApp.openById(OLD_SHEET_ID), allSheets = ss.getSheets();
    let start = startStr ? new Date(startStr) : getISTDate();
    let end = endStr ? new Date(endStr) : getISTDate();
    start.setHours(0,0,0,0); end.setHours(23,59,59,999);
    let csv = "City,Date,Booking ID,Request IDs,Patient Name,Age,Gender,FBS/RBS,Partner Type,Package Name/Test Details,Barcode No,Collection Timing,Phlebo Name,Phlebo Mobile,Location,Initial Submission time,Booking creation Time,Status,Remarks,Report shared timing\n";
    let groupedData = {};

    allSheets.forEach(sheet => {
      const sheetName = sheet.getName(); if (cityFilter !== "ALL" && sheetName !== cityFilter) return;
      if (['Dashboard', 'Master Data', 'Instructions', 'Dropdowns', 'Pending List', 'Comments_DB'].includes(sheetName)) return;
      const lastRow = sheet.getLastRow(); if (lastRow < 2) return;
      
      const colMap = getColumnMap(sheet);
      if(colMap.lastCol === 0) return;
      const data = sheet.getRange(2, 1, lastRow - 1, colMap.lastCol).getDisplayValues(); 

      const val = (rowArr, idx) => idx > -1 && rowArr[idx] ? rowArr[idx].toString().trim() : "";

      data.forEach((row, i) => {
        let bId = val(row, colMap.bookingId);
        let rId = val(row, colMap.reqId);
        let name = val(row, colMap.name);

        let cleanId = bId.toLowerCase().replace(/\s+/g, '');
        if (!rId && !name && !bId) return;
        if (cleanId.includes("notcollect") || cleanId.includes("cancel") || cleanId.includes("reject") || cleanId.includes("bloodnot")) return;
        
        let dateStr = val(row, colMap.date);
        let rDate = parseRowDate(dateStr);
        if (rDate >= start && rDate <= end) {
          let uniqueKey = bId || (rId ? "REQ_" + rId : "UNKN_" + sheetName + "_" + i);
          let test = val(row, colMap.test);
          
          if (!groupedData[uniqueKey]) {
            groupedData[uniqueKey] = { 
                city: sheetName, date: dateStr, bId: bId, rIds: [rId], name: name, age: val(row, colMap.age), 
                gender: val(row, colMap.gender), fbs: val(row, colMap.fbs), type: val(row, colMap.type), 
                tests: [test], barcode: val(row, colMap.barcode), colTime: cleanTimeStr(val(row, colMap.colTime)), 
                phlebo: val(row, colMap.phlebo), phone: val(row, colMap.phleboMobile), loc: val(row, colMap.location),
                subTime: cleanTimeStr(val(row, colMap.subTime)), latestSubTime: cleanTimeStr(val(row, colMap.creatTime)), 
                status: val(row, colMap.status), remarks: val(row, colMap.remarks), shareTime: cleanTimeStr(val(row, colMap.shareTime)) 
            };
          } else {
            if (rId && !groupedData[uniqueKey].rIds.includes(rId)) groupedData[uniqueKey].rIds.push(rId);
            if (test && !groupedData[uniqueKey].tests.includes(test)) groupedData[uniqueKey].tests.push(test);
          }
        }
      });
    });
    
    const esc = (t) => `"${(t || "").toString().replace(/"/g, '""')}"`;
    Object.values(groupedData).forEach(item => { 
        csv += [esc(item.city), esc(item.date), esc(item.bId), esc(item.rIds.filter(Boolean).join(", ")), esc(item.name), esc(item.age), esc(item.gender), esc(item.fbs), esc(item.type), esc(item.tests.filter(Boolean).join(" | ")), esc(item.barcode), esc(item.colTime), esc(item.phlebo), esc(item.phone), esc(item.loc), esc(item.subTime), esc(item.latestSubTime), esc(item.status), esc(item.remarks), esc(item.shareTime)].join(",") + "\n"; 
    });
    return csv;
  }
  // ==========================================================================
  // 9. E-MAIL GENERATOR (SUPER FAST & ULTRA FLEXIBLE MATCH)
  // ==========================================================================
  function createCityEmailDraft(city, finalSubject, finalHtmlBody, toEmails, ccEmails, bIdsArray) {
    let draftStatus = "";
    try {
      // Frontend se jo subject aata hai, usme se Date aur City nikal lenge
      // Format expected: "Medibuddy Sample Drop Off || 21st March || Kolkata"
      let parts = finalSubject.split("||").map(p => p.trim());
      let dateStr = parts.length > 1 ? parts[1] : "";
      let cityStr = parts.length > 2 ? parts[2] : city;

      // 🚀 THE MAGIC QUERY: Gmail ko bolenge ki subject mein 
      // "medibuddy", "drop", city, aur date dhoondho (baaki words ignore karo)
      let searchQuery = `subject:(medibuddy drop) subject:"${cityStr}" subject:"${dateStr}"`;
      
      // Sirf top 3 latest mails layega (Lightning Fast)
      let threads = GmailApp.search(searchQuery, 0, 3);
      
      let exactThread = null;
      
      // Cross-verify karenge ki ye 4 words sach mein subject mein hain ya nahi (Case Insensitive)
      for (let i = 0; i < threads.length; i++) {
          let threadSub = threads[i].getFirstMessageSubject().toLowerCase();
          
          if (threadSub.includes("medibuddy") && 
              threadSub.includes("drop") && 
              threadSub.includes(cityStr.toLowerCase()) && 
              threadSub.includes(dateStr.toLowerCase())) {
              
              exactThread = threads[i];
              break; // Sahi mail milte hi loop band
          }
      }
      
      if (exactThread) {
          // Purani mail mil gayi (format kaisa bhi ho), usi mein Reply All karega
          exactThread.createDraftReplyAll('', { htmlBody: finalHtmlBody });
          draftStatus = `Reply All Draft created in existing ${cityStr} thread!`;
      } else {
          // Agar mail sach mein nahi mili, toh hi fresh draft banayega
          GmailApp.createDraft(toEmails, finalSubject, '', { htmlBody: finalHtmlBody, cc: ccEmails });
          draftStatus = `New Draft Created specifically for ${cityStr}!`;
      }
    } catch(e) { return "Error creating draft: " + e.message; }
    
    try {
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      let sheet = ss.getSheetByName("Comments_DB");
      if (!sheet) {
          sheet = ss.insertSheet("Comments_DB");
          sheet.appendRow(["Timestamp", "Booking/Req ID", "User", "Log/Comment", "", "Booking ID (Mail)", "Mail Status"]);
      }
      let lr = Math.max(sheet.getLastRow(), 1);
      let writeData = bIdsArray.map(id => [id, "Sent"]);
      if (writeData.length > 0) {
          sheet.getRange(lr + 1, 6, writeData.length, 2).setValues(writeData);
      }
    } catch(e) { return `Mail generated check your mail draft. Note: Auto-update failed (${e.message}).`; }
    
    return `Mail generated! Check your drafts! 🚀\n(${draftStatus})`;
  }
  // =========================================================
  // 10. AUTO-TRACKER & TIMESTAMP (FIXED FAST ONEDIT)
  // =========================================================
  function onEdit(e) {
    if (!e || !e.range) return; 
    
    const range = e.range;
    const sheet = range.getSheet();
    const sheetName = sheet.getName();
    
    const targetSheets = [
      "Delhi NCR", "Mumbai", "Lucknow", "Kolkata", 
      "Chandigarh", "Jaipur", "Chennai", "Kanpur", "Delhi"
    ];
    
    if (!targetSheets.includes(sheetName)) return;

    const startRow = range.getRow();
    if (startRow === 1) return;

    const lastCol = sheet.getLastColumn();
    if (lastCol === 0) return; 

    const map = getColumnMap(sheet);
    const numRows = range.getNumRows();
    
    // Kis column mein edit hua?
    const startCol = range.getColumn();
    const endCol = startCol + range.getNumColumns() - 1;
    const isColEdited = (colNum) => colNum >= startCol && colNum <= endCol;

    const data = sheet.getRange(startRow, 1, numRows, lastCol).getValues();
    
    const now = new Date();
    const timeFormat = "hh:mm:ss AM/PM";
    const dateFormat = "M/d/yyyy"; 

    const COL_DATE         = map.date > -1 ? map.date + 1 : null;
    const COL_INITIAL_TIME  = map.subTime > -1 ? map.subTime + 1 : null;
    const COL_BOOKING_TIME  = map.creatTime > -1 ? map.creatTime + 1 : null;
    const COL_REPORT_TIME   = map.shareTime > -1 ? map.shareTime + 1 : null;
    const COL_REPORT_STATUS = map.status > -1 ? map.status + 1 : null;
    const COL_BOOKING_ID    = map.bookingId > -1 ? map.bookingId + 1 : null;

    const autoCols = [COL_DATE, COL_INITIAL_TIME, COL_BOOKING_TIME, COL_REPORT_TIME].filter(c => c !== null);

    let allowDateUpdate = false;
    for (let c = startCol; c <= endCol; c++) {
      if (!autoCols.includes(c)) { allowDateUpdate = true; break; }
    }

    const allowInitialUpdate = (map.reqId > -1 && map.name > -1 && map.test > -1 && map.type > -1 && map.colTime > -1) ?
      [map.reqId + 1, map.name + 1, map.test + 1, map.type + 1, map.colTime + 1].some(isColEdited) : false;

    const allowBookingUpdate = COL_BOOKING_ID ? isColEdited(COL_BOOKING_ID) : false;
    const allowReportUpdate = COL_REPORT_STATUS ? isColEdited(COL_REPORT_STATUS) : false;

    const datesToWrite = [];
    const initialToWrite = [];
    const bookingToWrite = [];
    const reportToWrite = [];

    let updateDateCol = false, updateInitialCol = false, updateBookingCol = false, updateReportCol = false;

    for (let i = 0; i < numRows; i++) {
      const rowData = data[i]; 
      
      let currentValDate = COL_DATE ? rowData[COL_DATE - 1] : "";
      let currentValInitial = COL_INITIAL_TIME ? rowData[COL_INITIAL_TIME - 1] : "";
      let currentValBooking = COL_BOOKING_TIME ? rowData[COL_BOOKING_TIME - 1] : "";
      let currentValReport = COL_REPORT_TIME ? rowData[COL_REPORT_TIME - 1] : "";

      let hasUserData = false;
      for (let j = 0; j < lastCol; j++) {
        const currentColumnNumber = j + 1;
        if (!autoCols.includes(currentColumnNumber) && String(rowData[j]).trim() !== "") {
          hasUserData = true; break;
        }
      }

      if (!hasUserData) {
        if (COL_DATE && String(currentValDate).trim() !== "") { currentValDate = ""; updateDateCol = true; }
        if (COL_INITIAL_TIME && String(currentValInitial).trim() !== "") { currentValInitial = ""; updateInitialCol = true; }
        if (COL_BOOKING_TIME && String(currentValBooking).trim() !== "") { currentValBooking = ""; updateBookingCol = true; }
        if (COL_REPORT_TIME && String(currentValReport).trim() !== "") { currentValReport = ""; updateReportCol = true; }
      } else {
        if (allowDateUpdate && COL_DATE && (!currentValDate || String(currentValDate).trim() === "")) {
          currentValDate = now; updateDateCol = true;
        }
        if (allowInitialUpdate && COL_INITIAL_TIME) {
          const isInitialComplete = [map.reqId + 1, map.name + 1, map.test + 1, map.type + 1, map.colTime + 1].every(col => {
            const val = rowData[col - 1]; return val !== "" && val !== null && typeof val !== 'undefined';
          });
          if (isInitialComplete && (!currentValInitial || String(currentValInitial).trim() === "")) {
            currentValInitial = now; updateInitialCol = true;
          }
        }
        if (allowBookingUpdate && COL_BOOKING_TIME && COL_BOOKING_ID) {
          const bookingIdVal = rowData[COL_BOOKING_ID - 1];
          if (bookingIdVal && String(bookingIdVal).trim() !== "") {
            if (!currentValBooking || String(currentValBooking).trim() === "") {
              currentValBooking = now; updateBookingCol = true;
            }
          }
        }
        if (allowReportUpdate && COL_REPORT_TIME && COL_REPORT_STATUS) {
          const statusVal = String(rowData[COL_REPORT_STATUS - 1] || "").trim().toLowerCase();
          if (statusVal === "shared") {
            if (!currentValReport || String(currentValReport).trim() === "") {
              currentValReport = now; updateReportCol = true;
            }
          }
        }
      }
      datesToWrite.push([currentValDate]); initialToWrite.push([currentValInitial]);
      bookingToWrite.push([currentValBooking]); reportToWrite.push([currentValReport]);
    }

    if (updateDateCol && COL_DATE) sheet.getRange(startRow, COL_DATE, numRows, 1).setValues(datesToWrite).setNumberFormat(dateFormat);
    if (updateInitialCol && COL_INITIAL_TIME) sheet.getRange(startRow, COL_INITIAL_TIME, numRows, 1).setValues(initialToWrite).setNumberFormat(timeFormat);
    if (updateBookingCol && COL_BOOKING_TIME) sheet.getRange(startRow, COL_BOOKING_TIME, numRows, 1).setValues(bookingToWrite).setNumberFormat(timeFormat);
    if (updateReportCol && COL_REPORT_TIME) sheet.getRange(startRow, COL_REPORT_TIME, numRows, 1).setValues(reportToWrite).setNumberFormat(timeFormat);
    
    // 🚀 NAYA: Sheet me kuch bhi edit hote hi turant dashboard refresh karo!
    notifyDashboards();
  }
  // =========================================================
  // 🤖 API BOOKING AUTO-MATCH (EXTRA BOOKINGS & CSV DUPLICATES)
  // =========================================================
  function backendApiAutoMatch(csvText) {
    try {
      let data = Utilities.parseCsv(csvText);
      if (!data || data.length < 2) throw new Error("CSV is empty or invalid.");

      let headers = data[0].map(h => String(h).trim().toLowerCase());
      let agentIdx = headers.indexOf("agent");
      let nameIdx = headers.findIndex(h => h === "name" || h === "patient name" || h === "patientname");
      let bidIdx = headers.findIndex(h => h === "booking id" || h === "bookingid");
      let reqIdx = headers.findIndex(h => h === "appointmentid" || h === "request id" || h === "client ref id" || h === "ref id");
      let cityIdx = headers.indexOf("city");
      let ageIdx = headers.findIndex(h => h === "age" || h === "patient age" || h === "patientage");
      let genderIdx = headers.findIndex(h => h === "gender" || h === "patient gender" || h === "sex");
      // 🔴 NAYA: Booking Time Column dhoondhna
      let timeIdx = headers.findIndex(h => h.includes("booking time") || h.includes("creation time"));

      if (agentIdx === -1 || nameIdx === -1 || bidIdx === -1) throw new Error("Invalid CSV format. Need Agent, Name, and Booking ID.");

      const salutationRegex = /^(mr\.|mrs\.|ms\.|dr\.|master|miss|baby|b\/o|s\/o|d\/o|mr|mrs|ms|dr)\s+/i;
      
      let resultObj = { apiCount: 0, manualCount: 0, alreadyFilled: 0, retroFlagged: 0, newlyFilled: 0, duplicates: [], notFound: [] };
      let csvPatients = {};

      // 1. READ ALL CSV DATA & GROUP BY NAME
      for (let i = 1; i < data.length; i++) {
          let rawName = data[i][nameIdx] ? String(data[i][nameIdx]).trim() : "";
          let bid = data[i][bidIdx] ? String(data[i][bidIdx]).trim() : "";
          if (!rawName || !bid) continue;

          let agent = data[i][agentIdx] ? String(data[i][agentIdx]).trim() : "Unknown";
          let req = (reqIdx > -1 && data[i][reqIdx]) ? String(data[i][reqIdx]).trim() : "";
          let city = (cityIdx > -1 && data[i][cityIdx]) ? String(data[i][cityIdx]).trim() : "Unknown";
          let age = (ageIdx > -1 && data[i][ageIdx]) ? String(data[i][ageIdx]).trim() : "-";
          let gender = (genderIdx > -1 && data[i][genderIdx]) ? String(data[i][genderIdx]).trim() : "-";
          let bTime = (timeIdx > -1 && data[i][timeIdx]) ? String(data[i][timeIdx]).trim() : "-";

          let isApi = agent.toUpperCase().includes("APIUSER") || agent.toUpperCase().includes("API_USER");
          if (isApi) resultObj.apiCount++; else resultObj.manualCount++;

          let cleanName = rawName.toLowerCase().replace(salutationRegex, '').trim();

          if (!csvPatients[cleanName]) csvPatients[cleanName] = [];
          csvPatients[cleanName].push({ rawName, cleanName, bid, req, city, age, gender, agent, bTime, isApi });
      }

      let validApiBookings = [];

      // 2. FIND CSV DUPLICATES (1 Name, 2 Different IDs)
      for (let cleanName in csvPatients) {
          let bookings = csvPatients[cleanName];
          let uniqueBids = [...new Set(bookings.map(b => b.bid))];

          if (uniqueBids.length > 1) {
              // Customer has multiple booking IDs! Bhej do UI me.
              bookings.forEach(b => {
                  resultObj.duplicates.push({ rawName: b.rawName, bid: b.bid, agent: b.agent, time: b.bTime });
              });
              resultObj.duplicates.push({ isSeparator: true }); // Line break in UI
          } else {
              // Unique Booking ID for this name
              let firstBooking = bookings[0];
              if (firstBooking.isApi) validApiBookings.push(firstBooking);
          }
      }

      // 3. CHECK SHEET FOR VALID API BOOKINGS
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      const allSheets = ss.getSheets();
      const ignoreSheets = ['Dashboard', 'Master Data', 'Instructions', 'Pending List', 'Dropdowns', 'Comments_DB'];
      let commentSheet = ss.getSheetByName('Comments_DB');

      let apiMatchedSet = new Set();
      if (commentSheet) {
          let lastR = commentSheet.getLastRow();
          if (lastR > 1) {
              let cData = commentSheet.getRange(2, 1, lastR - 1, Math.min(commentSheet.getLastColumn(), 4)).getValues();
              for (let i = 0; i < cData.length; i++) {
                  if (String(cData[i][3]).includes("[API-MATCHED]")) apiMatchedSet.add(String(cData[i][1]).trim());
              }
          }
      }

      let existingIds = {}; let blankIdRows = [];

      for (let sheet of allSheets) {
          if (ignoreSheets.includes(sheet.getName())) continue;
          const map = getColumnMap(sheet);
          if (!map || map.name === -1 || map.bookingId === -1) continue;
          
          const lastRow = sheet.getLastRow(); if (lastRow < 2) continue;
          const sheetData = sheet.getRange(1, 1, lastRow, map.lastCol).getValues();

          for (let i = 1; i < sheetData.length; i++) {
              let bId = sheetData[i][map.bookingId] ? String(sheetData[i][map.bookingId]).trim() : "";
              if (bId && bId !== "--") {
                  existingIds[bId] = true;
              } else {
                  let cleanName = String(sheetData[i][map.name] || "").toLowerCase().replace(salutationRegex, '').trim();
                  let reqId = map.reqId > -1 ? String(sheetData[i][map.reqId] || "").trim() : "";
                  if (cleanName || reqId) blankIdRows.push({ sheet: sheet, rowIdx: i + 1, map: map, cleanName: cleanName, reqId: reqId });
              }
          }
      }

      // 4. FILL EMPTY ROWS SAFELY
      for (let api of validApiBookings) {
          if (existingIds[api.bid]) {
              resultObj.alreadyFilled++;
              if (!apiMatchedSet.has(api.bid)) {
                  if (commentSheet) commentSheet.appendRow([Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss"), api.bid, "System", "[API-MATCHED] Retroactively marked via Match Tool"]);
                  apiMatchedSet.add(api.bid);
                  resultObj.retroFlagged++;
              }
              continue;
          }

          let filledCount = 0;
          // Loop backwards so splicing doesn't break index
          for (let j = blankIdRows.length - 1; j >= 0; j--) {
              let match = blankIdRows[j];
              let isReqMatch = (api.req && match.reqId === api.req);
              let isNameMatch = (!isReqMatch && match.cleanName === api.cleanName);

              if (isReqMatch || isNameMatch) {
                  // 🟢 100% SAFE FILL: Sirf Booking ID, NO DROPDOWNS TOUCHED!
                  match.sheet.getRange(match.rowIdx, match.map.bookingId + 1).setValue(api.bid);
                  filledCount++;
                  blankIdRows.splice(j, 1);
              }
          }

          if (filledCount > 0) {
              if (!apiMatchedSet.has(api.bid)) {
                  if(commentSheet) commentSheet.appendRow([Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss"), api.bid, "System", "[API-MATCHED] Auto-filled via Match Tool"]);
                  apiMatchedSet.add(api.bid);
              }
              resultObj.newlyFilled++;
          } else {
              resultObj.notFound.push(api); // EXTRA BOOKINGS
          }
      }

      return JSON.stringify(resultObj);
    } catch (error) { throw new Error(error.message); }
  }
  function testMyAI() {
    let result = aiStructureTests("CBC, LFT, KFT, Urine Routine, TSH");
    Logger.log("AI ka Jawab: " + result);
  }
  // =========================================================
  // 🟢 NAYA: MARK ALREADY MAILED (NO DRAFT CREATION)
  // =========================================================
  function markMailsAsSentDB(bIdsArray) {
      if (!bIdsArray || bIdsArray.length === 0) return "No IDs provided.";
      
      try {
          const ss = SpreadsheetApp.openById(OLD_SHEET_ID); // Aapki sheet id use ho rahi hai
          let sheet = ss.getSheetByName("Comments_DB");
          
          if (!sheet) {
              sheet = ss.insertSheet("Comments_DB");
              sheet.appendRow(["Timestamp", "Booking/Req ID", "User", "Log/Comment", "", "Booking ID (Mail)", "Mail Status"]);
          }
          
          let lr = Math.max(sheet.getLastRow(), 1);
          
          // Data format: [BookingID, "Sent"]
          let writeData = bIdsArray.map(id => [id, "Sent"]);
          
          // Column 6 (F) aur 7 (G) me sidha paste karega
          sheet.getRange(lr + 1, 6, writeData.length, 2).setValues(writeData);
          
          return "List cleared! Data marked as 'Already Mailed'.";
      } catch(e) {
          return "Backend Error: " + e.message;
      }
  }
  // =========================================================
  // 🚀 SHEET-TO-DASHBOARD REALTIME PING (DUAL-SIGNAL ENGINE)
  // =========================================================
  function notifyDashboards() {
    try {
      var FIREBASE_SECRET = "e7tyFPQijOcB0uikRUei5kWbdxjLElWvabW1wVuU"; 
      var baseUrl = "https://redcliffelabsxmedibuddy-default-rtdb.firebaseio.com/";
      var nowTs = new Date().getTime();
      
      var putOptions = {
        "method": "put",
        "contentType": "application/json",
        "muteHttpExceptions": true
      };
      
      // SIGNAL 1: Timestamp update (triggers last_update listener on all dashboards)
      putOptions.payload = JSON.stringify(nowTs);
      UrlFetchApp.fetch(baseUrl + "global_sync/last_update.json?auth=" + FIREBASE_SECRET, putOptions);
      
      // SIGNAL 2: Action update (triggers latest_action listener — instant KPI refresh)
      putOptions.payload = JSON.stringify({
        type: "DATA_CHANGED",
        rid: "",
        status: "",
        user: "SYSTEM",
        timestamp: nowTs
      });
      UrlFetchApp.fetch(baseUrl + "global_sync/latest_action.json?auth=" + FIREBASE_SECRET, putOptions);
      
    } catch(e) {
      console.error("Firebase Sync Error: ", e);
    }
  }
  // =========================================================================
  // 🟢 GEMINI AI BULK TRF PROCESSOR - 3-KEY TURBO ENGINE 🚀
  // =========================================================================
  const TRF_FOLDER_ID = "1u6_cu5fevpW_4mjAGsos29WnFz5E7fvz"; // Aapka Folder ID

  // =========================================================================
  // 🚀 TWO-STEP TURBO ENGINE: STEP 1 (ONLY AI ANALYSIS)
  // =========================================================================
  function analyzeTrfImage(base64Data) {
      try {
          const aiData = extractDataFromTrf(base64Data);
          if (aiData.error) return { status: "Error", message: aiData.message };
          return { status: "Success", data: aiData };
      } catch (e) {
          return { status: "Error", message: "System Crash: " + e.toString() };
      }
  }

  // =========================================================================
  // 🚀 THE MAGIC: SELF-HEALING MULTI-KEY ROTATOR (Bypasses Bad Keys)
  // =========================================================================
  function extractDataFromTrf(base64Image) {
    const props = PropertiesService.getScriptProperties();
    const cache = CacheService.getScriptCache();
    
    let apiKeys = [
        props.getProperty("GEMINI_API_KEY"),
        props.getProperty("GEMINI_API_KEY2"),
        props.getProperty("GEMINI_API_KEY3")
    ].filter(key => key && key.trim() !== ""); 

    if (apiKeys.length === 0) return { error: true, message: "No API keys found in properties!" };

    let startIndex = parseInt(cache.get("LAST_KEY_IDX") || "0");
    if (isNaN(startIndex) || startIndex >= apiKeys.length) startIndex = 0;

    const prompt = `Extract exact fields: "barcode", "name", "age", "gender", "sugar" (FBS/RBS/NA), "colTime", "isCertain", "unreadableFields". OUTPUT ONLY VALID JSON. Do not use markdown formatting.`;

    const payload = {
      "contents": [{ "parts": [ { "text": prompt }, { "inline_data": { "mime_type": "image/jpeg", "data": base64Image } } ] }],
      "generationConfig": { "temperature": 0.1 } // Removed response_mime_type to stop 400 Bad Request errors
    };

    const options = { "method": "POST", "contentType": "application/json", "payload": JSON.stringify(payload), "muteHttpExceptions": true };
    let lastErrorMsg = "";

    for (let attempt = 0; attempt < apiKeys.length * 2; attempt++) {
        if (apiKeys.length === 0) break;
        let currIdx = (startIndex + attempt) % apiKeys.length;
        let currentKey = apiKeys[currIdx];
        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${currentKey}`;
        
        try {
            const response = UrlFetchApp.fetch(url, options);
            const responseCode = response.getResponseCode();
            const jsonResult = JSON.parse(response.getContentText());
            
            if (responseCode !== 200 || jsonResult.error) {
                let errMsg = jsonResult.error ? (jsonResult.error.message || "") : "HTTP " + responseCode;
                lastErrorMsg = errMsg;
                
                if (errMsg.includes("API key not valid") || responseCode === 403 || errMsg.includes("Permission denied")) {
                    apiKeys.splice(currIdx, 1); 
                    attempt--; 
                    continue; 
                }
                Utilities.sleep(1500); // 1.5s wait before trying next key
                continue; 
            }

            if (!jsonResult.candidates || !jsonResult.candidates[0] || !jsonResult.candidates[0].content) {
                lastErrorMsg = "Image blocked by Safety Filters.";
                continue;
            }

            // Save next key for next image
            cache.put("LAST_KEY_IDX", ((currIdx + 1) % apiKeys.length).toString(), 21600);

            let rawText = jsonResult.candidates[0].content.parts[0].text;
            let match = rawText.match(/\{[\s\S]*\}/);
            if (!match) throw new Error("AI did not return valid JSON");
            
            return JSON.parse(match[0]);

        } catch (e) {
            lastErrorMsg = e.message;
            Utilities.sleep(1000); 
            continue; 
        }
    }
    return { error: true, message: "AI Failed: " + lastErrorMsg };
  }
  // =========================================================================
  // 🟢 GET PENDING TRFS API
  // =========================================================================
  function getPendingTRFs() {
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      let dbSheet = ss.getSheetByName("Comments_DB");
      if (!dbSheet) return JSON.stringify([]);

      let lastRow = dbSheet.getLastRow();
      if (lastRow < 2) return JSON.stringify([]);

      let maxCols = Math.min(dbSheet.getLastColumn(), 7);
      let data = dbSheet.getRange(2, 1, lastRow - 1, maxCols).getDisplayValues();
      let result = [];
      
      for (let i = data.length - 1; i >= 0; i--) {
          if (data[i][1] === "WAITING_TRF" && maxCols >= 7 && data[i][6] === "Pending") {
              let info = data[i][3] || "";
              let nMatch = info.match(/Name:\s([^|]+)/);
              let aMatch = info.match(/Age:\s([^|]+)/);
              let gMatch = info.match(/Gender:\s([^|]+)/);
              let bMatch = info.match(/Barcode:\s([^|]+)/);

              result.push({
                  rowId: i + 2, time: data[i][0],
                  name: nMatch ? nMatch[1].trim() : "Unknown",
                  age: aMatch ? aMatch[1].trim() : "N/A",
                  gender: gMatch ? gMatch[1].trim() : "N/A",
                  barcode: bMatch ? bMatch[1].trim() : "N/A",
                  link: maxCols >= 6 ? data[i][5] : ""
              });
          }
      }
      return JSON.stringify(result);
  }

  // =========================================================================
  // 🟢 LOG SAVER
  // =========================================================================
  function saveLinkToCommentsDB(bookingId, trfLink, filledItems = [], doubtFields = []) {
    const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
    let dbSheet = ss.getSheetByName("Comments_DB");
    if (!dbSheet) {
        dbSheet = ss.insertSheet("Comments_DB");
        dbSheet.appendRow(["Timestamp", "Booking/Req ID", "User", "Log/Comment", "", "Booking ID (Mail)", "Mail Status"]);
    }

    let logMsg = "TRF Auto-Attached via AI.";
    if (filledItems && filledItems.length > 0) logMsg += ` [AI-AUTO] Filled: ${filledItems.join(", ")}.`;
    if (doubtFields && doubtFields.length > 0) logMsg += ` [AI-DOUBT] Unreadable: ${doubtFields.join(", ")}.`;

    dbSheet.appendRow([Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss"), bookingId, "System", logMsg, "", trfLink, "Attached"]);
  }

  // =========================================================================
  // 🟢 MANUAL TRF UPLOAD & DELETE (FALLBACK TOOLS)
  // =========================================================================
  function manualAttachTRF(city, rid, base64Data, mimeType) {
      const folder = DriveApp.getFolderById(TRF_FOLDER_ID);
      const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, "Manual_TRF_" + rid + ".jpg");
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      const sheet = SpreadsheetApp.openById(OLD_SHEET_ID).getSheetByName(city);
      let headers = sheet.getDataRange().getValues()[0].map(h => String(h).toLowerCase().trim());
      let trfColIdx = headers.findIndex(h => h === "trf link" || h === "trf" || h === "trf_link");
      if(trfColIdx === -1) { trfColIdx = headers.length; sheet.getRange(1, trfColIdx + 1).setValue("TRF Link"); }
      
      sheet.getRange(rid, trfColIdx + 1).setValue(file.getUrl()); 
      return "✅ TRF Manually Attached!";
  }

  function removeTRFLink(city, rid) {
      const sheet = SpreadsheetApp.openById(OLD_SHEET_ID).getSheetByName(city);
      let headers = sheet.getDataRange().getValues()[0].map(h => String(h).toLowerCase().trim());
      let trfColIdx = headers.findIndex(h => h === "trf link" || h === "trf" || h === "trf_link");
      if(trfColIdx > -1) sheet.getRange(rid, trfColIdx + 1).setValue(""); 
      return "🗑️ TRF Link Removed!";
  }

  // =========================================================================
  // ⏱️ BACKGROUND BOT: AUTO-SYNC WAITING ROOM (EVERY 5 MIN)
  // =========================================================================
  function createPendingTrfTrigger() {
    const triggers = ScriptApp.getProjectTriggers();
    for (let t of triggers) {
      if (t.getHandlerFunction() === 'autoProcessPendingTRFs') {
        ScriptApp.deleteTrigger(t);
      }
    }
    ScriptApp.newTrigger('autoProcessPendingTRFs').timeBased().everyMinutes(5).create();
    Logger.log("✅ 5-Minute Auto-Sync Trigger Activated!");
  }

  function autoProcessPendingTRFs() {
    const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
    const dbSheet = ss.getSheetByName("Comments_DB");
    if (!dbSheet) return;

    const lastRow = dbSheet.getLastRow();
    if (lastRow < 2) return;

    const dbData = dbSheet.getRange(2, 1, lastRow - 1, 7).getValues();
    
    // 🚀 FAST EXIT: Check if there is any pending TRF before scanning sheets
    let hasPending = false;
    for (let i = 0; i < dbData.length; i++) {
        if (dbData[i][1] === "WAITING_TRF" && dbData[i][6] === "Pending") {
            hasPending = true;
            break;
        }
    }
    
    // Agar waiting room khaali hai, toh turant function band! (Saves RAM & Quota)
    if (!hasPending) return; 

    const excludedSheets = ["Dashboard", "Master Data", "Dropdowns", "Instructions", "Pending List", "Comments_DB"];

    let d = new Date();
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    let todayIST = new Date(utc + (3600000 * 5.5));
    todayIST.setHours(0,0,0,0);

    let allSheetData = [];
    for (let sheet of ss.getSheets()) {
        if (excludedSheets.includes(sheet.getName())) continue;
        
        let sLastRow = sheet.getLastRow();
        if (sLastRow < 2) continue;
        
        // 🚀 SPEED FIX: Poori sheet ki jagah sirf aakhri 1000 rows fetch karega (Crash Proof)
        let fetchLimit = 1000;
        let startR = Math.max(2, sLastRow - fetchLimit + 1);
        let numR = sLastRow - startR + 1;
        
        let data = sheet.getRange(startR, 1, numR, sheet.getLastColumn()).getValues();
        let headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(h => String(h).toLowerCase().trim());
        
        // rowOffset yaad rakhega taaki baad me sahi row par link paste ho sake
        allSheetData.push({sheet: sheet, data: data, headers: headers, rowOffset: startR - 1});
    }

    for (let i = 0; i < dbData.length; i++) {
        if (dbData[i][1] === "WAITING_TRF" && dbData[i][6] === "Pending") {
            let info = String(dbData[i][3]);
            let trfLink = String(dbData[i][5]);
            let dbRowIndex = i + 2;

            let nMatch = info.match(/Name:\s([^|]+)/);
            let aMatch = info.match(/Age:\s([^|]+)/);
            let gMatch = info.match(/Gender:\s([^|]+)/);
            let bMatch = info.match(/Barcode:\s([^|]+)/);

            let aiName = nMatch ? nMatch[1].trim() : "";
            let aiAge = aMatch ? aMatch[1].trim() : "";
            let aiGender = gMatch ? gMatch[1].trim() : "";
            let aiBarcode = bMatch ? bMatch[1].trim() : "";

            if(aiName === "N/A" || aiName === "Unknown") aiName = "";
            let matchFound = false;

            for(let sInfo of allSheetData) {
                let cDate = sInfo.headers.findIndex(h => h === "date" || h.includes("date"));
                let cId = sInfo.headers.findIndex(h => h.includes("booking id") || h.includes("ids"));
                let cName = sInfo.headers.findIndex(h => h.includes("name") || h.includes("patient"));
                let cAge = sInfo.headers.findIndex(h => h === "age" || h.includes("patient age"));
                let cGender = sInfo.headers.findIndex(h => h === "gender" || h === "sex");
                let cBarcode = sInfo.headers.findIndex(h => h === "barcode no" || h.includes("barcode"));
                let cTrf = sInfo.headers.findIndex(h => h === "trf link" || h === "trf" || h === "trf_link");
                let cRemarks = sInfo.headers.findIndex(h => h.includes("remarks"));

                if (cId === -1 || cName === -1) continue;

                for (let r = sInfo.data.length - 1; r >= 0; r--) {
                    let rowData = sInfo.data[r];
                    
                    if (cDate !== -1) {
                        let rowDateStr = String(rowData[cDate]).trim();
                        if (rowDateStr) {
                            let rDate = new Date(rowDateStr);
                            if (!isNaN(rDate.getTime())) {
                                rDate.setHours(0,0,0,0);
                                if ((todayIST.getTime() - rDate.getTime()) / (1000 * 3600 * 24) > 3) break;
                            }
                        }
                    }

                    let sBarcode = cBarcode !== -1 ? String(rowData[cBarcode]).toLowerCase().replace(/[^a-z0-9]/g, '') : "";
                    let sName = String(rowData[cName]).toLowerCase().trim();
                    
                    let cleanAiBarcode = aiBarcode.toLowerCase().replace(/[^a-z0-9]/g, '');
                    let isBarcodeMatch = (cleanAiBarcode && cleanAiBarcode !== "na" && sBarcode !== "" && sBarcode.includes(cleanAiBarcode));

                    let sNameClean = sName.replace(/^(mr\.|mrs\.|ms\.|dr\.|master|miss|baby)\s*/i, '').replace(/[^a-z0-9]/gi, '').trim();
                    let aiNameClean = aiName.toLowerCase().replace(/^(mr\.|mrs\.|ms\.|dr\.|master|miss|baby)\s*/i, '').replace(/[^a-z0-9]/gi, '').trim();
                    
                    if (isBarcodeMatch || (aiNameClean.length>3 && sNameClean.includes(aiNameClean))) {
                        matchFound = true;
                        let bId = rowData[cId];

                        if (cTrf === -1) { cTrf = sInfo.headers.length; sInfo.sheet.getRange(1, cTrf + 1).setValue("TRF Link"); }
                        
                        // 🚀 Exact row adjust kar diya taaki sahi jagah link paste ho
                        sInfo.sheet.getRange(r + 1 + sInfo.rowOffset, cTrf + 1).setValue(trfLink);

                        dbSheet.getRange(dbRowIndex, 2).setValue(bId); 
                        dbSheet.getRange(dbRowIndex, 7).setValue("Attached by Auto-Sync"); 
                        break; 
                    }
                }
                if (matchFound) break; 
            }
        }
    }
  }

  // =========================================================
  // 🟢 ON-DEMAND FULL TRF TEXT EXTRACTOR (OCR)
  // =========================================================
  function extractFullTextFromDriveLink(driveLink) {
    try {
      let fileIdMatch = driveLink.match(/[-\w]{25,}/);
      if (!fileIdMatch) return "Error: Invalid Drive Link";
      
      let base64Image = Utilities.base64Encode(DriveApp.getFileById(fileIdMatch[0]).getBlob().getBytes());
      const props = PropertiesService.getScriptProperties();
      // Yahan bhi fallback lag gaya!
      let key = props.getProperty("GEMINI_API_KEY") || props.getProperty("GEMINI_API_KEY2");

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      const payload = {
        "contents": [{ "parts": [ { "text": "Extract ALL text." }, { "inline_data": { "mime_type": "image/jpeg", "data": base64Image } } ] }],
        "generationConfig": { "temperature": 0.1 }
      };

      const response = UrlFetchApp.fetch(url, { "method": "POST", "contentType": "application/json", "payload": JSON.stringify(payload), "muteHttpExceptions": true });
      return JSON.parse(response.getContentText()).candidates[0].content.parts[0].text;
    } catch (e) {
      return "Error extracting text: " + e.message;
    }
  }

  // =========================================================
  // 🟢 WAITING ROOM MANUAL CONTROLS
  // =========================================================
  function deletePendingTRF(rowId) {
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      ss.getSheetByName("Comments_DB").getRange(rowId, 7).setValue("Deleted"); 
      return "TRF deleted successfully.";
  }

  function manualAttachPendingTRF(rowId, bookingId, link) {
      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      let isAttached = false;
      for (let sheet of ss.getSheets()) {
          if (["Dashboard", "Master Data", "Dropdowns", "Instructions", "Pending List", "Comments_DB"].includes(sheet.getName())) continue;
          let data = sheet.getDataRange().getValues();
          let cId = data[0].findIndex(h => String(h).toLowerCase().trim().includes("booking id"));
          let cTrf = data[0].findIndex(h => String(h).toLowerCase().trim().includes("trf link"));

          if (cId === -1) continue;

          for (let i = 1; i < data.length; i++) {
              if (String(data[i][cId]).trim().toLowerCase() === bookingId.toLowerCase()) {
                  if (cTrf === -1) { cTrf = data[0].length; sheet.getRange(1, cTrf + 1).setValue("TRF Link"); }
                  sheet.getRange(i + 1, cTrf + 1).setValue(link);
                  isAttached = true; break;
              }
          }
          if (isAttached) break;
      }

      if (isAttached) {
          ss.getSheetByName("Comments_DB").getRange(rowId, 2).setValue(bookingId); 
          ss.getSheetByName("Comments_DB").getRange(rowId, 7).setValue("Attached manually"); 
          return `TRF successfully attached!`;
      } 
      throw new Error(`Booking ID not found.`);
  }
  function askForDrivePermission() {
    DriveApp.getFiles();
  } // <--- YAHAN YE BRACKET MISSING THA!

  // =========================================================================
  // 🚀 ENTERPRISE: DYNAMIC TREND ANALYTICS (DATES + API VS MANUAL) - FIXED
  // =========================================================================
  function getTrendAnalyticsData(startStr, endStr) {
    try {
      const email = Session.getActiveUser().getEmail();
      const userData = getUserData(email);
      let allowedCities = userData && userData.cities && userData.cities.indexOf('all') === -1 ? userData.cities : ['all'];

      const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
      const allSheets = ss.getSheets();
      const ignoreSheets = ['Dashboard', 'Master Data', 'Instructions', 'Pending List', 'Dropdowns', 'Comments_DB', 'API_Not_Found'];

      // 1. Date Parsing
      let d = new Date();
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      let today = new Date(utc + (3600000 * 5.5));
      
      let start = startStr ? new Date(startStr) : new Date(today.getTime() - (29 * 86400000)); // Default 30 days
      let end = endStr ? new Date(endStr) : new Date(today.getTime());
      
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      let stats = {};
      let seenPatients = new Set(); 

      // 2. Setup Date Skeleton
      let tempDate = new Date(start.getTime());
      while(tempDate <= end) {
          let key = `${tempDate.getFullYear()}-${("0"+(tempDate.getMonth()+1)).slice(-2)}-${("0"+tempDate.getDate()).slice(-2)}`;
          stats[key] = {};
          tempDate.setDate(tempDate.getDate() + 1);
      }

      // 3. Advanced Tracking Structures
      let sankeyLinksMap = {}; // flows like Mumbai->PPMC, PPMC->API etc.
      let heatmapMap = {};    // [day][hour]
      let cityChildMap = {};   // {Mumbai: {PPMC: 10, Retail: 5}}
      
      let commentSheet = ss.getSheetByName('Comments_DB');
      let apiMatchedIds = new Set();
      if (commentSheet) {
          let cLastRow = commentSheet.getLastRow();
          if(cLastRow >= 2) {
              let cStartRow = Math.max(2, cLastRow - 3000);
              let cData = commentSheet.getRange(cStartRow, 1, cLastRow - cStartRow + 1, 4).getValues();
              for(let i=0; i<cData.length; i++) {
                  let logBId = String(cData[i][1]).trim();
                  if(logBId && String(cData[i][3]).includes("[API-MATCHED]")) apiMatchedIds.add(logBId);
              }
          }
      }

      // 4. Data Extraction Loop
      allSheets.forEach(sheet => {
          let city = sheet.getName();
          if (ignoreSheets.includes(city)) return;
          if (allowedCities[0] !== 'all' && allowedCities.indexOf(city) === -1) return;
          
          const lastRow = sheet.getLastRow(); if (lastRow < 2) return;
          const map = getColumnMap(sheet); if (map.lastCol === 0 || map.date === -1) return;

          let startR = Math.max(2, lastRow - 3000); 
          const data = sheet.getRange(startR, 1, lastRow - startR + 1, map.lastCol).getValues();

          data.forEach(row => {
              let dateVal = row[map.date];
              if(!dateVal) return;
              
              let rDate = new Date(0);
              let hour = 0;
              let dayOfWeek = 0;

              if (Object.prototype.toString.call(dateVal) === '[object Date]') {
                  rDate = new Date(dateVal.getTime());
              } else {
                  let dStr = String(dateVal).trim().split(" ")[0];
                  let parts = dStr.split(/[-/]/);
                  if (parts.length === 3) {
                      let p1 = parseInt(parts[0], 10), p2 = parseInt(parts[1], 10), p3 = parseInt(parts[2], 10);
                      if (p3 > 1000) rDate = p2 > 12 ? new Date(p3, p1 - 1, p2) : new Date(p3, p2 - 1, p1);
                      else if (p1 > 1000) rDate = new Date(p1, p2 - 1, p3);
                  } else {
                      let tempD = new Date(dStr); if (!isNaN(tempD.getTime())) rDate = tempD;
                  }
              }

              if (isNaN(rDate.getTime())) return;
              hour = rDate.getHours();
              dayOfWeek = rDate.getDay(); // 0-6

              let compareDate = new Date(rDate.getTime());
              compareDate.setHours(0,0,0,0);
              
              if (compareDate >= start && compareDate <= end) {
                  let dateKey = `${compareDate.getFullYear()}-${("0"+(compareDate.getMonth()+1)).slice(-2)}-${("0"+compareDate.getDate()).slice(-2)}`;
                  if(!stats[dateKey]) return;

                  let bId = map.bookingId > -1 && row[map.bookingId] ? String(row[map.bookingId]).trim() : "";
                  let reqId = map.reqId > -1 && row[map.reqId] ? String(row[map.reqId]).trim() : "";
                  let pName = map.name > -1 && row[map.name] ? String(row[map.name]).trim() : "";
                  let statusRaw = map.status > -1 && row[map.status] ? String(row[map.status]).trim().toLowerCase() : "";
                  let cleanId = bId.toLowerCase().replace(/\s+/g, '');
                  // ✅ FIX: Skip only explicitly cancelled/rejected IDs, NOT rows with empty booking ID
                  if (cleanId.includes("notcollect") || cleanId.includes("cancel") || cleanId.includes("reject")) return;
                  // Skip only if absolutely no identifier exists AND status is N/A
                  if (!bId && !reqId && !pName) return;
                  if (statusRaw === "na" || statusRaw === "n/a") return;

                  let uniqueId = bId || row[map.name] || row[map.reqId];
                  let dedupKey = `${dateKey}_${city}_${uniqueId}`;
                  if (seenPatients.has(dedupKey)) return;
                  seenPatients.add(dedupKey);

                  // Categories
                  let partnerRaw = map.type > -1 && row[map.type] ? String(row[map.type]).trim().toUpperCase() : "RETAIL";
                  let partner = partnerRaw.includes("PPMC") ? "PPMC" : "RETAIL";
                  let isApi = (apiMatchedIds.has(bId) || row.some(c => String(c).toUpperCase().replace(/\s+/g,'').includes("APIUSER")));
                  let source = isApi ? "API SYNC" : "MANUAL";
                  let status = statusRaw.includes("done") || statusRaw.includes("clear") || statusRaw.includes("ready") ? "REPORTED" : "PENDING";

                  // 1. Standard Trend
                  if (!stats[dateKey][city]) stats[dateKey][city] = { PPMC: 0, RETAIL: 0, API: 0, MANUAL: 0 };
                  stats[dateKey][city][partner]++;
                  stats[dateKey][city][isApi ? "API" : "MANUAL"]++;

                  // 2. Sankey Links (Flow: City -> Partner -> Source -> Status)
                  let flow = [`${city}`, `${partner}`, `${source}`, `${status}`];
                  for(let i=0; i<flow.length-1; i++) {
                    let linkKey = `${flow[i]}|||${flow[i+1]}`;
                    sankeyLinksMap[linkKey] = (sankeyLinksMap[linkKey] || 0) + 1;
                  }

                  // 3. Heatmap (Day of Week, Hour)
                  let heatKey = `${dayOfWeek}_${hour}`;
                  heatmapMap[heatKey] = (heatmapMap[heatKey] || 0) + 1;

                  // 4. Treemap (City -> Partner)
                  if(!cityChildMap[city]) cityChildMap[city] = {};
                  cityChildMap[city][partner] = (cityChildMap[city][partner] || 0) + 1;
              }
          });
      });
      
      // Final Assembly
      let sankeyLinks = Object.keys(sankeyLinksMap).map(k => {
        let parts = k.split("|||");
        return { source: parts[0], target: parts[1], value: sankeyLinksMap[k] };
      });
      let heatmapData = Object.keys(heatmapMap).map(k => {
        let parts = k.split("_");
        return [parseInt(parts[0]), parseInt(parts[1]), heatmapMap[k]];
      });
      let treemapData = Object.keys(cityChildMap).map(c => {
        return { name: c, value: Object.values(cityChildMap[c]).reduce((a,b)=>a+b,0), children: Object.keys(cityChildMap[c]).map(p => ({name:p, value:cityChildMap[c][p]})) };
      });

      return JSON.stringify({ stats, sankeyLinks, heatmapData, treemapData });
    } catch(e) {
      return JSON.stringify({ error: e.message });
    }
  }

  // =========================================================================
  // 🟢 MISSING TRF DRIVE UPLOAD FUNCTIONS (ADDED FIX)
  // =========================================================================
  function directAttachTrf(base64Data, filename, city, targetId, aiData, userName) {
    try {
        const folder = DriveApp.getFolderById(TRF_FOLDER_ID);
        const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), "image/jpeg", filename);
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        const link = file.getUrl();

        const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
        const sheet = ss.getSheetByName(city);
        const map = getColumnMap(sheet);
        const data = sheet.getDataRange().getDisplayValues();

        let isAttached = false;
        for (let i = 1; i < data.length; i++) {
            let bId = map.bookingId > -1 ? String(data[i][map.bookingId]).trim() : "";
            let rId = map.reqId > -1 ? String(data[i][map.reqId]).trim() : "";
            let pName = map.name > -1 ? String(data[i][map.name]).trim() : "";

            if (bId === targetId || rId === targetId || pName === targetId) {
                let trfColIdx = map.trf;
                if (trfColIdx === -1) {
                    trfColIdx = sheet.getLastColumn();
                    sheet.getRange(1, trfColIdx + 1).setValue("TRF Link");
                }
                sheet.getRange(i + 1, trfColIdx + 1).setValue(link);
                isAttached = true;
                break;
            }
        }

        if (isAttached) {
            saveLinkToCommentsDB(targetId, link, Object.keys(aiData), []);
            return { status: "Matched" };
        }
        return { status: "Error", message: "Record not found in sheet" };
    } catch (e) {
        return { status: "Error", message: e.message };
    }
  }

  function parkTrfInWaitingRoom(base64Data, filename, aiData) {
    try {
        const folder = DriveApp.getFolderById(TRF_FOLDER_ID);
        const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), "image/jpeg", filename);
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        const link = file.getUrl();

        let logMsg = `Name: ${aiData.name || "N/A"} | Age: ${aiData.age || "N/A"} | Gender: ${aiData.gender || "N/A"} | Barcode: ${aiData.barcode || "N/A"}`;
        
        const ss = SpreadsheetApp.openById(OLD_SHEET_ID);
        let dbSheet = ss.getSheetByName("Comments_DB");
        dbSheet.appendRow([Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss"), "WAITING_TRF", "System", logMsg, "", link, "Pending"]);
        
        return { status: "Parked" };
    } catch (e) {
        return { status: "Error", message: e.message };
    }
  }