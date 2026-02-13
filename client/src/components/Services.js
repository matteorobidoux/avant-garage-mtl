import React, { useEffect, useRef, useState } from "react";
import services from "../data/services.json";

// Inline SVG icons (no external dep needed)
const icons = {
	Search: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
			/>
		</svg>
	),
	ClipboardCheck: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
	),
	Truck: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
			/>
		</svg>
	),
	BadgeDollarSign: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
	)
};

function ServiceCard({ service, index }) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setVisible(true);
			},
			{ threshold: 0.1 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const Icon = icons[service.icon] || icons.Search;

	return (
		<div
			ref={ref}
			className={`group relative border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-400/30 p-8 transition-all duration-500 cursor-default
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
			style={{
				transitionDelay: `${index * 100}ms`,
				transitionProperty: "opacity, transform, background, border-color"
			}}
		>
			{/* Top accent line */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/60 transition-all duration-500" />

			{/* Icon */}
			<div className="w-12 h-12 flex items-center justify-center border border-white/10 text-amber-400 mb-6 group-hover:border-amber-400/40 transition-all duration-300">
				<Icon />
			</div>

			{/* Number */}
			<div className="absolute top-6 right-6 text-[11px] tracking-[0.3em] text-white/10 font-mono group-hover:text-amber-400/30 transition-colors duration-300">
				0{service.id}
			</div>

			<h3 className="font-display text-xl text-white font-bold mb-3 tracking-tight group-hover:text-amber-50 transition-colors duration-300">
				{service.title}
			</h3>
			<p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
				{service.description}
			</p>
		</div>
	);
}

export default function Services() {
	const headingRef = useRef(null);
	const [headingVisible, setHeadingVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setHeadingVisible(true);
			},
			{ threshold: 0.1 }
		);
		if (headingRef.current) observer.observe(headingRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section id="services" className="relative bg-black py-32 px-6">
			{/* Decorative vertical line — continues the scroll indicator from Hero */}
			<div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24 bg-gradient-to-b from-amber-400/40 to-transparent" />

			<div className="max-w-6xl mx-auto">
				{/* Section header */}
				<div
					ref={headingRef}
					className={`text-center mb-20 transition-all duration-700 ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
				>
					<span className="text-amber-400 text-xs tracking-[0.45em] uppercase font-medium mb-4 block">
						{services.sectionLabel}
					</span>
					<h2 className="font-display text-5xl md:text-6xl text-white font-black tracking-tighter mb-6">
						{services.heading}
					</h2>
					<p className="text-zinc-500 text-base max-w-xl mx-auto leading-relaxed">
						{services.intro}
					</p>
				</div>

				{/* Cards grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
					{services.services.map((service, i) => (
						<ServiceCard key={service.id} service={service} index={i} />
					))}
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-16">
					<button
						onClick={() =>
							document
								.querySelector("#contact")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="text-sm tracking-[0.25em] uppercase text-amber-400 hover:text-amber-300 transition-colors duration-200 font-medium border-b border-amber-400/30 pb-1 hover:border-amber-300"
					>
						Request a Consultation →
					</button>
				</div>
			</div>
		</section>
	);
}
