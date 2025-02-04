import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chapter, CreateOrUpdatePageParams, MinimalStory, Page } from "./types"; // Assuming you have a Chapter type defined
import { fetchChapters, fetchMinimalStoryData, fetchPage, createOrUpdatePage, deletePage } from "./api";
import { useParams, useRouter } from "next/navigation";

export const K = {
    "stories": ["stories"],
    "minimalStories": ["minimalStories"],
    "chapters": ["chapters"],
    "pages": (id: string)=>["pages", id],
};

export const useMinimalStory = () => {
    return useQuery<MinimalStory[], Error>(K.minimalStories, fetchMinimalStoryData, {
      staleTime: 0, // Data goes stale immediately
      cacheTime: 0, // Data is not cached
      select: (data) => {
        // Sort pages within each chapter by created_at in descending order
        return data.map(story => ({
          ...story,
          chapters: story.chapters.map(chapter => ({
            ...chapter,
            pages: chapter.pages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
          }))
        }));
      }
    });
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
        queryClient.setQueryData(K.pages(newPage.id), newPage);
        queryClient.invalidateQueries(K.minimalStories);
      },
    });
  
    const createNewPage = (params: createNewPageProps) => {
      const newPage: CreateOrUpdatePageParams = {
        chapter_id: params.chapterId,
        title: params.title || "New Page",
      };
  
      mutation.mutate(newPage);
    };
  
    return { createNewPage, ...mutation };
};

export const useUpdatePageTitle = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createOrUpdatePage, {
    onSuccess: (newPage: any) => {
      queryClient.setQueryData(K.pages(newPage.id), newPage);
      queryClient.invalidateQueries(K.minimalStories);
    },
  });

  const createUpdatePageTitle = (params: CreateOrUpdatePageParams) => {
    if(!params.id || !params.title) throw(`Failed to update page title missing title or id`);

    const updatedPage = {
      ...params
    };

    mutation.mutate(updatedPage);
  };

  return { createUpdatePageTitle, ...mutation };
};

export const useDeletePage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(deletePage, {
        onSuccess: (data, variables) => {
            // Invalidate queries related to pages to ensure fresh data
            // queryClient.invalidateQueries(K.pages(variables.pageId));
            // queryClient.invalidateQueries(K.minimalStories);
        },
        onError: (error) => {
            console.error("Failed to delete page:", error);
        },
    });

    const deletePageById = (pageId: string) => {
        mutation.mutate({ pageId });
    };

    return { deletePageById, ...mutation };
};

type RouterParams = {
  story_id: string;
  page_id: string;
};
export const usePageParams = () => {
  const routerParams = useParams<RouterParams>();
  const storyId = routerParams.story_id;
  const pageId = routerParams.page_id;
  
  return {
    storyId,
    pageId
  }
}