import { useEffect, useRef } from "react";

type Particle = {
	x: number;
	y: number;
	r: number;
	vx: number;
	vy: number;
	a: number;
};

export default function Backdrop() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;
		let animationId: number;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resize();
		window.addEventListener("resize", resize);

		// Placeholder dark palette (easy to swap later)
		const bgTop = "#0b0e14";
		const bgBottom = "#05070c";
		const particleColor = "255, 255, 255"; // keep white for now

		const particles: Particle[] = Array.from({ length: 40 }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			r: Math.random() * 2.2 + 0.8,
			vx: (Math.random() - 0.5) * 0.1,
			vy: (Math.random() - 0.5) * 0.1,
			a: Math.random() * 0.25 + 0.12,
		}));

		const drawBackground = () => {
			const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
			grad.addColorStop(0, bgTop);
			grad.addColorStop(1, bgBottom);

			ctx.fillStyle = grad;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		};

		const tick = () => {
			drawBackground();

			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0) p.x = canvas.width;
				if (p.x > canvas.width) p.x = 0;
				if (p.y < 0) p.y = canvas.height;
				if (p.y > canvas.height) p.y = 0;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${particleColor}, ${p.a})`;
				ctx.fill();
			}

			animationId = requestAnimationFrame(tick);
		};

		tick();

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed inset-0 -z-10"
		/>
	);
}
