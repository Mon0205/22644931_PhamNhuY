"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
exports.get = get;
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
exports.Student = Student;
function get(student) {
    return `Name: ${student.name}, Age: ${student.age}`;
}
