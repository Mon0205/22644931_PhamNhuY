"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserWithTimeout = fetchUserWithTimeout;
//Add a timeout: if the API call takes more than 2 seconds, throw an error.
async function fetchUserWithTimeout(id) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("Request timed out"));
        }, 2000);
        setTimeout(() => {
            clearTimeout(timeout);
            resolve({ id, name: `User${id}` });
        }, 1000); // Simulate API call taking 1 second
    });
}
