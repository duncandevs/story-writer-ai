import { Cloud, CreditCard, Github, HomeIcon, Info, Keyboard, LifeBuoy, LogIn, Mail, MessageSquare, Plus, PlusCircle, Settings, User, UserPlus, Users } from "lucide-react";
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
import Link from "next/link";

const HeaderDropdownMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <EllipsisVertical className="hover:stroke-amber-100" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-olive-50 m-4">
        <DropdownMenuLabel>Project</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="https://www.github.com/duncandevs" target="_blank" passHref>
            <DropdownMenuItem>
                <Github />
                <span>Github</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Info />
            <span>About</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Account</DropdownMenuLabel>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogIn />
          <span>Login</span>
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
                <Avatar src={'https://image.lexica.art/full_webp/bbd5dffa-e84a-476f-b546-41db4d20b94b'} fallback='avatar'/>
                <HeaderDropdownMenu />
            </div>
        </div>
        <hr className='w-full'></hr>
    </>
);