"use strict";
//19. Demonstrate method overriding using polymorphism with Animal and subclasses.
Object.defineProperty(exports, "__esModule", { value: true });
const bai11_1 = require("./bai11");
const bai9_1 = require("./bai9");
const animals = [
    new bai11_1.Cat("Whiskers", 2),
    new bai9_1.Dog("Buddy", 3)
];
animals.forEach(animal => {
    console.log(`${animal.name} (${animal.age} years old) says: ${animal.sound()}`);
});
