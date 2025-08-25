"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = exports.Manager = void 0;
class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
}
class Manager extends Employee {
    constructor(name, age, department) {
        super(name, age);
        this.department = department;
    }
    getDepartment() {
        return this.department;
    }
}
exports.Manager = Manager;
class Developer extends Employee {
    constructor(name, age, programmingLanguage) {
        super(name, age);
        this.programmingLanguage = programmingLanguage;
    }
    getProgrammingLanguage() {
        return this.programmingLanguage;
    }
}
exports.Developer = Developer;
