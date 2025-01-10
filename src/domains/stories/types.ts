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
    page_number: z.number(),
});

export const MinimalStorySchema = z.object({
    id: uuidSchema,
    created_at: z.date().optional(),
    title: z.string().nullable(),
    chapters: z.array(z.object({
        id: uuidSchema,
        created_at: z.date(),
        title: z.string(),
        chapter_number: z.number(),
        pages: z.array(z.object({
            id: uuidSchema,
            created_at: z.date(),
            title: z.string().nullable(),
            chapter_number: z.number(),
        }))
    }))
});

export const CreateOrUpdatePageParamsSchema = PageSchema.merge(
    z.object({
        id: z.string().optional(),
        chapter_id: z.string().optional(),
        title: z.string().optional(),
        content: z.string().optional().nullable(),
        page_number: z.number().optional(),
    })
);

export type Page = z.infer<typeof PageSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type Story = z.infer<typeof StorySchema>;
export type MinimalStory = z.infer<typeof MinimalStorySchema>;
export type CreateOrUpdatePageParams = z.infer<typeof CreateOrUpdatePageParamsSchema>;
