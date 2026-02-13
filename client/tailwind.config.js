/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				display: ["Bebas Neue", "Impact", "sans-serif"],
				sans: ["DM Sans", "sans-serif"]
			},
			colors: {
				amber: {
					300: "#FCD34D",
					400: "#FBBF24",
					500: "#F59E0B"
				}
			},
			animation: {
				"fade-in-up": "fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
				"fade-in": "fadeIn 1s ease forwards"
			},
			keyframes: {
				fadeInUp: {
					"0%": { opacity: "0", transform: "translateY(24px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" }
				}
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))"
			}
		}
	},
	plugins: []
};
