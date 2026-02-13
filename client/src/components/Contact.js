import React, { useState, useRef, useEffect } from "react";
import contact from "../data/contact.json";
import site from "../data/site.json";

function useInView(threshold = 0.1) {
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

const SocialIcon = ({ platform }) => {
	if (platform === "Instagram")
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="w-4 h-4"
			>
				<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
			</svg>
		);
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-4 h-4"
		>
			<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
		</svg>
	);
};

export default function Contact() {
	const [formRef, formVisible] = useInView();
	const [infoRef, infoVisible] = useInView();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		budget: "",
		message: ""
	});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Invalid email address";
		return newErrors;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = validate();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		setLoading(true);
		// Simulate form submission (replace with real endpoint)
		setTimeout(() => {
			setLoading(false);
			setSubmitted(true);
		}, 1500);
	};

	const inputBase =
		"w-full bg-white/[0.03] border border-white/10 text-white text-sm px-4 py-3.5 placeholder-zinc-600 focus:outline-none focus:border-amber-400/50 focus:bg-white/[0.05] transition-all duration-200";

	return (
		<section
			id="contact"
			className="relative bg-zinc-950 py-32 px-6 overflow-hidden"
		>
			{/* Top accent line */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

			{/* Background glow */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-20">
					<span className="text-amber-400 text-xs tracking-[0.45em] uppercase font-medium mb-4 block">
						{contact.sectionLabel}
					</span>
					<h2 className="font-display text-5xl md:text-6xl text-white font-black tracking-tighter mb-5">
						{contact.heading}
					</h2>
					<p className="text-zinc-500 text-base max-w-md mx-auto leading-relaxed">
						{contact.subheading}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
					{/* Form - takes 3/5 */}
					<div
						ref={formRef}
						className={`lg:col-span-3 transition-all duration-700 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
					>
						{!submitted ? (
							<form onSubmit={handleSubmit} className="space-y-5">
								{contact.formFields.map((field) => {
									if (field.type === "select")
										return (
											<div key={field.id}>
												<label className="block text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-2">
													{field.label}
												</label>
												<select
													name={field.id}
													value={formData[field.id]}
													onChange={handleChange}
													className={`${inputBase} appearance-none cursor-pointer text-zinc-300`}
													style={{
														backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
														backgroundRepeat: "no-repeat",
														backgroundPosition: "right 1rem center",
														backgroundSize: "1rem"
													}}
												>
													{field.options.map((opt) => (
														<option
															key={opt.value}
															value={opt.value}
															className="bg-zinc-900"
														>
															{opt.label}
														</option>
													))}
												</select>
											</div>
										);

									if (field.type === "textarea")
										return (
											<div key={field.id}>
												<label className="block text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-2">
													{field.label}
												</label>
												<textarea
													name={field.id}
													value={formData[field.id]}
													onChange={handleChange}
													placeholder={field.placeholder}
													rows={field.rows}
													className={`${inputBase} resize-none`}
												/>
											</div>
										);

									return (
										<div key={field.id}>
											<label className="block text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-2">
												{field.label}
												{field.required && (
													<span className="text-amber-400 ml-1">*</span>
												)}
											</label>
											<input
												type={field.type}
												name={field.id}
												value={formData[field.id]}
												onChange={handleChange}
												placeholder={field.placeholder}
												className={`${inputBase} ${errors[field.id] ? "border-red-500/50" : ""}`}
											/>
											{errors[field.id] && (
												<p className="text-red-400 text-xs mt-1.5">
													{errors[field.id]}
												</p>
											)}
										</div>
									);
								})}

								<button
									type="submit"
									disabled={loading}
									className="w-full bg-amber-400 text-black text-sm font-bold tracking-[0.25em] uppercase py-4 hover:bg-amber-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
								>
									{loading ? (
										<>
											<div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
											Sending…
										</>
									) : (
										<>
											{contact.submitText}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={2.5}
												stroke="currentColor"
												className="w-4 h-4"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
												/>
											</svg>
										</>
									)}
								</button>
							</form>
						) : (
							<div className="h-full flex flex-col items-center justify-center text-center py-20 border border-white/5 bg-white/[0.02]">
								<div className="w-16 h-16 border border-amber-400/30 flex items-center justify-center mb-6">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-7 h-7 text-amber-400"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
									</svg>
								</div>
								<h3 className="font-display text-2xl text-white font-bold mb-2">
									Message Received
								</h3>
								<p className="text-zinc-500 text-sm max-w-xs">
									{contact.successMessage}
								</p>
							</div>
						)}
					</div>

					{/* Info sidebar - takes 2/5 */}
					<div
						ref={infoRef}
						className={`lg:col-span-2 flex flex-col gap-8 transition-all duration-700 delay-200 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
					>
						{/* Direct contact card */}
						<div className="border border-white/8 bg-white/[0.02] p-8">
							<h3 className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-6">
								Direct Contact
							</h3>

							<div className="space-y-5">
								<a
									href={`tel:${site.brand.phone}`}
									className="flex items-center gap-4 group"
								>
									<div className="w-9 h-9 border border-white/10 flex items-center justify-center group-hover:border-amber-400/30 transition-colors duration-200">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors duration-200"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
											/>
										</svg>
									</div>
									<div>
										<div className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-0.5">
											Phone
										</div>
										<div className="text-white text-sm group-hover:text-amber-400 transition-colors duration-200">
											{site.brand.phone}
										</div>
									</div>
								</a>

								<a
									href={`mailto:${site.brand.email}`}
									className="flex items-center gap-4 group"
								>
									<div className="w-9 h-9 border border-white/10 flex items-center justify-center group-hover:border-amber-400/30 transition-colors duration-200">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors duration-200"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
											/>
										</svg>
									</div>
									<div>
										<div className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-0.5">
											Email
										</div>
										<div className="text-white text-sm group-hover:text-amber-400 transition-colors duration-200 break-all">
											{site.brand.email}
										</div>
									</div>
								</a>
							</div>
						</div>

						{/* Social links */}
						<div className="border border-white/8 bg-white/[0.02] p-8">
							<h3 className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-6">
								Social
							</h3>
							<div className="space-y-4">
								{contact.socialLinks.map((social) => (
									<a
										key={social.platform}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-4 group"
									>
										<div className="w-9 h-9 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:border-amber-400/30 group-hover:text-amber-400 transition-all duration-200">
											<SocialIcon platform={social.platform} />
										</div>
										<div>
											<div className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-0.5">
												{social.platform}
											</div>
											<div className="text-white text-sm group-hover:text-amber-400 transition-colors duration-200">
												{social.handle}
											</div>
										</div>
									</a>
								))}
							</div>
						</div>

						{/* Response time note */}
						<div className="px-6 py-5 border-l-2 border-amber-400/40 bg-amber-400/[0.03]">
							<p className="text-zinc-400 text-xs leading-relaxed">
								<span className="text-amber-400 font-medium">
									Typically responds within 24 hours.
								</span>{" "}
								All consultations are completely free and there's no obligation
								to commit.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
