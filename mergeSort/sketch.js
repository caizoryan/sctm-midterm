// O(nlogn)
// https://www.geeksforgeeks.org/merge-sort/

arr = [4, 8, 7, 2, 11, 1, 3];
console.log(mergeSort(arr));

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function merge(left, right) {
  let arr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  // (...) allows an iterable, such as an array or string, to be expanded in
  // places where zero or more arguments (for function calls) or elements (for array literals) are expected.
  return [...arr, ...left, ...right]; //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
}

function mergeSort(arr) {
  const half = arr.length / 2;

  if (arr.length < 2) {
    return arr;
  }

  const left = arr.splice(0, half);
  return merge(mergeSort(left), mergeSort(arr));
}
