/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
		extend: {
			animation: {
				safelist: [
					"'animate-[fade-in_1s_ease-in-out]'",
					"'animate-[fade-in-down_1s_ease-in-out]'",
				],
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [{
			corporate: {

				"primary": "#1c4f82",

				"secondary": "#7d919b",

				"accent": "#eb6b47",

				"neutral": "#f3f4f6",

				"base-100": "#f3f4f6",

				"info": "#0092d6",

				"success": "#6cb288",

				"warning": "#daad58",

				"error": "#ab3d30",
			}
		}, 'business'],
	},
};
