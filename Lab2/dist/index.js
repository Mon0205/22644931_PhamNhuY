"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai1_1 = require("./bai1");
const bai2_1 = require("./bai2");
const bai3_1 = require("./bai3");
const bai4_1 = require("./bai4");
const bai5_1 = require("./bai5");
//Bài 1
bai1_1.myPromise.then((message) => {
    console.log(message); // Output 2s: Hello Async
});
//Bài 2
(0, bai2_1.getNumber)().then((number) => {
    console.log(number); // Output 1s: 10
});
//Bài 3
(0, bai3_1.getError)().catch((error) => {
    console.error("Caught an error:", error.message);
});
//Bài 4
(0, bai4_1.getRandomNumber)()
    .then((num) => {
    console.log("Generated number:", num);
})
    .catch((error) => {
    console.error("Error generating number:", error.message);
});
//Bai 5
(0, bai5_1.simulateTask)(1500).then((result) => {
    console.log(result); // Output after 1.5s: Task done
});
//Bai 6
const promise1 = (0, bai5_1.simulateTask)(1000).then(() => "Task 1 done");
const promise2 = (0, bai5_1.simulateTask)(2000).then(() => "Task 2 done");
const promise3 = (0, bai5_1.simulateTask)(1500).then(() => "Task 3 done");
Promise.all([promise1, promise2, promise3]).then((results) => {
    console.log("All tasks completed:", results);
});
//Bai 7
Promise.race([promise1, promise2, promise3]).then((firstResult) => {
    console.log("First task completed:", firstResult);
});
//Bai 8
const bai8_1 = require("./bai8");
bai8_1.promiseChain.then((finalResult) => {
    console.log("Final result of promise chain:", finalResult); // Output: 13
});
//Bai 9
const bai9_1 = require("./bai9");
const numbers = [1, 2, 3, 4, 5, 6];
(0, bai9_1.filterEvenNumbers)(numbers).then((evenNumbers) => {
    console.log("Even numbers:", evenNumbers); // Output sau 1s: [2, 4, 6]
});
//Bai 10
bai1_1.myPromise.then((message) => {
    console.log(message); // Output 2s: Hello Async
}).catch((error) => {
    console.error("Error:", error);
}).finally(() => {
    console.log("Done");
});
//Bai 11
const bai11_1 = require("./bai11");
(0, bai11_1.asyncFunction)().then((message) => {
    console.log(message); // Output after 2s: Hello Async
}).catch((error) => {
    console.error("Error:", error);
});
//Bai 12
const bai12_1 = require("./bai12");
(0, bai12_1.simulateTask)(2000).then((result) => {
    console.log(result); // Output after 2s: Task done
}).catch((error) => {
    console.error("Error:", error);
});
//Bai 13
const bai9_2 = require("./bai9");
async function runTask() {
    try {
        const evenNumbers = await (0, bai9_2.filterEvenNumbers)([10, 15, 20, 25, 30]);
        console.log("Even numbers:", evenNumbers); // Output after 1s: [10, 20, 30]
    }
    catch (error) {
        console.error("Error:", error);
    }
}
runTask();
//Bai 14
//waits 1 second, then returns 2, then squares it, then cubes it
const bai14_1 = require("./bai14");
bai14_1.promiseChain.then((result) => {
    console.log("Final result of promise chain:", result); // Output: 8
});
//Bai 15
//Call multiple async functions sequentially using await.
async function sequentialTasks() {
    try {
        const result1 = await (0, bai12_1.simulateTask)(1000);
        console.log(result1); // Output after 1s: Task done
        const evenNumbers = await (0, bai9_2.filterEvenNumbers)([3, 6, 9, 12, 15]);
        console.log("Even numbers:", evenNumbers); // Output after 1s: [6, 12]
        const finalResult = await bai14_1.promiseChain;
        console.log("Final result of promise chain:", finalResult); // Output: 8
    }
    catch (error) {
        console.error("Error:", error);
    }
}
sequentialTasks();
//Bai 16
async function parallelTasks() {
    try {
        const task1 = (0, bai12_1.simulateTask)(2000);
        const task2 = (0, bai9_2.filterEvenNumbers)([2, 4, 6, 8, 10]);
        const task3 = bai14_1.promiseChain;
        const [result1, evenNumbers, finalResult] = await Promise.all([task1, task2, task3]);
        console.log(result1); // Output after 2s: Task done
        console.log("Even numbers:", evenNumbers); // Output after 1s: [2, 4, 6, 8, 10]
        console.log("Final result of promise chain:", finalResult); // Output: 8
    }
    catch (error) {
        console.error("Error:", error);
    }
}
parallelTasks();
//Bai 17
//Use for await...of to iterate over an array of Promises.
async function iteratePromises() {
    const promises = [
        (0, bai12_1.simulateTask)(1000),
        (0, bai9_2.filterEvenNumbers)([1, 2, 3, 4, 5]),
        bai14_1.promiseChain
    ];
    try {
        for await (const result of promises) {
            console.log("Result:", result);
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
}
iteratePromises();
//Bai 18
const bai18_1 = require("./bai18");
(0, bai18_1.fetchUser)(1).then((user) => {
    console.log("Fetched user:", user); // Output after 1s: Fetched user: { id: 1, name: 'User1' }
}).catch((error) => {
    console.error("Error fetching user:", error);
});
//Bai 19
async function fetchMultipleUsers(ids) {
    try {
        const userPromises = ids.map((id) => (0, bai18_1.fetchUser)(id));
        const users = await Promise.all(userPromises);
        console.log("Fetched users:", users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
    }
}
fetchMultipleUsers([1, 2, 3]);
//Bai 20
//Add a timeout: if the API call takes more than 2 seconds, throw an error.
const bai20_1 = require("./bai20");
(0, bai20_1.fetchUserWithTimeout)(1).then((user) => {
    console.log("Fetched user with timeout:", user); // Output after 1s: Fetched user with timeout: { id: 1, name: 'User1' }
}).catch((error) => {
    console.error("Error fetching user with timeout:", error);
});
//Bai 21
const bai21_1 = require("./bai21");
(0, bai21_1.fetchData)();
// { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
//Bai 22
const bai22_1 = require("./bai22");
(0, bai22_1.fetchMultipleData)([1, 2, 3, 4, 5]);
//Bài 23
// import { fetchAndFilterTodos } from "./bai23";
// fetchAndFilterTodos();
//Bài 24
const bai24_1 = require("./bai24");
(0, bai24_1.postData)();
//Bài 25
const bai25_1 = require("./bai25");
(0, bai25_1.downloadFile)("example.pdf").then(() => {
    console.log("📂 Download completed!");
});
//Bài 26
//Use async/await with setTimeout to simulate a 5-second wait.
async function waitFiveSeconds() {
    console.log("⏳ Waiting for 5 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("✅ Done waiting!");
}
waitFiveSeconds();
//Bài 27
// Write a function fetchWithRetry(url, retries) that retries up to retries times if the API call fails.
const bai27_1 = require("./bai27");
(async () => {
    try {
        const data = await (0, bai27_1.fetchWithRetry)("https://jsonplaceholder.typicode.com/todos/1", 3);
        console.log("📂 Data:", data);
    }
    catch (err) {
        console.error("🚨 Fetch failed after retries:", err);
    }
})();
//Bài 28
const bai28_1 = require("./bai28");
(0, bai28_1.batchProcess)();
//Bài 29
//Write an async function queueProcess() that processes tasks sequentially in a queue.
const bai29_1 = require("./bai29");
(0, bai29_1.queueProcess)();
