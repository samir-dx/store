`Methods and properties are:`
const key = 'temp', value = 'seomse'
const map = new Map() - //creates the map.
map.set(key, value) - //stores the value by the key.
map.get(key) - //returns the value by the key, undefined if key doesn’t exist in map.
map.has(key) - //returns true if the key exists, false otherwise.
map.delete(key) - //removes the element (the key/value pair) by the key.
map.clear() - //removes everything from the map.
map.size //returns the current element count. //like length
map.entries() //


// key can be anything, even object, NaN
//NaN === NaN in context of lookup for NaN key



`A Set is a special type collection – “set of values” (without keys), where each value may occur only once.
Its main methods are:`

const set = new Set([iterable]) - //creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
set.add(value) - //adds a value, returns the set itself.
set.delete(value) - //removes the value, returns true if value existed at the moment of the call, otherwise false.
set.has(value) - //returns true if the value exists in the set, otherwise false.
set.clear() - //removes everything from the set.
set.size  //is the elements count.   ``



const wkMap = WeakMap();

`only stores object as keys and not primitives`
`uses:`
    `in map the objects are not garbage collected if they are a key in ${Map}, but in  case of ${WeakMap} they are garbage collected`
    `ex. Caching => scenarios where keys are object, even if the value is deleted we won't be able to garbage collect the `