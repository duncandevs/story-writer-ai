import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chapter, MinimalStory } from "./types"; // Assuming you have a Chapter type defined
import { fetchChapters, fetchMinimalStoryData } from "./api";

export const K = {
    "stories": ["stories"],
    "minimalStories": ["minimalStories"],
    "chapters": ["chapters"],
    "pages": ["pages"]
}

export const useMinimalStory = () => {
    return useQuery<MinimalStory[], Error>(K.minimalStories, fetchMinimalStoryData);
}

// Custom hook to use chapters
export const useChapters = () => {
    return useQuery<Chapter[], Error>(K.chapters, fetchChapters);
};