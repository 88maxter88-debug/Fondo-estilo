const canvas = document.getElementById('interactive-bg');
const ctx = canvas.getContext('2d');
const savia = document.getElementById('savia-progress');

let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 120
};

// Ajustar tamaño del canvas
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Lógica de Scroll
window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrollPercent = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    savia.style.height = scrollPercent + '%';
});

// Clase Partícula
class Particle {
    constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Interacción con mouse
        let dist = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2);
        if (dist < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 2;
            if (mouse.x > this.x && this.x > 10) this.x -= 2;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let n = (canvas.width * canvas.height) / 10000;
    for (let i = 0; i < n; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let dx = (Math.random() - 0.5) * 0.5;
        let dy = (Math.random() - 0.5) * 0.5;
        let color = i > n * 0.9 ? '#00f2ff' : 'rgba(255,255,255,0.2)';
        particlesArray.push(new Particle(x, y, dx, dy, size, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    requestAnimationFrame(animate);
}

resize();
animate();