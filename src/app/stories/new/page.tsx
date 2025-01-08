"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { fetchMinimalStoryData } from "@/domains/stories/api";
import { useRouter } from "next/navigation";

export default function NewStory () {
    const [stories, setStories] = useState<any[]>([]);
    const router = useRouter();

    useEffect(()=>{
        fetchMinimalStoryData()
            .then((res)=>setStories(res))
            .catch((err)=>console.log('error: ', err))
    }, [])

    useEffect(()=>{
        console.log('stories: ', stories)
    }, [stories])

    
    const goToStoryEditPage = (story: any ) => {
        const firstChapter = story.chapters[0];
        const firstPage = firstChapter.pages[0];
        const editRoute = `/stories/${story.id}/edit/${firstPage.id}` // Go to the first page of the first chapter to begin editing
        router.push(editRoute)
    };

    return <div className="flex flex-col p-8 gap-4">
        <div>
            <Button>Add new story <PlusIcon/></Button>
        </div>
        <h2>Existing Stories</h2>
        <div className="flex flex-col">
            {stories && stories?.map((s, idx)=>
                <a onClick={()=>goToStoryEditPage(s)} key={`story-${idx}`}>
                    <p>{s.title}</p>
                </a>)
            }
        </div>
    </div>
};
