---
path: '/blog/migrating-portfolio-from-gatsby-to-astro-using-sdd-with-bmad'
date: '2025-05-20T09:00:00+00:00'
title: "Migrating a portfolio from Gatsby v2 to Astro v6 using SDD with BMAD"
type: post
icon: ./../../../assets/icons/ai.png
category: 'ai'
tags: ['ai', 'bmad', 'sdd', 'astro', 'gatsby', 'software design document', 'migration']
excerpt: "I used Specification Driven Development with the BMAD method to migrate my portfolio from Gatsby v2 to Astro v6. What worked, what the agents missed, and why brownfield parity matters more than picking a framework."
---

I had been meaning to migrate this portfolio for a while. Gatsby v2 had served me well but it was aging, the plugin ecosystem had drifted, and Astro had been on my radar long enough that I had no more excuses. Rather than just diving in and rewriting things by feel, I decided to use the migration as an opportunity to try something I had been curious about: Specification Driven Development with the BMAD method.

This post is about that experience — what SDD with BMAD actually looks like in practice on a real, if small, project, and where it helped and where it fell short.

## What is SDD with BMAD?

Specification Driven Development means writing the full specification of what you are building before writing any code. You define the requirements, the architecture, and the individual units of work upfront, and then the implementation follows from those documents rather than being figured out on the fly.

BMAD is a method and a set of AI agents that help you produce those specifications. It works through a series of specialist roles — a product manager, an architect, a developer — each of which you engage in sequence to build up a layered set of documents: a PRD, architecture decisions, epics and user stories.

For this migration I started with a PRD, a tech stack decisions document, and epics and user stories. As the work got more concrete — especially anything about matching the old site — I added an architecture document, a migration parity checklist, and focused decision records (for example how to replace ScrollMagic with GSAP 3 on Astro). The project stayed small, but **replacing a live site** turned out to need more specification than I expected at the start.

## Starting with the PRD

The first step with BMAD is working with the product manager agent to produce a Product Requirements Document. You describe what you want to achieve, the agent asks clarifying questions, and together you build a document that captures the scope of the project.

For this migration the PRD covered the main goals: moving off Gatsby, adopting Astro's content collections, maintaining the existing post format, keeping the site fast and deployable to the same infrastructure. It was a solid document and it gave the whole project a clear shape before any code was touched.

The problem is that the amount of information generated is genuinely dense. Reviewing a full PRD for even a small project takes real concentration, and it is very easy to skim sections that feel obvious or to take things for granted. I did both of those things and I paid for it later.

## The hidden work: parity, not framework swap

Early on I framed the project as "move to Astro". That is only half the job. The other half is **prove you did not break what people already had**: URLs, redirects, SEO metadata, scroll behaviour, typography, internal links, and the static assets your templates reference.

Once I treated it that way, the spec got better. I kept the old Gatsby tree in the repo under `legacy/gatsby/` (tagged, not deleted) and used it as the source of truth while filling a parity checklist — route by route, not epic by epic. That is where redirects, sitemap behaviour, and the animation inventory actually belonged. The PRD had talked about content and stack; it had not yet said "every public URL and behaviour class must be accounted for before cutover."

If you are migrating rather than greenfielding, **inventory the legacy app before you trust the first draft of the PRD.** Open the old site and the spec side by side and ask, for each URL: what must still work the same way?

## What the PRD missed

Animations and fonts were the obvious gaps — the ones I felt in the UI first.

The portfolio had a handful of scroll animations and transitions that were part of its personality — subtle things, but the kind of detail that makes a site feel considered rather than assembled. The PRD never mentioned them. It focused on content, structure, and technology, and the visual behaviour of the existing site was simply not captured. When I got to implementation and those animations were absent, I had to stop, go back to the agent, and create new epics specifically to address them.

The same thing happened with fonts. The typefaces from the Gatsby version were not carried over because they had never been specified. Again, I had to add tickets mid-implementation to resolve it.

Looking back, those were not one-off oversights. They were the same failure mode in different categories:

| Category | What slipped through |
|----------|----------------------|
| Motion | GSAP timelines and scroll scenes — needed an explicit legacy inventory and a technology decision (GSAP 3 + ScrollTrigger, not a straight port) |
| Visual | Design tokens, self-hosted MFred, Google font pairing |
| Content | Collection schemas, canonical `path` fields in frontmatter, post icons |
| SEO | Title template, sitemap, robots, Open Graph — easy to defer until late |
| Navigation | Adding nav links before routes exist — broken internal links are a product bug, not a styling detail |
| Static assets | Fonts, favicons, and images under `public/` — must exist in the repo, not only on your laptop |

Neither batch was a crisis. The BMAD workflow handles this kind of iteration — you can add epics and stories at any point. But it was a reminder that the PRD is only as good as the conversation that produces it, and if you do not explicitly raise something in that conversation, the agent has no way to know it matters to you.

## Iterating on the spec mid-project

One thing I came to appreciate about the BMAD approach is that the spec is not a contract you are locked into. When I discovered gaps — the animations, the fonts, a few styling details that had been glossed over — I could go back, describe the issue, and generate new stories to cover the missing work. The project stayed organised even as the requirements grew.

That said, the iteration adds friction that would not exist if you had caught those things in the initial PRD review. The lesson for me was simple: slow down when reading the PRD. Read it against the live site. Open both side by side and go section by section asking whether anything is missing from what is in front of you. The density of the document makes it tempting to move fast, but the cost of missing something shows up later.

Implementation was not "write the spec once, then code." It was a loop: **dev story**, build, **code review** with another agent pass, patch, sometimes defer. The review step is where brownfield reality showed up — coarse stories split, acceptance criteria tightened, things I had assumed obvious written down. The spec kept evolving; the structure kept the evolution from turning into chaos.

## Build gates that caught what review missed

I added a few automated checks on the production build output — schema validation on content, a link crawl over the generated HTML — not because BMAD told me to, but because migrations need a **binary answer** to "is this artifact complete?"

One failure mode was painfully mundane: a leftover `.gitignore` rule from the Gatsby era ignored any folder named `public`, so Astro's `site/public/` (fonts, favicons, images) never made it into git. Locally the site looked fine; a clean checkout did not have those files, so the built HTML pointed at assets that were not in `dist/`. A post-build link check flagged dozens of broken `href` and `src` targets in one run.

That is the lesson I would keep even if you never read my deploy setup: **validate the artifact you actually ship**, on a machine that only has what is in version control. Solo projects are especially good at hiding "works on my machine" behind a successful `npm run build` on a dirty tree.

## The tech stack decisions document

The tech decisions artifact was where BMAD added the most unambiguous value. Working through the choice of Astro over alternatives, how to handle content collections, how to structure the project for future posts — having an agent that asked the right questions and documented the reasoning meant I did not have to hold all of that in my head. The decisions were written down, with rationale, before implementation started.

For a solo project this matters more than it might seem. Without a team to discuss things with, it is easy to make half-considered technology choices and then forget why you made them. The tech decisions doc acts as a record you can return to.

## User stories and the shape of the work

The epics and stories that BMAD produced gave the migration a clear sequence. Rather than a vague sense of "migrate the site", I had discrete units of work with acceptance criteria. That made it easier to know when something was done and to stay focused during implementation rather than wandering into scope creep.

The stories were generally well-scoped. A few were too coarse — "migrate styling" is doing a lot of work as a single story — and those were the ones that tended to surface the missing details about animations and fonts. In retrospect those stories needed more conversation before they were accepted.

## What I would do differently

If I did this again I would spend more time on the PRD review and less time being impressed that it existed at all. The document is a starting point for a conversation, not a finished product, and treating it as nearly-done after the first pass is where the gaps come from.

I would run a **legacy parity pass** before signing off the first PRD: routes, redirects, motion, typography, SEO, and static assets. I would archive the old app in-repo and point every "as today" requirement at something inspectable.

I would be more deliberate about walking through the existing site visually while reviewing the PRD. The agent knows what you tell it. If you describe a Gatsby portfolio without mentioning the specific fonts or the scroll animations, those things do not make it into the spec. The agent is not looking at your site — you are.

I would wire **build-output checks** early — schema plus internal links on `dist/` — so "green build" means the deployable tree is coherent, not just that Astro finished compiling.

## Was it worth it?

Yes, clearly. The migration went smoothly in the parts that were well-specified, and even where I had to iterate the process stayed organised. Compared to how I would normally approach this kind of project — a rough mental list, decisions made in the moment, implementation that drifts from the original intent — SDD with BMAD produced a more considered result with less second-guessing during the build.

The discipline of writing the spec before writing the code is the real value. BMAD makes that discipline accessible and structured in a way that would be hard to replicate alone. The agents ask questions you would not think to ask yourself.

It is not magic, and it is not always the right tool. For a **brownfield migration** with parity expectations and a solo maintainer who will forget why a decision was made in six months, it paid off. For a greenfield experiment or a throwaway prototype, the full BMAD stack would be heavier than the problem deserves.

The output depends heavily on the quality of your input and the attention you bring to reviewing what comes back. But as a way of bringing some rigour to solo frontend projects — especially when you are replacing something real — it is genuinely useful.
