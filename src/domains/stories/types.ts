import { z } from "zod";

const uuidSchema = z.string().uuid();

export const ChapterSchema = z.object({
    id: uuidSchema,
    created_at: z.date(),
    story_id: uuidSchema,
    title: z.string()
});

export const StorySchema = z.object({
    id: uuidSchema,
    created_at: z.date(),
    title: z.string().nullable(),
    chapters: z.any()
});

export const PageSchema = z.object({
    id: uuidSchema,
    created_at: z.date(),
    chapter_id: uuidSchema,
    title: z.string().nullable(),
    content: z.string().nullable(),
});

export type Page = z.infer<typeof PageSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type Story = z.infer<typeof StorySchema>;
