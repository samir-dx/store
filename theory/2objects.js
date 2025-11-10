`no restrictions on key naming`
let obj = {
    for: 1,
    let: 2,
    return: 3,
    const: 4,
};

`always use in to check for key `

let isKey = 'for' in obj

    `Objects are specially ordered!!!!!!!`


    `integer properties are sorted, others appear in creation order`

const integer_properties = `which can convert from int to str or from str to string only >=0 numbers`
const ex = String(Math.trunc(Number(strVal))) === strVal;
let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    // ..,
    "1": "USA"
};

for (let code in codes) {
    alert(code); // 1, 41, 44, 49
}


let user = {
    name: "John",
    surname: "Smith"
};
user.age = 25; // add one more

` non-integer properties are listed in the creation order`
for (let prop in user) {
    alert(prop); // name, surname, age
}

`objects are passed by reference`

let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

let clone1 = Object.assign({}, user); // only copies upto 1 level, only use if all values are primitive
alert( user.sizes === clone1.sizes ); // true, same object


`${structuredClone} clones circular reference as well`
let clone = structuredClone(user);
alert(user.sizes === clone.sizes); // false, different objects


`object to primitive conversion`

`There are three variants of type conversion knows as HINTS`
//String
    //for object to string
    `ex. alert(obj)`

//"number"
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;


//default
    //Occurs in rare cases when the operator is “not sure” what type to expect.
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) {  };
    

`Conversion Rules
    1. Call {obj[${Symbol.toPrimitive}](hint) - the method with the symbolic key ${Symbol.toPrimitive} (system symbol), if such method exists,
    2. Otherwise if hint is ${"string"}
    try calling ${obj.toString()} or ${obj.valueOf()}, whatever exists.
    3. Otherwise if hint is "number" or "default"
    try calling ${obj.valueOf()} or ${obj.toString()}, whatever exists.
`
const temp = {};

temp.valueOf() //return this
temp.toString() //returns '[object Object]'