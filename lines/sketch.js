let w;
let cSize = window.innerWidth / 20;
let speed = 1;

if (!sessionStorage.getItem("count")) {
  w = 5;
} else {
  w = sessionStorage.getItem("count");
}
if (!sessionStorage.getItem("speed")) {
  speed = 5;
} else {
  speed = sessionStorage.getItem("speed");
}

// Quick Sort
// --- x ---
const s1 = (p) => {
  let values = [];

  let states = [];
  p.setup = () => {
    let b = document.getElementById("sketch1");
    let canvasWidth = b.clientWidth;
    let canvasHeight = b.clientHeight;

    p.createCanvas(canvasWidth, canvasHeight);
    values = new Array(p.floor(p.width / w));
    for (let i = 0; i < values.length; i++) {
      values[i] = p.random(p.height);
      states[i] = -1;
    }
    quickSort(values, 0, values.length - 1);
  };

  p.draw = () => {
    p.background(0, 10);
    p.stroke(255);
    p.strokeWeight(1);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < values.length; i++) {
      p.vertex(i * w, p.height - values[i]);
    }
    p.endShape();
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
    let b = document.getElementById("sketch2");
    let canvasWidth = b.clientWidth;
    let canvasHeight = b.clientHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    values = new Array(p.floor(p.width / w));
    for (let i = 0; i < values.length; i++) {
      values[i] = p.random(p.height);
      states[i] = -1;
    }
    bubbleSort(values);
  };

  p.draw = () => {
    p.background(255, 100);
    p.stroke(0);
    p.strokeWeight(1);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < values.length; i++) {
      p.vertex(i * w, p.height - values[i]);
    }
    p.endShape();
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

// interactivity logic

let btn = document.getElementById("buttown");
let countSlider = document.getElementById("count");
let speedSlider = document.getElementById("speed");

btn.addEventListener("click", () => {
  sessionStorage.setItem("count", countSlider.value);
  sessionStorage.setItem("speed", speedSlider.value);
  window.location.reload();
});
