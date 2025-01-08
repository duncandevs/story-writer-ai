import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chapter, MinimalStory, Page } from "./types"; // Assuming you have a Chapter type defined
import { fetchChapters, fetchMinimalStoryData, fetchPage } from "./api";

export const K = {
    "stories": ["stories"],
    "minimalStories": ["minimalStories"],
    "chapters": ["chapters"],
    "pages": (id: string)=>["pages", id],
}

export const useMinimalStory = () => {
    return useQuery<MinimalStory[], Error>(K.minimalStories, fetchMinimalStoryData);
}

// Custom hook to use chapters
export const useChapters = () => {
    return useQuery<Chapter[], Error>(K.chapters, fetchChapters);
};

export const useStoryPage = (page_id: string) => {
    return useQuery<any, Error>(K.pages(page_id), () => fetchPage({id: page_id}))
}