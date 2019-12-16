function fn(person) {
  person.age = 26;
  person = {
    name: 'name1',
    age: 18
  };
  return person;
}

const p1 = {
  name: 'name2',
  age: 19
};
const p2 = fn(p1);

console.log(p1); // { name: "name2", age: 26 }
console.log(p2); // { name: "name1", age: 18 }
