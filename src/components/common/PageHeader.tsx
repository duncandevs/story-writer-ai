import { HomeIcon } from "lucide-react";
import Avatar from '@/components/ui/avatar';
import { HeaderDropdownMenu } from "./HeaderDropdownMenu";

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