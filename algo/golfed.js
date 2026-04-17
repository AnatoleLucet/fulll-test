// psa: https://en.wikipedia.org/wiki/Code_golf

f=n=>n?[...f(n-1),(n%3?"":"Fizz")+(n%5?"":"Buzz")||n]:[]

console.log(f(100).join("\n"))

