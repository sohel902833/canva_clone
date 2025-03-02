import "./assets/index.css";
// import utils from "./utils";

const canvas = document.getElementById("canvas");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: 10,
    y: 10,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];
const GRAVITY = 1;
const FRICTION = 0.9;
// Event Listeners
addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
// Objects
class Circle {
    constructor(x, y, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
    }
}

// Implementation

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getCircles = (len = 1) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        const color = colors[getRandomInt(0, colors.length)];
        const radius = getRandomInt(25, 40);
        const dy = getRandomInt(2, 20);
        const x = getRandomInt(150, canvas.width - 150);
        const y = getRandomInt(150, canvas.height - 150);
        arr.push(new Circle(x, y, dy, radius, color));
    }
    return arr;
};
let circleArray = [];

function init() {
    circleArray = getCircles(2);
}
let isRunning = true;
// Animation Loop
function animate() {
    if (isRunning) {
        requestAnimationFrame(animate);
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    const [circle1, circle2] = circleArray;
    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    const distance = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);

    if (distance < circle1.radius + circle2.radius) {
        circle1.color = "red";
    } else {
        circle1.color = "black";
    }
    // circleArray.forEach((circle) => circle.update());
    // objects.forEach(object => {
    //  object.update()
    // })
}

init();
animate();

startBtn.addEventListener("click", () => {
    if (isRunning) {
        return;
    }
    isRunning = true;
    animate();
});

stopBtn.addEventListener("click", () => {
    if (!isRunning) {
        return;
    }
    isRunning = false;
});
