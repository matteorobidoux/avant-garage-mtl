import React, { useState, useEffect, useRef } from "react";
import logoImg from "../images/logo.webp";

function LogoMark() {
	const [imgError, setImgError] = React.useState(false);
	if (imgError) {
		return (
			<div className="h-14 w-14 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
				<span className="font-display text-black text-sm tracking-widest">
					AG
				</span>
			</div>
		);
	}
	return (
		<img
			src={logoImg}
			alt="Avant Garage MTL"
			className="h-14 w-14 rounded-full object-cover flex-shrink-0"
			onError={() => setImgError(true)}
		/>
	);
}

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const navRef = useRef(null);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Auto-close menu when resizing to desktop
	useEffect(() => {
		const onResize = () => {
			if (window.innerWidth >= 768) setMenuOpen(false);
		};
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	const navLinks = [
		{ label: "Services", href: "#services" },
		{ label: "About", href: "#about" },
		{ label: "Contact", href: "#contact" }
	];

	const handleNav = (href) => {
		setMenuOpen(false);
		document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<nav
				ref={navRef}
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					menuOpen
						? "bg-black py-3"
						: scrolled
							? "bg-black/95 backdrop-blur-md border-b border-white/5 py-3"
							: "bg-transparent py-5"
				}`}
			>
				<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
					{/* Logo */}
					<a
						href="#hero"
						onClick={(e) => {
							e.preventDefault();
							handleNav("#hero");
						}}
						className="flex items-center gap-3 group"
					>
						<LogoMark />
						<div className="flex flex-col leading-none">
							<span className="font-display text-white text-3xl tracking-[0.1em] uppercase leading-none">
								Avant Garage
							</span>
							<span className="text-[13px] tracking-[0.55em] text-amber-400 uppercase font-semibold leading-none mt-1">
								MTL
							</span>
						</div>
					</a>

					{/* Desktop Links */}
					<div className="hidden md:flex items-center gap-10">
						{navLinks.map((link) => (
							<button
								key={link.label}
								onClick={() => handleNav(link.href)}
								className="text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors duration-200 font-medium"
							>
								{link.label}
							</button>
						))}
						<button
							onClick={() => handleNav("#contact")}
							className="text-xs tracking-[0.2em] uppercase bg-amber-400 text-black px-5 py-2.5 font-bold hover:bg-amber-300 transition-colors duration-200"
						>
							Get Started
						</button>
					</div>

					{/* Mobile: hamburger → X toggle */}
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="md:hidden flex items-center justify-center w-10 h-10"
						aria-label={menuOpen ? "Close menu" : "Open menu"}
					>
						{menuOpen ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
								stroke="currentColor"
								className="w-6 h-6 text-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-6 h-6 text-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						)}
					</button>
				</div>

				{/* Mobile Dropdown — inside <nav> so it's always physically attached, no gap */}
				<div
					className={`md:hidden border-t border-white/10 overflow-hidden transition-all duration-300 ${
						menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
					}`}
				>
					<div className="flex flex-col px-6 py-2">
						{navLinks.map((link) => (
							<button
								key={link.label}
								onClick={() => handleNav(link.href)}
								className="text-left text-sm tracking-[0.2em] uppercase text-zinc-300 hover:text-amber-400 transition-colors duration-200 font-medium py-3.5 border-b border-white/5 last:border-0"
							>
								{link.label}
							</button>
						))}
						<button
							onClick={() => handleNav("#contact")}
							className="my-3 text-sm tracking-[0.25em] uppercase bg-amber-400 text-black px-6 py-3 font-bold hover:bg-amber-300 transition-colors duration-200 text-center"
						>
							Get Started
						</button>
					</div>
				</div>
			</nav>

			{/* Backdrop — tap outside to close */}
			{menuOpen && (
				<div
					className="fixed inset-0 z-[44] md:hidden"
					onClick={() => setMenuOpen(false)}
				/>
			)}
		</>
	);
}
