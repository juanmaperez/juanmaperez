import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function initHomeMainBlock(options: {
	skipIntro: boolean;
	onIntroComplete?: () => void;
}): void {
	const hero = document.querySelector<HTMLElement>('[data-home-hero]');
	const cover = document.querySelector<HTMLElement>('.home-hero__cover');
	const links = document.querySelectorAll<HTMLElement>('.home-hero__links li');

	if (!hero) return;

	if (options.skipIntro || prefersReducedMotion()) {
		gsap.set(hero, { autoAlpha: 1 });
		gsap.set(cover, { display: 'none' });
		gsap.set(links, { autoAlpha: 1, y: 0 });
		options.onIntroComplete?.();
	} else {
		gsap.set(hero, { autoAlpha: 0 });
		gsap.set(cover, { scaleX: 0, transformOrigin: '0 0' });
		gsap.set(links, { autoAlpha: 0, y: 20 });

		const tl = gsap.timeline({
			onComplete: () => options.onIntroComplete?.(),
		});

		tl.to(hero, { autoAlpha: 1, duration: 0.4 })
			.to(
				cover,
				{
					scaleX: 1,
					duration: 0.5,
					ease: 'power1.in',
				},
				'+=0.9',
			)
			.to(cover, { scaleX: 0, duration: 0.5, ease: 'power1.in' })
			.to(cover, { scaleY: 0, duration: 0.5, ease: 'power1.in' }, '+=0.2')
			.to(
				links,
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.08,
					ease: 'none',
				},
				'-=0.3',
			)
			.delay(0.5);
	}

	const list = document.querySelector('.home-hero__links');
	if (list && !prefersReducedMotion()) {
		ScrollTrigger.create({
			trigger: list,
			start: 'top 80%',
			end: '+=10%',
			animation: gsap.to(list, { autoAlpha: 0, duration: 0.6 }),
			scrub: false,
			toggleActions: 'play none none reverse',
		});
	}
}
