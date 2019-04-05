//Iterators Example - When Done is True - Stopping the Sum
let arrayItems = new Set([1, 2, 3, 4]);
let iterateExample = arrayItems[Symbol.iterator]();
const iteratorFn = () => {    
    for(let item of arrayItems) {        
        if(iterateExample.next().done == false ) { //Condition to check if Done id false 
            setTimeout(()=> {                
                item++;
                console.log("Value of an Iterable array", item);                
            }, 1000);
        }    
    }    
}
iteratorFn();

//Generator Example 1
function* generator() {
    yield* [1,2,3,4];
}
let generatorExample = generator();
console.log(generatorExample.next());

//Generator Example 2
var iteration = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
}

for (let value of iteration) { 
    console.log(value); 
} 