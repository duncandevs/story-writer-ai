import { supabase } from "@/lib/supabaseClient";

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
}

