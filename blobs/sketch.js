let w;
let cSize = window.innerWidth / 20;
let speed = 1;

let vertices_amount = 100;
let NOISE_SCALE = 30; // the higher the softer
let Z_SPEED = 0.007; // noise change per frame

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
  class Blobby {
    constructor(posX, posY, radius) {
      this.x = posX;
      this.y = posY;
      this.xoff = p.random(800, 1000);
      this.yoff = p.random(800, 1000);
      this.zoff = p.random(800, 1000);
      this.r = radius;
      this.amp = this.r * 2; // amplitude
      this.color = p.color(p.map(radius, 0, p.height / cSize, 100, 255), 0, 0);
    }
    render() {
      p.push();
      p.translate(this.x, this.y);
      p.noStroke();
      p.fill(this.color); // color

      p.beginShape();
      for (var a = 0; a < p.TWO_PI; a += p.TWO_PI / vertices_amount) {
        var x = this.r * p.sin(a);
        var y = this.r * p.cos(a);

        let n = p.noise(
          (this.xoff + x) / NOISE_SCALE,
          (this.yoff + y) / NOISE_SCALE,
          this.zoff
        );
        var new_x = x + n * this.amp * p.sin(a);
        var new_y = y + n * this.amp * p.cos(a);
        p.vertex(new_x, new_y);
      }
      p.endShape();
      p.pop();

      this.zoff += Z_SPEED;
    }
    set(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = p.color(p.map(r, 0, p.height / cSize, 30, 180), 0, 0);
    }
  }
  let blobArray = [];
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
    for (let i = 0; i < values.length; i++) {
      blobArray.push(
        new Blobby(i * w, p.height - values[i], p.random(p.height) / cSize)
      );
    }
    quickSort(values, 0, values.length - 1);
  };

  p.draw = () => {
    p.background(0, 10);
    p.noStroke();
    for (let i = 0; i < blobArray.length; i++) {
      blobArray[i].set(i * w, p.height - values[i], values[i] / 50);
      blobArray[i].render();
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
  class Blobby {
    constructor(posX, posY, radius) {
      this.x = posX;
      this.y = posY;
      this.xoff = p.random(800, 1000);
      this.yoff = p.random(800, 1000);
      this.zoff = p.random(800, 1000);
      this.r = radius;
      this.amp = this.r * 2; // amplitude
      this.color = p.color(p.map(radius, 0, p.height / cSize, 100, 255), 0, 0);
    }
    render() {
      p.push();
      p.translate(this.x, this.y);
      p.noStroke();
      p.fill(this.color); // color

      p.beginShape();
      for (var a = 0; a < p.TWO_PI; a += p.TWO_PI / vertices_amount) {
        var x = this.r * p.sin(a);
        var y = this.r * p.cos(a);

        let n = p.noise(
          (this.xoff + x) / NOISE_SCALE,
          (this.yoff + y) / NOISE_SCALE,
          this.zoff
        );
        var new_x = x + n * this.amp * p.sin(a);
        var new_y = y + n * this.amp * p.cos(a);
        p.vertex(new_x, new_y);
      }
      p.endShape();
      p.pop();

      this.zoff += Z_SPEED;
    }
    set(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = p.color(p.map(r, 0, p.height / cSize, 30, 180), 0, 0);
    }
  }
  let blobArray = [];
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
    for (let i = 0; i < values.length; i++) {
      blobArray.push(
        new Blobby(i * w, p.height - values[i], p.random(p.height) / cSize)
      );
    }
    bubbleSort(values);
  };

  p.draw = () => {
    p.background(255, 50);
    p.noStroke();
    for (let i = 0; i < blobArray.length; i++) {
      blobArray[i].set(i * w, p.height - values[i], values[i] / 50);
      blobArray[i].render();
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

// interactivity logic

let btn = document.getElementById("buttown");
let countSlider = document.getElementById("count");
let speedSlider = document.getElementById("speed");

btn.addEventListener("click", () => {
  sessionStorage.setItem("count", countSlider.value);
  sessionStorage.setItem("speed", speedSlider.value);
  window.location.reload();
});
