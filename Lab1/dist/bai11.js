"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = exports.Cat = exports.Animal = void 0;
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sound() {
        return "Some generic animal sound";
    }
}
exports.Animal = Animal;
class Cat extends Animal {
    sound() {
        return "Meow!";
    }
}
exports.Cat = Cat;
class Dog extends Animal {
    sound() {
        return "Woof!";
    }
}
exports.Dog = Dog;
