import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chapter } from "./types"; // Assuming you have a Chapter type defined
import { fetchChapters } from "./api";

export const K = {
    "stories": ["stories"],
    "chapters": ["chapters"],
    "pages": ["pages"]
}

// Custom hook to use chapters
export const useChapters = () => {
    return useQuery<Chapter[], Error>(K.chapters, fetchChapters);
};