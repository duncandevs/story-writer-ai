import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { MinimalStory } from "@/domains/stories/types";
import React from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useCreatePage } from "@/domains/stories/hooks";
import { cn } from "@/lib/utils";

interface StoryDrawerListProps {
    story: MinimalStory | undefined;
    className?: string;
};


export const StoryDrawerList: React.FC<StoryDrawerListProps> = ({ story, className }) => {
    const router = useRouter();
    const { createNewPage } = useCreatePage()
    const goToEditPage = (pageId: string) => router.push(`/stories/${story?.id}/edit/${pageId}`);
    const handleCreateNewPage = (chapterId:string) => {
        createNewPage({ chapterId })
    };

    return (
        <ul className={cn('ChapterList flex flex-col gap-4', className)}>
            {story?.chapters?.map((chapter, idx)=>(<li key={`chapter-${idx}`}>
                <Collapsible>
                    <div className="flex hover:bg-amber-200 rounded-md group">
                        <CollapsibleTrigger className="w-full">
                            <div className="flex w-full p-2 pr-4 group">
                                <p className="text-xl">{chapter.title}</p>
                            </div>
                        </CollapsibleTrigger>
                        <button className="p-2 pl-4 opacity-0 group-hover:opacity-100" onClick={()=>handleCreateNewPage(chapter.id)}>
                            <PlusCircle width={16} height={16} className="hover:stroke-amber-100"/>
                        </button>
                    </div>
                    <CollapsibleContent>
                        <ul className='PageList flex flex-col p-4 gap-4'>
                            {chapter?.pages.map((page, idx)=>(<li key={`page-${idx}`}>
                                <button onClick={()=>goToEditPage(page.id)} className="hover:font-bold  text-start">{page.title}</button>
                            </li>))}
                        </ul>
                    </CollapsibleContent>
                </Collapsible>
            </li>))}
        </ul> 
)};