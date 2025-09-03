"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseChain = void 0;
exports.promiseChain = new Promise((resolve) => {
    setTimeout(() => {
        resolve(2);
    }, 60000); // 60000ms = 1 phút
}).then((num) => {
    return num * num * num; // 2^3 = 8
});
