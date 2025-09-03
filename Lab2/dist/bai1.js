"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPromise = void 0;
exports.myPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
