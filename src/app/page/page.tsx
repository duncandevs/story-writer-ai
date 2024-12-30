"use client"
import './page.css';
import { RichTextEditor } from "@/lib/RichTextEditor";
import './page.css';
import { useState } from 'react';
import { EllipsisVertical, HomeIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Avatar from '@/components/ui/avatar';

export default function RichText () {
    const [drawerActive, setDrawerActive] = useState(false);

    return (
        <div className='abhayaLibre' style={{minHeight: window.innerHeight}}>
            <div className='flex'>
                <div className='bg-olive-50 h-auto min-h-screen'>
                    <Button className='m-4 w-[32px] h-[32px]' onClick={()=>setDrawerActive(!drawerActive)}><Menu /></Button>
                    <div className={`transition-all duration-300 ${
                        drawerActive ? "w-[300px]" : "w-[60px]"
                        } h-[200px]`}>
                        <>{drawerActive && <div className='p-4'>
                            <p>Drawer Item One</p>    
                        </div>}</>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='w-full'>
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
                    <RichTextEditor 
                        value="value"
                        onChange={()=>null}
                        name="rich text editor"
                    />
                </div>
            </div>
        </div>
    )
}
