"use client"
import { useMinimalStory } from '@/domains/stories/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function RedirectEditStoryPage() {
    const { data: stories } = useMinimalStory();
    const router = useRouter();

    useEffect(() => {
        if (stories && stories.length > 0) {
            const firstStory = stories[0];
            const firstChapter = firstStory.chapters[0];
            const firstPage = firstChapter.pages[0];
            router.push(`/stories/${firstStory.id}/edit/${firstPage.id}`);
        }
    }, [stories, router]);

    return null;
}