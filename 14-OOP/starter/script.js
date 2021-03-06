'use strict';

/*** Constructor Function ***/
const Person = function (firstName, birthYear) {
  // Instance properties:
  // Ex. this.property = parameter
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function
  // bad performance - use prototypal inheritance
  // this.calcAge = function () {
  //   console.log(2021 - this.birthYear);
  // };
};

// new calls the Person function
const dan = new Person('Dan', 1980);
// console.log(dan);

// 1. New empty {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const eima = new Person('Eima', 1989);
// console.log(eima);
// console.log(eima instanceof Person);

// Person.hey = function () {
//   console.log('Hey there !!!');
// };

// Person.hey();

/*** PROTOTYPES ***/
// console.log(Person.prototype);

// Prototypal inheritance
Person.prototype.calcAge = function () {
  // console.log(2021 - this.birthYear);
};

dan.calcAge();
eima.calcAge();

// Prototype of Dan showing calcAge function
// console.log(dan.__proto__);
// console.log(dan.__proto__ === Person.prototype); // true
// console.log(Person.prototype.isPrototypeOf(dan)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';
// console.log(dan.species);
// console.log(dan.hasOwnProperty('firstName')); // true
// console.log(dan.hasOwnProperty('species')); // false: it's not inside the dan object, it's in the prototype property of person

/*** PROTOTYPAL INHERITANE ON BUILT IN OBJECTS ***/

// console.log(dan.__proto__.__proto__); // prototype property of object
// console.log(dan.__proto__.__proto__.__proto__); // Object.prototype is null

// console.dir(Person.prototype.constructor);

const arr = [23, 6, 4, 3, 6, 4, 6, 346]; // short hand for using "new Array"
// console.log(arr.__proto__); // shows all methods on array object
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// This is an example, not good practice to create your own methods
Array.prototype.unique = function () {
  return [...new Set(this)];
};
// console.log(arr.unique());

const h1 = document.querySelector('h1');

// Code Challenge 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  // console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  // console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.brake();

/*** ES6 CLASSES ***/
// class expression
// const Personcl = class {}

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance Methods
  // Methods will be added to .prototype property
  calcAge() {
    // console.log(2021 - this.birthYear);
  }

  greet() {
    // console.log(`Hey ${this.firstName}`);
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static Method
  static hey() {
    // console.log('*** HEY ***');
    // console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
jessica.calcAge();
// console.log(jessica.__proto__ === PersonCl.prototype); // true

// Method Moved inside of the PersonCl class above
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();
PersonCl.hey();
// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens (pass into functions and return from functions)
// 3. Classes are executed in "strict mode"

/***  GETTERS AND SETTERS ***/

const walter = new PersonCl('Walter White', 1965);

const account = {
  owner: 'Dan',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements[this.movements.length - 1];
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// getter
// console.log(account.latest);

// setter
account.latest = 50;
// console.log(account.movements);

/*** OBJECT.CREATE ***/
const PersonProto = {
  calcAge() {
    // console.log(2021 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
// console.log(steven);
// Hardcoded way - don't do this
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

// console.log(steven.__proto__);

const sarah = Object.create(PersonProto);
// Programatic way - do this way
sarah.init('Sarah', 1988);
sarah.calcAge();

// Code Challenge 2
class Car2 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    // console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    // console.log(this.speed);
  }

  get speedUS() {
    return `${this.make} is traveling at ${this.speed / 1.6}mph`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car2('Ford', 120);
// console.log(ford);
// console.log(ford.speedUS);
ford.speedUS = 50;
ford.accelerate();
ford.accelerate();
ford.brake();
ford.accelerate();

/*** INHERITANCE BETWEEN CLASSES ***/

// Constructor Functions

const InheritPerson = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

InheritPerson.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // .call to get this bound to the this in InheritPerson
  InheritPerson.call(this, firstName, birthYear);
  this.course = course;
};

// Creates connection between Student(child) and InheritPerson(parent)
Student.prototype = Object.create(InheritPerson.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Computer Science');
mike.introduce();
mike.calcAge(); //  this only works due to Object.create

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// Code Challenge 3

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link Prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.chargeBattery(77);
console.log(tesla);
tesla.accelerate();
