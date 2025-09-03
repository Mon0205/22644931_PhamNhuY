"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWithRetry = fetchWithRetry;
async function fetchWithRetry(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`📡 Fetch attempt ${attempt}...`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`❌ HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("✅ Success!");
            return data;
        }
        catch (error) {
            console.error(`⚠️ Attempt ${attempt} failed:`, error);
            if (attempt === retries) {
                throw new Error(`❌ All ${retries} attempts failed.`);
            }
            // Optional: delay before retrying
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
}
