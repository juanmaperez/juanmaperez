import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function initHomeContact(root: ParentNode = document): void {
	const block = root.querySelector<HTMLElement>('[data-home-contact]');
	const cover = root.querySelector<HTMLElement>('[data-home-contact-cover]');
	const content = root.querySelector<HTMLElement>('[data-home-contact-content]');

	if (!block) return;

	if (prefersReducedMotion()) {
		if (cover) gsap.set(cover, { scaleY: 1 });
		if (content) gsap.set(content, { autoAlpha: 1, y: 0 });
		return;
	}

	if (cover) {
		gsap.set(cover, { scaleY: 0, transformOrigin: 'top center' });
		ScrollTrigger.create({
			trigger: block,
			start: 'top 90%',
			end: '+=70%',
			animation: gsap.to(cover, { scaleY: 1, ease: 'power1.in', duration: 1 }),
			scrub: true,
		});
	}

	if (content) {
		gsap.set(content, { autoAlpha: 0, y: 100 });
		ScrollTrigger.create({
			trigger: block,
			start: 'top 80%',
			end: '+=15%',
			animation: gsap.to(content, {
				autoAlpha: 1,
				y: 0,
				ease: 'power1.in',
				duration: 1,
			}),
			scrub: true,
		});
	}
}
