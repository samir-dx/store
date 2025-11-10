const NULL = null;
const UNDEFINED = undefined;
const TRUE = true;
const FALSE = false;

const conversions = {
    '+': `number to string`,
    'any other operator': 'to number',
    '==': `to number if neither of them are ${NULL} or ${UNDEFINED}, ${NULL} == ${UNDEFINED} is true, if either of them is ${NULL} or ${UNDEFINED} then it is false`,
    '< > <= >=': `all to number including ${NULL} and ${UNDEFINED}`
} 
`
[] == [] //false since we are comparing two objects and objects are compared by reference;
[] == ![] //true 
`

const number_conversions = {
    undefined: NaN,
    null: 0,
    "": 0,
    "     -1   ": -1,
    "\n\t\b\s  ": NaN,
}

const typeof_ = {
    null : 'object',
    undefined: 'undefined',
    'function(){}': 'function',
}

const transpilers_vs_polyfill = {
    transpilers: { 
        ex: 'Babel',
        for: 'New JavaScript syntax (e.g., ES6 arrow functions, classes, optional chaining)', 
        description: 'Transpilers convert modern JavaScript syntax into older syntax so that code runs on environments that do not support the latest features.' 
    },
    polyfills: {
        ex: 'Array.prototype.includes, Promise, fetch',
        for: 'New JavaScript APIs or built-in functions not available in older engines',
        description: 'Polyfills add missing functionality by defining new functions or objects if they do not exist in the current environment.'
    }
}