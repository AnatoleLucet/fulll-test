function fizzbuzz(n) {
  for (let i = 1; i <= n; i++) {
    let str = "";
    if (i % 3 === 0) str += "Fizz";
    if (i % 5 === 0) str += "Buzz";

    console.log(str || i);
  }
}

fizzbuzz(100);
