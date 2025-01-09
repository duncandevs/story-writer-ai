import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { MinimalStory } from "@/domains/stories/types";
import React from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

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
                    <div className="flex hover:bg-amber-200 rounded-md group">
                        <CollapsibleTrigger className="w-full">
                            <div className="flex w-full justify-between p-2 justify-between group">
                                <p>{chapter.title}</p>
                            </div>
                        </CollapsibleTrigger>
                        <button className="p-2 opacity-0 group-hover:opacity-100">
                            <PlusCircle width={16} height={16} className="hover:stroke-amber-100"/>
                        </button>
                    </div>
                    <CollapsibleContent>
                        <ul className='PageList flex flex-col p-4 gap-4'>
                            {chapter?.pages.map((page, idx)=>(<li key={`page-${idx}`}>
                                <button onClick={()=>goToEditPage(page.id)} className="hover:font-bold">{page.title}</button>
                            </li>))}
                        </ul>
                    </CollapsibleContent>
                </Collapsible>
            </li>))}
        </ul> 
)};