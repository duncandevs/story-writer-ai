"use client";

import './page.css';
import { RichTextEditor } from "@/lib/RichTextEditor";
import './page.css';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { EllipsisVertical, HomeIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { StoryDrawerList } from '@/components/editor/StoryDrawerList';
import { useMinimalStory, useStoryPage, useUpdatePageTitle } from '@/domains/stories/hooks';
import { useParams } from 'next/navigation';
import { debounce } from 'lodash';
import { EditorPageTitleInput } from '@/components/editor/EditorPageTitle';
import { useScrollHide } from '@/domains/app/hooks';
import { PageHeader } from '@/components/common/PageHeader';

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
    const hasPageDataFinishedLoading = !isLoading;
    const { createUpdatePageTitle } = useUpdatePageTitle();
    const isVisible = useScrollHide();


    const handleUpdatePageTitle = React.useCallback(
        debounce((title: string) => {
          createUpdatePageTitle({ id: pageId, title });
        }, 500),
        [pageId]
    );

    const onTitleChange = (title: string) => {
        handleUpdatePageTitle(title);
    };
      
    
    return (
        <div className='abhayaLibre flex' style={{minHeight: window.innerHeight}}>
            <div className='bg-olive-50 h-auto min-h-screen flex-shrink-0 fixed z-10'>
                <Button className='m-4 w-[32px] h-[32px]' onClick={()=>setDrawerActive(!drawerActive)}><Menu /></Button>
                <div className={`transition-all duration-300 ${
                    drawerActive ? "w-[300px]" : "w-[60px]"
                    } h-[200px]`}>
                    <div className={cn(
                        'p-4 opacity-0 transition-all duration-500 w-full',
                        `${drawerActive ? 'opacity-100': 'duration-0'}`
                    )}>
                        <StoryDrawerList story={stories?.[0]} className='fixed'/>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className={cn('w-inherit fixed w-full header',
                    `w-inherit fixed w-full header transition-transform duration-300 ${
                        isVisible ? "translate-y-0" : "-translate-y-full"
                    }`
                )}>
                    <PageHeader />
                </div>
                <div className='mt-20'>
                    <EditorPageTitleInput initialTitle={pages?.[0]?.title} onUpdateTitle={onTitleChange} className='EditorTitle flex'/>
                    {hasPageDataFinishedLoading && <RichTextEditor 
                        value="value"
                        name="rich text editor"
                        initialEditorState={pages?.[0]?.content}
                        storyId={storyId}
                        pageId={pageId}
                    />}
                </div>
            </div>
        </div>
    )
};