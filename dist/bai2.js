"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
exports.get = get;
class person {
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
}
class Student extends person {
    constructor(name, age, grade) {
        super(name, age, grade);
    }
}
exports.Student = Student;
function get(student) {
    return `Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`;
}
