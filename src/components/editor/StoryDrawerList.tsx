import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { MinimalStory } from "@/domains/stories/types";
import React from "react";

interface StoryDrawerListProps {
    story: MinimalStory | undefined
};

export const StoryDrawerList: React.FC<StoryDrawerListProps> = ({ story }) => (
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
                            <p>{page.title}</p>
                        </li>))}
                    </ul>
                </CollapsibleContent>
            </Collapsible>
        </li>))}
    </ul> 
);