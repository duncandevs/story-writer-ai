"use client"
import { Edit, Trash } from "lucide-react"; // Import icons for edit and delete
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MinimalPage } from "@/domains/stories/types";
import React from "react";
import { getPageRoute } from "@/domains/app/constants";
import { useRouter } from "next/navigation";

interface StoryDrawerPageOptionsDropdownProps {
    page: MinimalPage;
    storyId: string;
};

export const StoryDrawerPageOptionsDropdown: React.FC<StoryDrawerPageOptionsDropdownProps> = ({ page, storyId }) => {
    const router = useRouter();
    const handleEditPage = () => router.push(getPageRoute({ storyId, pageId: page.id }));

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <EllipsisVertical className="hover:stroke-amber-100" height={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-olive-50 m-4">
            <DropdownMenuItem onClick={handleEditPage}>
                <Edit />
                <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Trash />
                <span>Delete</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
};