import gsap from 'gsap';
import { prefersReducedMotion } from './reduced-motion';

/** Personal photo enters on load (legacy Personal spring), not when typewriter finishes. */
function initCvPersonalPhoto(): void {
	const photo = document.querySelector<HTMLElement>('[data-cv-personal-photo]');
	if (!photo) return;

	if (prefersReducedMotion()) {
		gsap.set(photo, { x: 0, autoAlpha: 1 });
		return;
	}

	gsap.fromTo(
		photo,
		{ x: -300, autoAlpha: 0 },
		{ x: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
	);
}

export function initCvStagger(): void {
	initCvPersonalPhoto();

	const reveal = () => {
		const blocks = document.querySelectorAll<HTMLElement>('[data-cv-reveal]');
		if (!blocks.length) return;

		if (prefersReducedMotion()) {
			gsap.set(blocks, { autoAlpha: 1, x: 0 });
			blocks.forEach((el) => el.classList.add('cv-reveal-ready'));
			return;
		}

		gsap.set(blocks, { autoAlpha: 0, x: -40 });
		gsap.to(blocks, {
			autoAlpha: 1,
			x: 0,
			duration: 0.8,
			stagger: 0.15,
			ease: 'power2.out',
			onComplete: () => {
				blocks.forEach((el) => el.classList.add('cv-reveal-ready'));
			},
		});
	};

	if (prefersReducedMotion()) {
		reveal();
	} else {
		document.addEventListener('cv:ready', reveal, { once: true });
	}
}
