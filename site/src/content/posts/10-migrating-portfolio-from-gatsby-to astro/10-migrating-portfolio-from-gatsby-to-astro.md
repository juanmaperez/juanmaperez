---
path: '/blog/migrating-portfolio-from-gatsby-to-astro-using-sdd-with-bmad'
date: '2025-05-20T09:00:00+00:00'
title: "Migrating a portfolio from Gatsby v2 to Astro v6 using SDD with BMAD"
type: post
icon: ./../../../assets/icons/ai.png
category: 'ai'
tags: ['ai', 'bmad', 'sdd', 'astro', 'gatsby', 'software design document', 'migration']
excerpt: "I used Specification Driven Development with the BMAD method to migrate my portfolio from Gatsby v2 to Astro v6. Here is what worked, what the agents missed, and what I learned about reviewing dense AI-generated docs."
---

I had been meaning to migrate this portfolio for a while. Gatsby v2 had served me well but it was aging, the plugin ecosystem had drifted, and Astro had been on my radar long enough that I had no more excuses. Rather than just diving in and rewriting things by feel, I decided to use the migration as an opportunity to try something I had been curious about: Specification Driven Development with the BMAD method.

This post is about that experience — what SDD with BMAD actually looks like in practice on a real, if small, project, and where it helped and where it fell short.

## What is SDD with BMAD?

Specification Driven Development means writing the full specification of what you are building before writing any code. You define the requirements, the architecture, and the individual units of work upfront, and then the implementation follows from those documents rather than being figured out on the fly.

BMAD is a method and a set of AI agents that help you produce those specifications. It works through a series of specialist roles — a product manager, an architect, a developer — each of which you engage in sequence to build up a layered set of documents: a PRD, architecture decisions, epics and user stories.

For this migration the artifacts I ended up with were a PRD, a tech stack decisions document, and a set of epics and user stories. No architecture doc in the traditional sense, because the project was small enough that the PRD and tech decisions covered that ground.

## Starting with the PRD

The first step with BMAD is working with the product manager agent to produce a Product Requirements Document. You describe what you want to achieve, the agent asks clarifying questions, and together you build a document that captures the scope of the project.

For this migration the PRD covered the main goals: moving off Gatsby, adopting Astro's content collections, maintaining the existing post format, keeping the site fast and deployable to the same infrastructure. It was a solid document and it gave the whole project a clear shape before any code was touched.

The problem is that the amount of information generated is genuinely dense. Reviewing a full PRD for even a small project takes real concentration, and it is very easy to skim sections that feel obvious or to take things for granted. I did both of those things and I paid for it later.

## What the PRD missed

Two things came back to bite me during implementation: animations and fonts.

The portfolio had a handful of scroll animations and transitions that were part of its personality — subtle things, but the kind of detail that makes a site feel considered rather than assembled. The PRD never mentioned them. It focused on content, structure, and technology, and the visual behaviour of the existing site was simply not captured. When I got to implementation and those animations were absent, I had to stop, go back to the agent, and create new epics specifically to address them.

The same thing happened with fonts. The typefaces from the Gatsby version were not carried over because they had never been specified. Again, I had to add tickets mid-implementation to resolve it.

Neither of these was a crisis. The BMAD workflow handles this kind of iteration — you can add epics and stories at any point. But it was a reminder that the PRD is only as good as the conversation that produces it, and if you do not explicitly raise something in that conversation, the agent has no way to know it matters to you.

## Iterating on the spec mid-project

One thing I came to appreciate about the BMAD approach is that the spec is not a contract you are locked into. When I discovered gaps — the animations, the fonts, a few styling details that had been glossed over — I could go back, describe the issue, and generate new stories to cover the missing work. The project stayed organised even as the requirements grew.

That said, the iteration adds friction that would not exist if you had caught those things in the initial PRD review. The lesson for me was simple: slow down when reading the PRD. Read it against the live site. Open both side by side and go section by section asking whether anything is missing from what is in front of you. The density of the document makes it tempting to move fast, but the cost of missing something shows up later.

## The tech stack decisions document

The tech decisions artifact was where BMAD added the most unambiguous value. Working through the choice of Astro over alternatives, how to handle content collections, how to structure the project for future posts — having an agent that asked the right questions and documented the reasoning meant I did not have to hold all of that in my head. The decisions were written down, with rationale, before implementation started.

For a solo project this matters more than it might seem. Without a team to discuss things with, it is easy to make half-considered technology choices and then forget why you made them. The tech decisions doc acts as a record you can return to.

## User stories and the shape of the work

The epics and stories that BMAD produced gave the migration a clear sequence. Rather than a vague sense of "migrate the site", I had discrete units of work with acceptance criteria. That made it easier to know when something was done and to stay focused during implementation rather than wandering into scope creep.

The stories were generally well-scoped. A few were too coarse — "migrate styling" is doing a lot of work as a single story — and those were the ones that tended to surface the missing details about animations and fonts. In retrospect those stories needed more conversation before they were accepted.

## What I would do differently

If I did this again I would spend more time on the PRD review and less time being impressed that it existed at all. The document is a starting point for a conversation, not a finished product, and treating it as nearly-done after the first pass is where the gaps come from.

I would also be more deliberate about walking through the existing site visually while reviewing the PRD. The agent knows what you tell it. If you describe a Gatsby portfolio without mentioning the specific fonts or the scroll animations, those things do not make it into the spec. The agent is not looking at your site — you are.

## Was it worth it?

Yes, clearly. The migration went smoothly in the parts that were well-specified, and even where I had to iterate the process stayed organised. Compared to how I would normally approach this kind of project — a rough mental list, decisions made in the moment, implementation that drifts from the original intent — SDD with BMAD produced a more considered result with less second-guessing during the build.

The discipline of writing the spec before writing the code is the real value. BMAD makes that discipline accessible and structured in a way that would be hard to replicate alone. The agents ask questions you would not think to ask yourself.

It is not magic. The output depends heavily on the quality of your input and the attention you bring to reviewing what comes back. But as a way of bringing some rigour to solo frontend projects, it is genuinely useful.