import { supabase } from "@/lib/supabaseClient";
import { CreateOrUpdatePageParams } from "./types";
import { z } from "zod"

/** Stories Api */
export const fetchMinimalStoryData = async () => {
    const { data, error } = await supabase
        .from("stories")
        .select(`
            *,
            chapters (
                id,
                created_at,
                title,
                chapter_number,
                pages (
                    id,
                    created_at,
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
            pages(
                *
            )    
        `)
    if(error) throw Error(`Failed to fetch chapters ${error.message}`)
    return data;
}


/** Pages API */ 
interface FetchPage { 
    id: string 
}
export const fetchPage = async ({ id }: FetchPage) => {
    const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
    if(error) throw Error(`Failed to fetch page ${error.message}`)
    return data;
};


export const createOrUpdatePage = async (page: CreateOrUpdatePageParams) => {
    // const { data, error } = await supabase
    //     .from("pages")
    //     .upsert([page], { onConflict: 'id' }) // Use upsert to insert or update based on the 'id' field
    //     .select("*")
    // if (error) throw Error(`Failed to create or update page: ${error.message}`);
    // return data?.[0];
};

interface UpdatePageTitleParams {
    pageId: string;
    newTitle: string;
}
export const updatePageTitle = async ({ pageId, newTitle }: UpdatePageTitleParams) => {
    const { data, error } = await supabase
        .from("pages")
        .update({ title: newTitle })
        .eq("id", pageId);

    if (error) throw new Error(`Failed to update page title: ${error.message}`);
    return data;
};