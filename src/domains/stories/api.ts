import { supabase } from "@/lib/supabaseClient";
import { Page } from "./types";

export const fetchStories = async () => {
    const { data, error } = await supabase
        .from("stories")
        .select(`
            *,
            chapters (
                id,
                pages (id)
            )
        `)
    if(error) throw Error(`Failed to fetch stories: ${error.message}`)
    return data; 
};

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