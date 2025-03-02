import "./assets/index.css";

const MAX_RADIUS = 40;
const colors = [
    "#FF6B6B", // Soft Red
    "#F7B801", // Warm Yellow
    "#6A0572", // Deep Purple
    "#4ECDC4", // Teal Blue
    "#1A535C", // Dark Cyan
    "#FF9F1C", // Bright Orange
    "#2EC4B6", // Aqua Green
    "#FF577F", // Coral Pink
    "#8D6E63", // Earthy Brown
    "#3D348B", // Royal Blue
    "#D81159", // Crimson Red
    "#218380", // Deep Teal
    "#FFBF69", // Soft Peach
    "#4A90E2", // Cool Blue
    "#2E294E", // Midnight Purple
    "#FF5A5F", // Watermelon
    "#4CAF50", // Fresh Green
    "#FF8552", // Soft Orange
    "#B388EB", // Lavender Purple
    "#E63946", // Strong Red
];
function getRandomIndex() {
    return Math.floor(Math.random() * colors.length);
}
function getRandomRadius() {
    return Math.random() * (20 - 3) + 3;
}
function main() {
    const canvasHeight = 600;
    const canvasWidth = 600;
    const canvas = document.getElementById("canvas");

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    const isInsideCanvas = (clientX, clientY) => {
        const canvasPos = canvas.getBoundingClientRect();
        if (
            canvasPos.left <= clientX &&
            canvasPos.right >= clientX &&
            canvasPos.top <= clientY &&
            canvasPos.bottom >= clientY
        ) {
            return true;
        }
        return false;
    };

    const mouse = {
        x: undefined,
        y: undefined,
        clientX: 0,
        clientY: 0,
    };

    window.addEventListener("mousemove", (e) => {
        if (isInsideCanvas(e.clientX, e.clientY)) {
            mouse.x = e.x;
            mouse.y = e.y;
            mouse.clientX = e.clientX;
            mouse.clientY = e.clientY;
        } else {
            mouse.x = undefined;
            mouse.y = undefined;
        }
    });

    function Circle(x, y, dx, dy, radius = 30) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.MIN_RADIUS = radius;
        this.color = colors[getRandomIndex()];

        this.draw = function () {
            context.beginPath();
            context.strokeStyle = "blue";
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = this.color;
            context.fill();
        };
        this.update = function () {
            if (
                this.x + this.radius > canvasWidth ||
                this.x - this.radius < 0
            ) {
                this.dx = -this.dx;
            }
            if (
                this.y + this.radius > canvasHeight ||
                this.y - this.radius < 0
            ) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
            if (
                mouse.x - this.x < 50 &&
                mouse.x - this.x > -50 &&
                mouse.y - this.y < 50 &&
                mouse.y - this.y > -50 &&
                this.radius < MAX_RADIUS
            ) {
                this.radius += 1;
            } else if (this.radius > this.MIN_RADIUS) {
                this.radius -= 1;
            }
            this.draw();
        };
    }

    const getCircles = (len = 1) => {
        const circleList = [];
        for (let i = 0; i <= len; i++) {
            const randomX = Math.random() * canvasWidth;
            const randomY = Math.random() * canvasHeight;
            const dx = Math.random() - 0.5;
            const dy = Math.random() - 0.5;
            const radius = getRandomRadius();
            circleList.push(new Circle(randomX, randomY, dx, dy, radius));
        }
        return circleList;
    };

    const circles = getCircles(1000);

    let isRunning = true;
    function animate() {
        if (isRunning) {
            requestAnimationFrame(animate);
        }
        context.clearRect(0, 0, innerWidth, innerHeight);
        circles.forEach((circle) => circle.update());
    }
    animate();

    const startButton = document.getElementById("start_button");
    const stopButton = document.getElementById("stop_button");

    startButton.addEventListener("click", () => {
        if (isRunning) {
            return;
        }
        isRunning = true;
        animate();
    });
    stopButton.addEventListener("click", () => {
        if (!isRunning) {
            return;
        }
        isRunning = false;
    });
}

main();
