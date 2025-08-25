"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(accountNumber, accountHolder, initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Withdrawal of ${amount} successful. New balance: ${this.balance}`);
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawal of ${amount} successful. New balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient funds");
        }
    }
    getBalance() {
        return this.balance;
    }
}
exports.BankAccount = BankAccount;
