"use client"
import './page.css';
import { RichTextEditor } from "@/lib/RichTextEditor";
import './page.css';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
