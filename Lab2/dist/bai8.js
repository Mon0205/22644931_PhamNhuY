"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseChain = void 0;
//Create a Promise chain: square the number 2, then double it, then add 5.
exports.promiseChain = new Promise((resolve) => {
    resolve(2);
}).then((num) => {
    return num * num;
}).then((squared) => {
    return squared * 2;
}).then((doubled) => {
    return doubled + 5;
});
