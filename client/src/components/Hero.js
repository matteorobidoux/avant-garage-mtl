import React, { useEffect, useRef } from "react";
import hero from "../data/hero.json";
import porscheImg from "../images/gt3rs.webp";

export default function Hero() {
	const videoRef = useRef(null);

	const handleCta = () => {
		document
			.querySelector(hero.ctaAnchor)
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
		>
			{/* Background image - Porsche */}
			<div className="absolute inset-0 z-0">
				<img
					src={porscheImg}
					alt="Luxury vehicle"
					className="w-full h-full object-cover object-center"
					onError={(e) => {
						e.target.parentElement.style.background =
							"linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)";
						e.target.style.display = "none";
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
				<div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
				<div className="absolute inset-0 opacity-20 noise-overlay" />
			</div>

			{/* Top accent line */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent z-10" />

			{/* Content — pt-28 clears the navbar, pb-24 clears the scroll indicator */}
			<div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full pt-28 pb-24">
				{/* Label */}
				<div
					className="flex items-center justify-center gap-3 mb-8 animate-fade-in-up"
					style={{ animationDelay: "0.2s" }}
				>
					<div className="h-px w-8 bg-amber-400/60 flex-shrink-0" />
					<span className="text-amber-400 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase font-medium">
						Automotive Consulting & Concierge
					</span>
					<div className="h-px w-8 bg-amber-400/60 flex-shrink-0" />
				</div>

				{/* Main Headlines */}
				<div className="space-y-1 mb-10">
					{hero.headline.map((line, i) => (
						<p
							key={i}
							className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-none animate-fade-in-up"
							style={{ animationDelay: `${0.35 + i * 0.1}s` }}
						>
							{line}
						</p>
					))}
				</div>

				{/* Subheadline */}
				<p
					className="text-zinc-400 text-base md:text-xl tracking-wide max-w-lg mx-auto mb-10 animate-fade-in-up"
					style={{ animationDelay: "0.7s" }}
				>
					{hero.subheadline}
				</p>

				{/* CTA Buttons */}
				<div
					className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4"
					style={{ animationDelay: "0.85s" }}
				>
					<button
						onClick={handleCta}
						className="group relative overflow-hidden bg-amber-400 text-black text-sm font-bold tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
					>
						<span className="relative z-10">{hero.ctaText}</span>
						<div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
					</button>

					<button
						onClick={() =>
							document
								.querySelector("#services")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="text-sm font-medium tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors duration-200 border border-white/10 px-10 py-4 hover:border-white/30 w-full sm:w-auto"
					>
						Our Services
					</button>
				</div>
			</div>

			{/* Scroll indicator — absolute bottom, won't overlap content */}
			<div
				className="absolute bottom-6 left-0 right-0 z-10 hidden sm:flex flex-col items-center gap-2 animate-fade-in-up"
				style={{ animationDelay: "1.2s" }}
			>
				<span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">
					Scroll
				</span>
				<div className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
			</div>

			{/* Bottom gradient */}
			<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />
		</section>
	);
}
