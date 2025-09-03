"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncFunction = asyncFunction;
//11. Convert Exercise 1 into async/await.
async function asyncFunction() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    });
}
