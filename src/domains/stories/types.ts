import { z } from "zod";

const uuidSchema = z.string().uuid();


export const StorySchema = z.object({
    id: uuidSchema,
    created_at: z.date().optional(),
    title: z.string().nullable(),
    chapters: z.any()
});
export const ChapterSchema = z.object({
    id: uuidSchema,
    created_at: z.date().optional(),
    story_id: uuidSchema,
    title: z.string(),
    chapter_number: z.number(),
});

export const PageSchema = z.object({
    id: uuidSchema,
    created_at: z.date().optional(),
    chapter_id: uuidSchema,
    title: z.string().nullable(),
    content: z.string().nullable(),
    chapter_number: z.number(),
});

export const MinimalStorySchema = z.object({
    id: uuidSchema,
    created_at: z.date().optional(),
    title: z.string().nullable(),
    chapters: z.object({
        id: uuidSchema,
        title: z.string(),
        chapter_number: z.number(),
        pages: z.object({
            id: uuidSchema,
            title: z.string().nullable(),
            chapter_number: z.number(),
        })
    })
});

export type Page = z.infer<typeof PageSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type Story = z.infer<typeof StorySchema>;
export type MinimalStory = z.infer<typeof MinimalStorySchema>;
