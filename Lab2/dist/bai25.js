"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = downloadFile;
//Create a function downloadFile that simulates downloading a file in 3 seconds and logs when done.
function downloadFile(filename) {
    return new Promise((resolve) => {
        console.log(`⏳ Bắt đầu tải file: ${filename}...`);
        setTimeout(() => {
            console.log(`✅ File "${filename}" đã tải xong!`);
            resolve();
        }, 3000); // 3000ms = 3 giây
    });
}
