"use client"
import { Edit, Trash } from "lucide-react"; // Import icons for edit and delete
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MinimalPage, MinimalStory } from "@/domains/stories/types";
import React from "react";
import { getPageRoute } from "@/domains/app/constants";
import { useRouter } from "next/navigation";
import { useDeletePage, usePageParams } from "@/domains/stories/hooks";

interface StoryDrawerPageOptionsDropdownProps {
    page: MinimalPage;
    story: MinimalStory;
};

export const StoryDrawerPageOptionsDropdown: React.FC<StoryDrawerPageOptionsDropdownProps> = ({ page, story }) => {
    const router = useRouter();
    const { deletePageById } = useDeletePage();
    const { pageId: currentPageId } = usePageParams();

    const handleEditPage = () => router.push(getPageRoute({ storyId: story?.id, pageId: page?.id }));
    const handleDeletePage = () => {
        const prevPageId = story?.chapters?.[0].pages?.reverse()[1].id;
        deletePageById(page.id);
        if(currentPageId === page?.id){
            const fallbackPageRoute = getPageRoute({ storyId: story.id, pageId: prevPageId});
            window.location.href = fallbackPageRoute
        } else {
            window.location.reload();
        };
    };

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <EllipsisVertical className="hover:stroke-amber-100" height={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-olive-50 m-4">
            <DropdownMenuItem onClick={handleEditPage}>
                <Edit />
                <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeletePage}>
                <Trash />
                <span>Delete</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
};