import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const musings = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/musings" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
	}),
});

export const collections = { musings };
