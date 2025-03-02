import "./assets/index.css";

function main() {
    const canvasHeight = 600;
    const canvasWidth = 600;
    const canvas = document.getElementById("canvas");

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    //rectangle
    // for (let i = 50; i <= 400; i += 110) {
    //     //x , y, height, width
    //     context.fillStyle = "green";
    //     context.fillRect(i, i, 100, 100);
    // }

    //line
    // context.beginPath();
    // //x and y coordinates
    // context.moveTo(200, 100);
    // context.lineTo(500, 100);
    // context.lineTo(500, 400);
    // context.lineTo(200, 100);
    // context.strokeStyle = "blue";
    // context.stroke();

    //arc /circle
    // context.beginPath();
    // context.strokeStyle = "black";
    // context.arc(200, 300, 70, 0, Math.PI * 0.6, false);
    // context.stroke();
    // //second one
    // context.beginPath();
    // context.strokeStyle = "red";
    // context.arc(200, 300, 70, Math.PI * 0.6, Math.PI * 0.9, false);
    // context.stroke();
    // //second one
    // context.beginPath();
    // context.strokeStyle = "blue";
    // context.arc(200, 300, 70, Math.PI * 0.9, Math.PI * 1.2, false);
    // context.stroke();
    // //third one
    // context.beginPath();
    // context.strokeStyle = "blue";
    // context.arc(200, 300, 70, Math.PI * 1.2, Math.PI * 2, false);
    // context.stroke();

    //animating circle
    //third one
    function Circle(x, y, dx, dy, radius = 30) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.draw = function () {
            context.beginPath();
            context.strokeStyle = "blue";
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.stroke();
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
            this.draw();
        };
    }

    const getCircles = (len = 1) => {
        const circleList = [];
        for (let i = 0; i <= len; i++) {
            const randomX = Math.random() * canvasWidth;
            const randomY = Math.random() * canvasHeight;
            const dx = (Math.random() - 0.5) * 10;
            const dy = (Math.random() - 0.5) * 10;
            const radius = 10;
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
