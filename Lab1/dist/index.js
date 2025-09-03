"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//node dist/index.js
const bai1_1 = require("./bai1");
const bai2_1 = require("./bai2");
const bai3_1 = require("./bai3");
const bai4_1 = require("./bai4");
const bai5_1 = require("./bai5");
const bai8_1 = require("./bai8");
console.log((0, bai1_1.get)(new bai1_1.Student("200Lab", 20)));
console.log((0, bai2_1.get)(new bai2_1.Student("200Lab", 20, "A")));
console.log((0, bai3_1.getCarDetails)(new bai3_1.Car("Toyota", "Corolla", 2020)));
console.log(new bai4_1.Rectangle(5, 10).area());
console.log(new bai4_1.Rectangle(5, 10).perimeter());
var account = new bai5_1.BankAccount("123456", "John Doe", 1000);
console.log(account.getBalance());
console.log(account.deposit(500));
console.log(account.withdraw(200));
var account2 = new bai5_1.BankAccount("654321", "Jane Doe", 2000);
var account3 = new bai5_1.BankAccount("111222", "Alice Smith", 1500);
var accounts = [account, account2, account3];
accounts.forEach((acc) => {
    console.log(`Account Number: ${acc.accountNumber}, Balance: ${acc.getBalance()}`);
});
var product1 = new bai8_1.Product("Laptop", 1500, 2);
var product2 = new bai8_1.Product("Smartphone", 800, 3);
var product3 = new bai8_1.Product("Candy", 30, 5);
var product4 = new bai8_1.Product("Book", 20, 10);
var products = [product1, product2, product3, product4];
products.forEach((p) => {
    if (p.price > 100) {
        console.log(`Product: ${p.name}, Price: ${p.price}, Quantity: ${p.quantity}, Total Price: ${p.totalPrice()}`);
    }
});
//17. Write a singleton Logger class that logs messages to console.
const bai17_1 = require("./bai17");
const logger = bai17_1.Logger.getInstance();
logger.log("This is a log message from the singleton Logger class.");
//18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().
const bai18_1 = require("./bai18");
console.log(`Addition: ${bai18_1.MathUtil.add(5, 3)}`);
console.log(`Subtraction: ${bai18_1.MathUtil.subtract(5, 3)}`);
console.log(`Multiplication: ${bai18_1.MathUtil.multiply(5, 3)}`);
console.log(`Division: ${bai18_1.MathUtil.divide(5, 3)}`);
const bai11_1 = require("./bai11");
const bai9_1 = require("./bai9");
const animals = [
    new bai11_1.Cat("Whiskers", 2),
    new bai9_1.Dog("Buddy", 3)
];
animals.forEach(animal => {
    console.log(`${animal.name} (${animal.age} years old) says: ${animal.sound()}`);
});
