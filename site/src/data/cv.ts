// site/src/data/cv.ts — verbatim legacy CV strings (Story 3.4 parity)
export const cvData = {
	personal: {
		name: 'Juanma Perez',
		role: 'Software Engineer',
		email: 'juanmaperezvar@gmail.com',
		phone: '07447 881 161',
		website: 'https://juanmaperez.dev',
		image: '/images/cv/juanma_perez.jpg',
	},
	summary: [
		'Results-oriented software engineer with 6 years experience with the most advanced technologies in development.',
		"I'm focused on improving UX and product interfaces through finding the best approach to interactions.",
		'Code efficiency is a central feature of my work, as past projects have involved managing large amounts of data.',
	],
	experiences: [
		{
			company: "Sainsbury's Tech",
			role: 'Software Engineer',
			dates: '01/2020 | nowadays',
			bullets: [
				'Components and view development using React, Redux, and Typescript.',
				'Update codebase to functional components using React Hooks.',
				'TDD with Jest and Enzyme. Creating reusable and isolated components using Storybook.',
				'Migrating the React project into NextJS to take advantage of SSR.',
				'Creation and improvement of our services in Go.',
				'Responsible of pairing sessions and onboarding of new colleagues.',
				'Development with new technologies such as GraphQL, Apollo, GatsbyJS y Prisma.',
				'CI/CD with SCRUM methodologies.',
			],
		},
		{
			company: 'Colossus Bets',
			role: 'Senior Front End Engineer',
			dates: '06/2018 | 01/2020',
			bullets: [
				'Development with Angular and React.',
				'State management with Redux and Ngrx.',
				'TDD with Jest and Enzyme.',
				'Mocked API with NodeJs and Express.',
				'Data management with RXJS.',
				'UI implementations for improving the UX.',
				'Microsites created with GatsbyJS, GraphQL and Apollo.',
				'Styling with Styled-Components and SASS.',
				'SCRUM methodologies.',
			],
		},
		{
			company: 'Crealogix',
			role: 'Front End Engineer',
			dates: '11/2017 | 06/2018',
			bullets: [
				'Development with Angular 5.',
				'Custom Implementations from the Angular Router.',
				'Develop new Modules for the main App.',
				'Fetching Data from API through HTTP requests.',
				'Styling with SASS.',
				'Tasks development based on SCRUM methodologies.',
			],
		},
	],
	education: [
		{
			title: 'Software Development MEAM/MERN stack',
			institution: 'Iron Hack',
			details:
				'NodeJs | Angular | React | Redux | GatsbyJs | ExpressJs | Git | MongoDB | SASS | Styled-components',
		},
		{
			title: 'Web Development',
			institution: 'CEI',
			details:
				'HTML5 | CSS3 | Javascript | jQuery | Ajax | PHP | MySQL | Bootstrap | RWD | Graphic Design | Web Design',
		},
	],
	skills: [
		'Animations with GreenSock, React-Spring and React-transitions',
		'Problem Solving and bug fixing',
		'Functional Programming',
		'UI implementations and UX focus',
	],
} as const;

export type CvData = typeof cvData;
