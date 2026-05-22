const COOKIE_NAME = 'animationCompleted';

export function hasAnimationCompletedCookie(): boolean {
	if (typeof document === 'undefined') return false;
	return document.cookie.split(';').some((part) => {
		const [name] = part.trim().split('=');
		return name === COOKIE_NAME;
	});
}

export function setAnimationCompletedCookie(): void {
	const expires = new Date();
	expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
	document.cookie = `${COOKIE_NAME}=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}
