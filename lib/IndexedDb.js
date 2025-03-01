import { openDB } from "idb";

const DB_NAME = "sessionDB";
const STORE_NAME = "sessionStore";
const KEY_NAME = "sessionKey";

// Initialize IndexedDB
async function initDB() {
  try {
    return await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  } catch (error) {
    console.error("Failed to initialize IndexedDB:", error);
    return null;
  }
}

// Save session key
export async function saveSessionKey(sessionKey) {
  try {
    const db = await initDB();
    if (db) {
      await db.put(STORE_NAME, sessionKey, KEY_NAME);
      //   console.log("Session key saved:", sessionKey);
    }
  } catch (error) {
    console.error("Error saving session key:", error);
  }
}

// Get session key
export async function getSessionKey() {
  try {
    const db = await initDB();
    const key = db ? await db.get(STORE_NAME, KEY_NAME) : null;
    // console.log("Retrieved session key:", key);
    return key;
  } catch (error) {
    console.error("Error retrieving session key:", error);
    return null;
  }
}

// Remove session key
export async function removeSessionKey() {
  try {
    const db = await initDB();
    if (db) {
      await db.delete(STORE_NAME, KEY_NAME);
      console.log("Session key removed");
    }
  } catch (error) {
    console.error("Error removing session key:", error);
  }
}
