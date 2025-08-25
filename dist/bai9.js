"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = void 0;
class Dog {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sound() {
        return "Woof!";
    }
}
exports.Dog = Dog;
