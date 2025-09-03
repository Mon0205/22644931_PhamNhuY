"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumber = getNumber;
function getNumber() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 1000);
    });
}
