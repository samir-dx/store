"use strict";


`
FUNCTION DECLARATION

${fn()} -> valid 
${function fn() {}} -> Function Declarations are processed before the code block is executed. 
They are visible everywhere in the block



FUNCTION EXPRESSION
${fn1()} will throw error
let ${fn1 = function() {}} -> Function Expressions are created when the execution flow reaches them. at this line





` 

`A closure is a function that remembers its outer variables and can access them`
    `all functions in JavaScript are closures`

    `let/const
    * have block scope
        * if(){let a = 1}
          console.log(a) //will throw ReferenceError: a is not defined
    * can't be declared more than once:
        * let a = 1
          let a = 2 //will throw SyntaxError: Identifier 'a' has already been declared
`

    `var
    * has function scope or global scope, no block scope
    * Declarations are hoisted
        ${function sayHi() {
        phrase = "Hello";

        alert(phrase);

        var phrase;
    }} //this is valid, declaration are raised at the top of the function or script if global
    * but assignments are not hoisted
    ${function sayHi() {
        alert(phrase); //undefined

        var phrase = "Hello";
    }}
`

    `IIFE use for block level scope in var`

    `// Ways to create IIFE

${(function () {
        alert("Parentheses around the function");
    })()}

${(function () {
        alert("Parentheses around the whole thing");
    }())};

${!function () {
        alert("Bitwise NOT operator starts the expression");
    }()};

${+function () {
        alert("Unary plus starts the expression");
    }()};`


    `The global object holds variables that should be available everywhere.

That includes JavaScript built-ins, such as Array and environment-specific values, such as ${window.innerHeight} – the window height in the browser.

The global object has a universal name ${globalThis}.

…But more often is referred by “old-school” environment-specific names, such as window (browser) and global (Node.js).

We should store values in the global object only if they're truly global for our project. And keep their number at minimum.

In-browser, unless we're using modules, global functions and variables declared with var become a property of the global object.

To make our code future-proof and easier to understand, we should access properties of the global object directly, as ${window.x.y}`

    `function.length will give its arguments length`

    //NFE, named function expressions
    `use for self referencing functions, recursions`

    `   let sayHi = function func(who) {
        alert(${`Hello, ${who}`});
    };`

let sayHi1 = function (who) {
    if (who) {
        alert(`Hello, ${who}`);
    } else {
        sayHi1("Guest"); 
    }
};

let welcome1 = sayHi1;
sayHi1 = null;

welcome(); // Error, the nested sayHi call doesn't work any more! 
// welcome points to function on line 77, but sayHi1 is not a function anymore, it is null!!!


//but this works
let sayHi = function func(who) { //fun is a local reference to the `function` itself.`
    if (who) {
        alert(`Hello, ${who}`);
    } else {
        func("Guest"); // Now all fine
    }
};

let welcome = sayHi;
sayHi = null;



welcome(); // Hello, Guest (nested call works)
// sayHi is garbage collected but welcome points to a function which does not references to sayHi anymore, 
// it creates a local reference to the function




//new Function syntax

`The syntax:`

let func = new Function([arg1, arg2, ...argN], functionBody);
`For historical reasons, arguments can also be given as a comma-separated list.`

    `These three declarations mean the same:`

new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces

`Functions created with new Function, have [[Environment]] 
referencing the global Lexical Environment, not the outer one. 
Hence, they cannot use outer variables. But that’s actually good, 
because it insures us from errors. Passing parameters explicitly is a 
much better method architecturally and 
causes no problems with minifiers`

    `bind uses`
let user = {
    firstName: "John",
    say(phrase) {
        console.log(`${phrase}, ${this.firstName}!`);
    }
};

let say = user.say.bind(user);
say('hi') //hi, John!
user.firstName = "Sam"
say('hi') //hi, Sam!
user = null
say('hi') //hi, Sam!
console.log(user) //null

//examples
function f() {
    console.log(this)
}

let user = {
    g: f.bind(null)
};

user.g(); //null


`a function can't be re-bounded`
function f() {
    alert(this.name);
}

f = f.bind({ name: "John" }).bind({ name: "Pete" });

f(); // John


``

function sayHi() {
    alert( this.name );
  }
  sayHi.test = 5;
  
  let bound = sayHi.bind({
    name: "John"
  });
  
alert( bound.test ); //undefined -> bind is another object, it does not have test property




`*** ARROW FUNCTIONS`

`Arrow functions have no “this”` //lookup of this is done in the outer lexical environment
`Arrows have no “arguments”`

`
Do not have this
Do not have arguments
Can’t be called with new
They also don’t have super`