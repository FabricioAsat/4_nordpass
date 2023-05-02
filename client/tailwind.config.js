/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				nunito: "Nunito",
			},
			colors: {
				dark1: "#303030",
				dark2: "#2b2b2b",
				dark3: "#1f1f1f",
				dark4: "#1b1c1e",
			},
		},
	},
	plugins: [],
};
