import { prefersReducedMotion } from './reduced-motion';

const TYPE_INTERVAL_MS = 20;

export function initCvTypewriter(): void {
	const root = document.querySelector<HTMLElement>('[data-cv-typewriter]');
	const target = root?.querySelector<HTMLElement>('[data-cv-typewriter-text]');
	const text = root?.dataset.cvTypewriterText?.trim() ?? '';

	if (!root || !target || !text) {
		document.dispatchEvent(new CustomEvent('cv:ready'));
		return;
	}

	if (prefersReducedMotion()) {
		target.textContent = text;
		document.dispatchEvent(new CustomEvent('cv:ready'));
		return;
	}

	let index = 0;
	const tick = () => {
		if (index <= text.length - 1) {
			target.textContent += text[index];
			index += 1;
		} else {
			window.clearInterval(intervalId);
			document.dispatchEvent(new CustomEvent('cv:ready'));
		}
	};

	const intervalId = window.setInterval(tick, TYPE_INTERVAL_MS);
}
