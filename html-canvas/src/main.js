import "./assets/index.css";

function main() {
    const canvas = document.getElementById("canvas");

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    //rectangle
    for (let i = 50; i <= 400; i += 110) {
        //x , y, height, width
        context.fillStyle = "green";
        context.fillRect(i, i, 100, 100);
    }

    //line
    context.beginPath();
    //x and y coordinates
    context.moveTo(200, 100);
    context.lineTo(500, 100);
    context.lineTo(500, 400);
    context.lineTo(200, 100);
    context.strokeStyle = "blue";
    context.stroke();

    //arc /circle
    context.beginPath();
    context.strokeStyle = "black";
    context.arc(200, 300, 70, 0, Math.PI * 0.6, false);
    context.stroke();
    //second one
    context.beginPath();
    context.strokeStyle = "red";
    context.arc(200, 300, 70, Math.PI * 0.6, Math.PI * 0.9, false);
    context.stroke();
    //second one
    context.beginPath();
    context.strokeStyle = "blue";
    context.arc(200, 300, 70, Math.PI * 0.9, Math.PI * 1.2, false);
    context.stroke();
    //third one
    context.beginPath();
    context.strokeStyle = "blue";
    context.arc(200, 300, 70, Math.PI * 1.2, Math.PI * 2, false);
    context.stroke();
}

main();
