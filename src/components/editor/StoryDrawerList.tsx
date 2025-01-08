import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { MinimalStory } from "@/domains/stories/types";
import React from "react";
import { useRouter } from "next/navigation";

interface StoryDrawerListProps {
    story: MinimalStory | undefined
};

export const StoryDrawerList: React.FC<StoryDrawerListProps> = ({ story }) => {
    const router = useRouter();
    const goToEditPage = (pageId: string) => router.push(`/stories/${story?.id}/edit/${pageId}`);

    return (
        <ul className='ChapterList flex flex-col gap-4'>
            {story?.chapters?.map((chapter, idx)=>(<li key={`chapter-${idx}`}>
                <Collapsible>
                    <CollapsibleTrigger className="w-full">
                        <div className="flex w-full justify-between hover:bg-amber-200 p-2 rounded-md">
                            <p>{chapter.title}</p>
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <ul className='PageList flex flex-col p-4 gap-4'>
                            {chapter?.pages.map((page, idx)=>(<li key={`page-${idx}`}>
                                <button onClick={()=>goToEditPage(page.id)}>{page.title}</button>
                            </li>))}
                        </ul>
                    </CollapsibleContent>
                </Collapsible>
            </li>))}
        </ul> 
)};