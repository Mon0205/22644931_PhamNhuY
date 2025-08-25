"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
exports.getCarDetails = getCarDetails;
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
}
exports.Car = Car;
function getCarDetails(car) {
    return `Brand: ${car.brand}, Model: ${car.model}, Year: ${car.year}`;
}
