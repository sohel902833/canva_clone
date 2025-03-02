import "./assets/index.css";
// import utils from "./utils";
import { resolveCollision } from "./utils";

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
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.dx = dx;
        this.radius = radius;
        this.color = color;
        this.mass = 1;
        this.velocity = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
        };
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    update(particles) {
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            if (this === particle) {
                continue;
            }
            const distance = getDistance(
                this.x,
                this.y,
                particle.x,
                particle.y
            );
            const isColliding = distance - this.radius * 2 < 0;

            if (isColliding) {
                resolveCollision(this, particle);
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

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
        const radius = getRandomInt(50, 100);
        const dy = getRandomInt(2, 20);
        const dx = getRandomInt(2, 20);
        let x = getRandomInt(radius, innerWidth - radius);
        let y = getRandomInt(radius, innerHeight - radius);
        // console.log("Hello", arr);
        if (i !== 0) {
            //i=2
            for (let j = 0; j < arr.length; j++) {
                const distance = getDistance(x, y, arr[j].x, arr[j].y);
                if (distance - radius * 2 < 0) {
                    x = getRandomInt(radius, innerWidth - radius);
                    y = getRandomInt(radius, innerHeight - radius);
                    j = -1;
                }
            }
        }
        arr.push(new Circle(x, y, dx, dy, radius, color));
    }
    return arr;
};
let circleArray = [];

function init() {
    circleArray = getCircles(4);
}
let isRunning = true;
// Animation Loop
function animate() {
    if (isRunning) {
        requestAnimationFrame(animate);
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    circleArray.forEach((circle) => circle.update(circleArray));
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
