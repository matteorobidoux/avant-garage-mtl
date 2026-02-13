import React from "react";
import site from "../data/site.json";
import logoImg from "../images/logo.webp";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="bg-black border-t border-white/5 py-5 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					{/* Logo / Brand */}
					<div className="flex items-center gap-3">
						<img
							src={logoImg}
							alt="Avant Garage MTL"
							className="h-12 w-12 rounded-full object-cover opacity-90"
							onError={(e) => {
								e.target.style.display = "none";
							}}
						/>
						<div className="flex flex-col leading-none">
							<span className="font-display text-white text-2xl tracking-[0.1em] uppercase leading-none">
								Avant Garage
							</span>
							<span className="text-[11px] tracking-[0.5em] text-amber-400 uppercase font-semibold leading-none mt-0.5">
								MTL
							</span>
						</div>
					</div>

					{/* Copyright */}
					<p className="text-zinc-600 text-xs tracking-wide">
						© {year} Avant Garage MTL · All rights reserved
					</p>
				</div>
			</div>
		</footer>
	);
}
