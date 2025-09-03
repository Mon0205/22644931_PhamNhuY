"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMultipleData = fetchMultipleData;
//Call the API multiple times and log the results.
async function fetchMultipleData(ids) {
    try {
        const fetchPromises = ids.map((id) => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }));
        const results = await Promise.all(fetchPromises);
        console.log("Fetched multiple data:", results);
    }
    catch (error) {
        console.error("Error fetching multiple data:", error);
    }
}
