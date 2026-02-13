import React, { useEffect, useRef, useState } from "react";
import about from "../data/about.json";
import porscheImg from "../images/gt3rs.webp";

function useInView(threshold = 0.15) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setVisible(true);
			},
			{ threshold }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [threshold]);
	return [ref, visible];
}

export default function About() {
	const [sectionRef, sectionVisible] = useInView();
	const [imgRef, imgVisible] = useInView(0.1);

	return (
		<section
			id="about"
			className="relative bg-black py-32 px-6 overflow-hidden"
		>
			{/* Background accent */}
			<div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-400/[0.03] to-transparent pointer-events-none" />

			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
					{/* Left: Image side */}
					<div
						ref={imgRef}
						className={`relative transition-all duration-1000 ${imgVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
					>
						{/* Main image frame */}
						<div className="relative">
							<div className="absolute -inset-3 border border-white/5" />
							<div className="absolute -inset-6 border border-amber-400/10" />
							<img
								src={porscheImg}
								alt="Luxury Porsche"
								className="w-full aspect-[4/3] object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
								onError={(e) => {
									e.target.src = "";
									e.target.parentElement.style.background = "#111";
									e.target.parentElement.style.minHeight = "300px";
									e.target.style.display = "none";
								}}
							/>
							{/* Overlay label */}
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
								<span className="text-[10px] tracking-[0.4em] text-amber-400/70 uppercase">
									Avant Garage MTL
								</span>
							</div>
						</div>
					</div>

					{/* Right: Text side */}
					<div
						ref={sectionRef}
						className={`transition-all duration-1000 delay-200 ${sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
					>
						<span className="text-amber-400 text-xs tracking-[0.45em] uppercase font-medium mb-4 block">
							{about.sectionLabel}
						</span>
						<h2 className="font-display text-4xl md:text-5xl text-white font-black tracking-tighter mb-10 leading-tight">
							{about.heading}
						</h2>

						<div className="space-y-5">
							{about.paragraphs.map((p, i) => (
								<p
									key={i}
									className="text-zinc-400 text-sm leading-relaxed"
									style={{
										transitionDelay: `${300 + i * 80}ms`
									}}
								>
									{p}
								</p>
							))}
						</div>

						{/* Signature detail */}
						<div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4">
							<div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4 text-amber-400"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
									/>
								</svg>
							</div>
							<div>
								<div className="text-white text-sm font-semibold">
									Justin Guindon
								</div>
								<div className="text-zinc-500 text-xs tracking-wide">
									Avant Garage MTL
								</div>
							</div>
						</div>

						<button
							onClick={() =>
								document
									.querySelector("#contact")
									?.scrollIntoView({ behavior: "smooth" })
							}
							className="mt-8 inline-flex items-center gap-3 bg-amber-400 text-black text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-amber-300 transition-colors duration-200"
						>
							Work With Me
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-3.5 h-3.5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
