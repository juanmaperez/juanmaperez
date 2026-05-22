import gsap from 'gsap';
import { prefersReducedMotion } from './reduced-motion';

export function initHeaderIntro(): void {
	const header = document.querySelector<HTMLElement>('.site-header');
	if (!header) return;

	if (prefersReducedMotion()) {
		gsap.set(header, { autoAlpha: 1, y: 0 });
		return;
	}

	gsap.fromTo(
		header,
		{ autoAlpha: 0, y: -30 },
		{ autoAlpha: 1, y: 0, duration: 0.5, ease: 'power1.out' },
	);
}
