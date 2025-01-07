import { supabase } from "@/lib/supabaseClient";
import { Page } from "./types";

export const fetchMinimalStoryData = async () => {
    const { data, error } = await supabase
        .from("stories")
        .select(`
            *,
            chapters (
                id,
                title,
                chapter_number,
                pages (
                    id,
                    title,
                    page_number
                )
            )
        `)
    if(error) throw Error(`Failed to fetch stories: ${error.message}`)
    return data; 
};

/** Chapters API */
export const fetchChapters = async () => {
    const { data, error } = await supabase
        .from("chapters")
        .select(`
            *,
            pages(*)    
        `)
    if(error) throw Error(`Failed to fetch chapters ${error.message}`)
    return data;
}


/** Pages API */ 
type FetchPage = { id: string }
export const fetchPage = async ({ id }: FetchPage) => {
    const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
    if(error) throw Error(`Failed to fetch page ${error.message}`)
    return data;
};

export const createOrUpdatePage = async (page: Page) => {
    const { data, error } = await supabase
        .from("pages")
        .upsert([page], { onConflict: 'id' }); // Use upsert to insert or update based on the 'id' field

    if (error) throw Error(`Failed to create or update page: ${error.message}`);
    return data;
}