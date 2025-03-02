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
    let x = Math.random() * canvasWidth;
    let y = Math.random() * canvasHeight;

    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10;
    const radius = 30;
    let isRunning = true;
    function animate() {
        if (isRunning) {
            requestAnimationFrame(animate);
        }
        context.clearRect(0, 0, innerWidth, innerHeight);
        context.beginPath();
        context.strokeStyle = "blue";
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.stroke();
        if (x + radius > canvasWidth || x - radius < 0) {
            dx = -dx;
        }
        if (y + radius > canvasHeight || y - radius < 0) {
            dy = -dy;
        }
        x += dx;
        y += dy;
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
