import "./assets/index.css";
// import utils from "./utils";

const canvas = document.getElementById("canvas");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
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

// Objects
class Ball {
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
        if (this.y + this.radius > canvas.height) {
            this.dy = -this.dy * FRICTION;
        } else {
            // console.log("Dy", this.dy, this.y);
            this.dy += GRAVITY;
        }
        this.y += this.dy;
        this.draw();
    }
}

// Implementation

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getBalls = (len = 1) => {
    const arr = [];
    for (let i = 0; i <= len; i++) {
        const color = colors[getRandomInt(0, colors.length)];
        const radius = getRandomInt(2, 40);
        const dy = getRandomInt(2, 20);
        const x = getRandomInt(150, canvas.width - 150);
        const y = getRandomInt(150, canvas.height - 150);
        arr.push(new Ball(x, y, dy, radius, color));
    }
    return arr;
};
let ballArray = [];

function init() {
    ballArray = getBalls(500);
}
let isRunning = true;
// Animation Loop
function animate() {
    if (isRunning) {
        requestAnimationFrame(animate);
    }
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    ballArray.forEach((ball) => ball.update());
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
