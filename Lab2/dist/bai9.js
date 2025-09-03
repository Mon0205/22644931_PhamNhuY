"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEvenNumbers = filterEvenNumbers;
//Write a Promise that reads an array after 1 second and filters even numbers.
function filterEvenNumbers(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const evenNumbers = arr.filter(num => num % 2 === 0);
            resolve(evenNumbers);
        }, 1000);
    });
}
