"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
    constructor() {
        this.books = [];
        this.user = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    addUser(user) {
        this.user.push(user);
    }
    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
        }
    }
    removeUser(user) {
        const index = this.user.indexOf(user);
        if (index > -1) {
            this.user.splice(index, 1);
        }
    }
    listBooks() {
        return this.books;
    }
    listUsers() {
        return this.user;
    }
}
exports.Library = Library;
