"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { fetchStories } from "@/domains/stories/api";
import { useRouter } from "next/navigation";

export default function NewStory () {
    const [stories, setStories] = useState<any[]>([]);
    const router = useRouter();

    useEffect(()=>{
        fetchStories()
            .then((res)=>setStories(res))
            .catch((err)=>console.log('error: ', err))
    }, [])

    useEffect(()=>{
        console.log('stories: ', stories)
    }, [stories])

    
    const goToStoryEditPage = (story: any ) => {
        console.log(story)
        const editRoute = `${story.id}/p/${story?.chapters?.[0]?.pages?.[0]?.id}/edit` // Go to the first page of the first chapter to begin editing
        router.replace(editRoute)
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
