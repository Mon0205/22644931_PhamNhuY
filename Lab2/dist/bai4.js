"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumber = getRandomNumber;
function getRandomNumber() {
    return new Promise((resolve, reject) => {
        const num = Math.floor(Math.random() * 10); // số từ 0 → 9
        setTimeout(() => {
            if (num >= 0) {
                resolve(num); // thành công → trả về số ngẫu nhiên
            }
            else {
                reject(new Error("Failed to generate number")); // trường hợp lỗi (giả lập)
            }
        }, 1000);
    });
}
