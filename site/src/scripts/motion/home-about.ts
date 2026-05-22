import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function initHomeAbout(): void {
	const section = document.querySelector('[data-home-about]');
	const image = document.querySelector<HTMLElement>('[data-home-about-image]');
	const paragraphs = document.querySelectorAll<HTMLElement>(
		'[data-home-about] [data-home-about-p]',
	);
	const works = document.querySelector('[data-home-works]');

	if (!section) return;

	if (prefersReducedMotion()) {
		paragraphs.forEach((p) => p.classList.add('is-visible'));
		if (image) gsap.set(image, { autoAlpha: 1, x: 0 });
		return;
	}

	paragraphs.forEach((p) => {
		ScrollTrigger.create({
			trigger: p,
			start: 'top 80%',
			onEnter: () => p.classList.add('is-visible'),
			onLeaveBack: () => p.classList.remove('is-visible'),
		});
	});

	if (image) {
		gsap.set(image, { autoAlpha: 0, x: 60 });
		ScrollTrigger.create({
			trigger: section,
			start: 'top 81%',
			end: '+=20%',
			animation: gsap.to(image, { autoAlpha: 1, x: 0, duration: 0.6 }),
			scrub: false,
			toggleActions: 'play none none reverse',
		});

		if (works) {
			ScrollTrigger.create({
				trigger: works,
				start: 'top bottom',
				onEnter: () => image.classList.add('is-pinned'),
				onLeaveBack: () => image.classList.remove('is-pinned'),
			});
		}
	}
}
