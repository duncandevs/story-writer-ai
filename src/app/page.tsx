"use client"
import { useEffect, useState } from "react";
import { fetchMinimalStoryData } from "@/domains/stories/api";
import { useRouter } from "next/navigation";

export default function GoToFirstStory () {
    const [stories, setStories] = useState<any[]>([]);
    const router = useRouter();

    useEffect(()=>{
        fetchMinimalStoryData()
            .then((res)=>setStories(res))
            .catch((err)=>console.log('error: ', err))
    }, []);
    
    const goToStoryEditPage = (story: any ) => {
        console.log('story: ', story)
        const firstChapter = story?.chapters[0];
        const firstPage = firstChapter?.pages[0];
        const editRoute = `/stories/${story.id}/edit/${firstPage.id}` // Go to the first page of the first chapter to begin editing
        router.push(editRoute)
    };

    useEffect(()=>{
      if(stories?.[0]){
        goToStoryEditPage(stories[0])
      }
    }, [stories])

    return null;
};
