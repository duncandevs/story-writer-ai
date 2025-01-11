import { Cloud, CreditCard, Github, HomeIcon, Keyboard, LifeBuoy, LogOut, Mail, MessageSquare, Plus, PlusCircle, Settings, User, UserPlus, Users } from "lucide-react";
import Avatar from '@/components/ui/avatar';
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderDropdownMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <EllipsisVertical className="hover:stroke-amber-100" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-olive-50 m-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                <UserPlus />
                <span>Share</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuItem>
                    <Mail />
                    <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <MessageSquare />
                    <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <PlusCircle />
                    <span>More...</span>
                    </DropdownMenuItem>
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
                <Github />
                <span>GitHub</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
)

export const PageHeader = () => (
    <>
        <div className='flex items-center w-full p-4 pl-8 pr-8 justify-between'>
            <div className='flex gap-4 pl-16'>
                <HomeIcon />
                <p>My Story</p>
            </div>
            <div className='flex items-center gap-2'>
                <Avatar src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' fallback='avatar'/>
                <HeaderDropdownMenu />
            </div>
        </div>
        <hr className='w-full'></hr>
    </>
);