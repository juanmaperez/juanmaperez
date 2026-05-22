import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const isMobile = (): boolean =>
	typeof window !== 'undefined' &&
	window.matchMedia('(max-width: 768px)').matches;

export function initHomeWorkItems(): void {
	const items = document.querySelectorAll<HTMLElement>('[data-work-item]');
	if (!items.length) return;

	if (prefersReducedMotion()) return;

	items.forEach((item) => {
		const index = Number(item.dataset.workIndex ?? '0');
		const image = item.querySelector<HTMLElement>('.home-works__image img');
		const wrapper = item.querySelector<HTMLElement>('[data-work-wrapper]');

		if (image) {
			ScrollTrigger.create({
				trigger: wrapper ?? item,
				start: 'top 90%',
				end: '+=110%',
				animation: gsap.fromTo(image, { y: 0 }, { y: 140, ease: 'none' }),
				scrub: true,
			});
		}

		if (wrapper) {
			const moveUp = isMobile() ? -60 : -200;
			const yEnd =
				index < 4 ? -60 * index : moveUp + index * -10;
			ScrollTrigger.create({
				trigger: item,
				start: 'top 90%',
				end: '+=90%',
				animation: gsap.fromTo(wrapper, { y: 0 }, { y: yEnd, ease: 'power1.in' }),
				scrub: true,
			});
		}
	});
}
