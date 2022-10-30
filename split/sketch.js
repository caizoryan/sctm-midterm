let w = 5;
let cSize = window.innerWidth / 20;
let speed = 1;

// Quick Sort
// --- x ---
const s1 = (p) => {
  let values = [];

  let states = [];
  p.setup = () => {
    let canvasWidth = window.innerWidth / 2;
    let canvasHeight = window.innerHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    values = new Array(p.floor(p.width / w));
    for (let i = 0; i < values.length; i++) {
      values[i] = p.random(p.height);
      states[i] = -1;
    }
    quickSort(values, 0, values.length - 1);
  };

  p.draw = () => {
    p.background(0);
    p.noStroke();
    for (let i = 0; i < values.length; i++) {
      p.fill(255);
      if (states[i] == 0) {
        p.fill(229, 91, 84, 127);
      } else if (states[i] == 1) {
        p.fill(200, 100, p.map(values[i], 0, values.length, 10, 127), 127);
      } else {
        p.fill(255, 200);
        // fill(0, 100);
      }
      p.circle(i * w, p.height - values[i], values[i] / cSize);
    }
  };

  async function quickSort(arr, start, end) {
    if (start >= end) {
      return;
    }
    let index = await partition(arr, start, end);
    states[index];

    await Promise.all([
      // coding train
      quickSort(arr, start, index - 1),
      quickSort(arr, index + 1, end),
    ]);
  }
  async function partition(arr, start, end) {
    for (let i = 0; i < end; i++) {
      states[i] = 1;
    }
    let pivotIndex = start;
    let pivotValue = arr[end];
    states[pivotIndex] = 0; //-1 means nothing, 0 means its pivoted next
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        states[pivotIndex] = -1;
        pivotIndex++;
        states[pivotIndex] = 0;
      }
    }
    await swap(arr, pivotIndex, end);

    for (let i = 0; i < end; i++) {
      if (i != pivotIndex) {
        states[i] = -1;
      }
    }

    return pivotIndex; // need to return the pivotIndex (the whole idea behind it)
  }
};
// --- x ---

// Bubble Sort
// --- x ---
const s2 = (p) => {
  let values = [];

  let states = [];
  p.setup = () => {
    let canvasWidth = window.innerWidth / 2;
    let canvasHeight = window.innerHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    values = new Array(p.floor(p.width / w));
    for (let i = 0; i < values.length; i++) {
      values[i] = p.random(p.height);
      states[i] = -1;
    }
    bubbleSort(values);
  };

  p.draw = () => {
    p.background(255);
    p.noStroke();
    for (let i = 0; i < values.length; i++) {
      p.fill(255);
      if (states[i] == 0) {
        p.fill(229, 91, 84, 127);
      } else if (states[i] == 1) {
        p.fill(200, 100, p.map(values[i], 0, values.length, 10, 127), 127);
      } else {
        p.fill(0);
        // fill(0, 100);
      }
      p.circle(i * w, p.height - values[i], values[i] / cSize);
    }
  };

  async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        let a = arr[j];
        let b = arr[j + 1];
        if (a > b) {
          await swap(arr, j, j + 1);
        }
      }
    }
  }
};
// --- x ----

let sketch1 = new p5(s1, "sketch1");
let sketch2 = new p5(s2, "sketch2");

async function swap(arr, a, b) {
  await sleep(speed);

  // to swap the numbers for quick inside the array
  let temp = arr[a]; //storing 'a' in a temporary value so can use it to swap later
  arr[a] = arr[b];
  arr[b] = temp;
}
function sleep(ms) {
  //delay
  return new Promise((resolve) => setTimeout(resolve, ms));
}
