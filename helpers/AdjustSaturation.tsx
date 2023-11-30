export const adjustSaturation = (color: string, factor: number) => {
	// Convert the hex color to HSL
	const hslRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	const [, r, g, b] = hslRegex.exec(color) || [];
	const rDecimal = parseInt(r, 16) / 255;
	const gDecimal = parseInt(g, 16) / 255;
	const bDecimal = parseInt(b, 16) / 255;

	const max = Math.max(rDecimal, gDecimal, bDecimal);
	const min = Math.min(rDecimal, gDecimal, bDecimal);
	const l = (max + min) / 2;

	let s, h;

	if (max === min) {
		s = 0;
		h = 0; // achromatic
	} else {
		s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
		h =
			max === rDecimal
				? ((gDecimal - bDecimal) / (max - min)) * 60
				: max === gDecimal
				? (2 + (bDecimal - rDecimal) / (max - min)) * 60
				: (4 + (rDecimal - gDecimal) / (max - min)) * 60;
		h = h < 0 ? h + 360 : h;
	}

	// Adjust saturation
	const newSat = s * factor;

	// Convert back to hex
	const hslToRgb = (h, s, l) => {
		const c = (1 - Math.abs(2 * l - 1)) * s;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = l - c / 2;
		let r, g, b;
		if (h >= 0 && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (h >= 60 && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (h >= 120 && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (h >= 180 && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (h >= 240 && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else {
			r = c;
			g = 0;
			b = x;
		}
		r = (r + m) * 255;
		g = (g + m) * 255;
		b = (b + m) * 255;
		return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g)
			.toString(16)
			.padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
	};

	return hslToRgb(h, newSat, l);
};
