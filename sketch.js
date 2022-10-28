let values = [];
let w = 0.5;

let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  quickSort(values, 0, values.length - 1);
}

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

// partition ==
// partition (arr, 0, arr.length) ***
// pick a pivot and rearrange everything -> everything that is smaller than the
// the picked value of the pivot will be sorted on the left of it and the rest
// will be sorted on the right of the selected pivot value.

// first loop the array all the way to end-1: need to track the pivot index.
// track the pivot index and switch it with the value of the selected pivot.
// that is why we track the pivot index
// nice thing about this idea is to I do not need to use additional memory

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

function draw() {
  background(255);
  noStroke();

  for (let i = 0; i < values.length; i++) {
    fill(255);
    if (states[i] == 0) {
      fill(229, 91, 84);
    } else if (states[i] == 1) {
      fill(229, 161, 0, 100);
    } else {
      fill(0, 100);
    }
    circle(i * w, height - values[i], values[i] / 10);
  }
}

async function swap(arr, a, b) {
  await sleep(0.1);

  // to swap the numbers for quick inside the array
  let temp = arr[a]; //storing 'a' in a temporary value so can use it to swap later
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  //delay
  return new Promise((resolve) => setTimeout(resolve, ms));
}

///add sound
/// add bubble sort on the right side of it and compare the differences
/// create more interesting visuals
