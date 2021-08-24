const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(canvas)
// console.log(ctx)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(10, 10, 50, 50);
});

// const mouse = {
//   x: null,
//   y: null,
// };
// canvas.addEventListener("click", function (event) {
// //   drawSquare(event.x, event.y);
// });
// canvas.addEventListener("mousemove", function (event) {
//   mouse.x = event.x;
//   mouse.y = event.y;
// //   drawCircle();
// });

class Particle {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; 
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY= Math.random() * 3 - 1.5;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init(){
    for (let i = 0; i < 100; i++){
        particlesArray.push(new Particle())
    }
}
init();

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

// function drawSquare(x, y) {
//   ctx.fillStyle = "white";
//   ctx.fillRect(x, y, 50, 50);
// }

// function drawCircle() {
//   ctx.beginPath();
//   ctx.fillStyle = "blue";
//   ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
//   ctx.fill();
// }


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles()
    requestAnimationFrame(animate)
}
animate();