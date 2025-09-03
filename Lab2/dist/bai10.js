"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEvenNumbers = filterEvenNumbers;
//Use .finally() to log "Done" when a Promise finishes (success or failure).
function filterEvenNumbers(numbers) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!Array.isArray(numbers)) {
                reject(new Error("Input must be an array of numbers"));
            }
            else {
                const evens = numbers.filter((n) => n % 2 === 0);
                resolve(evens);
            }
        }, 1000);
    });
}
