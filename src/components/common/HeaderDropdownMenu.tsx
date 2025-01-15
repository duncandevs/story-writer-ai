import { CreditCard, Github, Info,LogIn, Mail, MessageSquare, PlusCircle, Settings, User, UserPlus } from "lucide-react";
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

export const HeaderDropdownMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <EllipsisVertical className="hover:stroke-amber-100" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-olive-50 m-4">
        <DropdownMenuLabel>Project</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="https://github.com/duncandevs/story-writer-ai" target="_blank" passHref>
            <DropdownMenuItem>
                <Github />
                <span>Github</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="https://github.com/duncandevs/story-writer-ai" target="_blank" passHref>
            <DropdownMenuItem>
              <Info />
              <span>About</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
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
);