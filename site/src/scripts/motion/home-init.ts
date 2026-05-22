import { initHomeAbout } from './home-about';
import { initHomeContact } from './home-contact';
import { initHomeMainBlock } from './home-main-block';
import {
	markHomeIntroComplete,
	shouldSkipHomeIntro,
} from './home-orchestration';
import { initHomeWorkItems } from './home-work-item';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHomeMotion(): void {
	const skipIntro = shouldSkipHomeIntro();

	const afterIntro = () => {
		if (!skipIntro) {
			markHomeIntroComplete();
		} else {
			document.documentElement.dataset.homeReady = 'true';
		}
		initHomeAbout();
		initHomeWorkItems();
		initHomeContact();
		ScrollTrigger.refresh();
	};

	if (skipIntro) {
		document.documentElement.dataset.homeReady = 'true';
	}

	initHomeMainBlock({ skipIntro, onIntroComplete: afterIntro });
}
