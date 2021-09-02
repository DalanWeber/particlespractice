const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(canvas)
// console.log(ctx)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "white";
});
let hue = 0;
const mouse = {
    x: undefined,
    y: undefined,
};
canvas.addEventListener("click", function (event) {
    //   drawSquare(event.x, event.y);
    particlesArray.push(new Particle());
});
canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle());
    }
    //   drawCircle();
});

class Particle {
    constructor() {
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 16 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl( " + hue + ",100%, 50%)";
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// function init() {
//     for (let i = 0; i < 1; i++) {
//         particlesArray.push(new Particle());
//     }
// }
// init();

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = 0; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const hyp = Math.sqrt(dx * dx + dy * dy);
            if (hyp < 50) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = .5
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.9) {
            particlesArray.splice(i, 1);
            i--;
        }
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

function animate() {
    // ctx.fillStyle='rgba(105,105,105,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 5;
    requestAnimationFrame(animate);
}
animate();
