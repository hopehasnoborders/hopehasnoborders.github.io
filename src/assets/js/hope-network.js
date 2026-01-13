class HopeNetwork {
    constructor() {
        this.canvas = document.getElementById('hope-network');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: null, y: null };
        this.resizeTimeout = null;

        // Configuration
        this.nodeCount = 60; // Base count, scales with screen size
        this.connectionDistance = 150;
        this.mouseDistance = 200;
        this.baseSpeed = 0.5;
        this.colors = {
            node: 'rgba(255, 184, 28, 0.4)', // yarrow #FFB81C
            line: 'rgba(255, 184, 28, 0.15)'
        };

        this.init();
    }

    init() {
        this.resize();
        this.createNodes();
        this.addEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Adjust node count based on screen area
        const area = this.canvas.width * this.canvas.height;
        this.nodeCount = Math.floor(area / 15000); // 1 node per 15000px²
    }

    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.baseSpeed,
                vy: (Math.random() - 0.5) * this.baseSpeed,
                size: Math.random() * 2 + 1
            });
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resize();
                this.createNodes();
            }, 200);
        });

        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    update() {
        this.nodes.forEach(node => {
            // Move
            node.x += node.vx;
            node.y += node.vy;

            // Mouse interaction (gentle repulsion)
            if (this.mouse.x != null) {
                const dx = node.x - this.mouse.x;
                const dy = node.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouseDistance) {
                    const force = (this.mouseDistance - distance) / this.mouseDistance;
                    const angle = Math.atan2(dy, dx);
                    node.vx += Math.cos(angle) * force * 0.05;
                    node.vy += Math.sin(angle) * force * 0.05;
                }
            }

            // Speed limit
            const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (speed > this.baseSpeed * 2) {
                node.vx = (node.vx / speed) * this.baseSpeed * 2;
                node.vy = (node.vy / speed) * this.baseSpeed * 2;
            }

            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        this.ctx.strokeStyle = this.colors.line;
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.globalAlpha = 1 - (distance / this.connectionDistance);
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.globalAlpha = 1;

        // Draw nodes
        this.ctx.fillStyle = this.colors.node;
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HopeNetwork();
});
