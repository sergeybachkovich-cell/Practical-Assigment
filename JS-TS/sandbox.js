const delay = (min = 300, max = 600) => Math.random() * (max - min) + min;
console.log(delay())