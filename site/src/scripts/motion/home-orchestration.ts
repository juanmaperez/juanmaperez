import {
	hasAnimationCompletedCookie,
	setAnimationCompletedCookie,
} from './cookies';
import { prefersReducedMotion } from './reduced-motion';

export function isHomeReady(): boolean {
	return document.documentElement.dataset.homeReady === 'true';
}

export function revealHomeBlocks(): void {
	document.documentElement.dataset.homeReady = 'true';
}

export function shouldSkipHomeIntro(): boolean {
	return prefersReducedMotion() || hasAnimationCompletedCookie();
}

export function markHomeIntroComplete(): void {
	if (!prefersReducedMotion()) {
		setAnimationCompletedCookie();
	}
	revealHomeBlocks();
}
