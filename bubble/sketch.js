let values = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
  }
  bubbleSort(values);
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      let a = arr[j];
      let b = arr[j + 1];
      if (a > b) {
        swap(arr, j, j + 1);
      }
    }
  }
}

function draw() {
  background(75);
  for (let i = 0; i < values.length; i++) {
    stroke(255);
    line(i, height, i, height - values[i]);
  }
}

function shuffle(arr) {
  var n = arr.length,
    t,
    i;
  while (n) {
    i = (Math.random() * n--) | 0; // 0 ≤ i < n
    t = arr[n];
    arr[n] = arr[i];
    arr[i] = t;
  }
  return arr;
}
function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
