"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueProcess = queueProcess;
//Write an async function queueProcess() that processes tasks sequentially in a queue.
// Fake async task (simulating API call or work)
async function fakeTask(id, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} completed after ${delay}ms`);
        }, delay);
    });
}
// Process tasks sequentially
async function queueProcess() {
    const tasks = [
        () => fakeTask(1, 1000),
        () => fakeTask(2, 2000),
        () => fakeTask(3, 1500),
        () => fakeTask(4, 500),
        () => fakeTask(5, 1200),
    ];
    const results = [];
    for (const task of tasks) {
        try {
            const result = await task();
            results.push(result);
            console.log(result);
        }
        catch (error) {
            console.error("Error in queueProcess:", error);
        }
    }
    console.log("All tasks completed:", results);
}
