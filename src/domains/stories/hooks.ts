import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chapter, CreateOrUpdatePageParams, MinimalStory } from "./types"; // Assuming you have a Chapter type defined
import { fetchChapters, fetchMinimalStoryData, fetchPage, createOrUpdatePage } from "./api";

export const K = {
    "stories": ["stories"],
    "minimalStories": ["minimalStories"],
    "chapters": ["chapters"],
    "pages": (id: string)=>["pages", id],
};

export const useMinimalStory = () => {
    return useQuery<MinimalStory[], Error>(K.minimalStories, fetchMinimalStoryData);
};

// Custom hook to use chapters
export const useChapters = () => {
    return useQuery<Chapter[], Error>(K.chapters, fetchChapters);
};

export const useStoryPage = (page_id: string) => {
    const queryResult = useQuery<any, Error>(K.pages(page_id), () => fetchPage({id: page_id}), {
        staleTime: 0, // Data goes stale immediately
        cacheTime: 0, // Data is not cached
        refetchOnWindowFocus: true, // Refetch when window regains focus
        refetchOnMount: true, // Refetch every time the component mounts
    });

    const { mutate } = useMutation(createOrUpdatePage);
    const createOrUpdatePageMutation = (page: CreateOrUpdatePageParams) => mutate(page)

    return {
        ...queryResult,
        createOrUpdatePageMutation
    }
};

type createNewPageProps = {
    chapterId: string;
    content?: string;
    title?: string;
}
  
export const useCreatePage = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation(createOrUpdatePage, {
      onSuccess: (newPage: any) => {
        // Update the query store with the new page
        queryClient.setQueryData(K.pages(newPage.id), newPage);
      },
    });
  
    const createNewPage = (params: createNewPageProps) => {
      const newPage: CreateOrUpdatePageParams = {
        chapter_id: params.chapterId,
        title: 'New Page',
        page_number: 3, // Adjust as needed
      };
  
      mutation.mutate(newPage);
    };
  
    return { createNewPage, ...mutation };
  };