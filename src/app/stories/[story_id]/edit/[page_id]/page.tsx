"use client";

import './page.css';
import { RichTextEditor } from "@/lib/RichTextEditor";
import './page.css';
import React, { useEffect, useState } from 'react';
import { EllipsisVertical, HomeIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { StoryDrawerList } from '@/components/editor/StoryDrawerList';
import { useMinimalStory, useStoryPage } from '@/domains/stories/hooks';
import { useParams } from 'next/navigation';

type RouterParams = {
    story_id: string;
    page_id: string;
}

export default function EditStory () {
    const routerParams = useParams<RouterParams>();
    const storyId = routerParams.story_id;
    const pageId = routerParams.page_id;
    const [drawerActive, setDrawerActive] = useState(false);
    const { data: stories } = useMinimalStory();
    const { data: pages, isLoading} = useStoryPage(pageId);
    const [editorState, setEditorState] = useState<string | null>(null);
    const hasPageDataFinishedLoading = !isLoading;

    useEffect(() => {
        if (hasPageDataFinishedLoading) {
            setEditorState(pages?.[0]?.content);
        }
    }, [hasPageDataFinishedLoading, pages, pageId]);


    
    return (
        <div className='abhayaLibre flex' style={{minHeight: window.innerHeight}}>
            <div className='bg-olive-50 h-auto min-h-screen flex-shrink-0'>
                <Button className='m-4 w-[32px] h-[32px]' onClick={()=>setDrawerActive(!drawerActive)}><Menu /></Button>
                <div className={`transition-all duration-300 ${
                    drawerActive ? "w-[300px]" : "w-[60px]"
                    } h-[200px]`}>
                    <div className={cn(
                        'p-4 opacity-0 transition-all duration-500',
                        `${drawerActive ? 'opacity-100': 'duration-0'}`
                    )}>
                        <StoryDrawerList story={stories?.[0]}/>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-inherit'>
                    <div className='flex items-center w-full p-4 pl-8 pr-8 justify-between'>
                        <div className='flex gap-4'>
                            <HomeIcon />
                            <p>My Story</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Avatar src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' fallback='avatar'/>
                            <EllipsisVertical />
                        </div>
                    </div>
                    <hr className='w-full'></hr>
                </div>
                <input placeholder='TITLE' className='EditorTitle flex'/>
                {hasPageDataFinishedLoading && <RichTextEditor 
                    value="value"
                    name="rich text editor"
                    initialEditorState={pages?.[0]?.content}
                    storyId={storyId}
                    pageId={pageId}
                />}
            </div>
        </div>
    )
};