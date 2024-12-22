"use client"
import './page.css';
import { RichTextEditor } from "@/lib/RichTextEditor";
import { RichTextToolbar } from '@/components/common/RichTextToolbar';

export default function RichText () {
    return (
        <div className='container' style={{height: window.innerHeight}}>
            <div style={{height: window.innerHeight * 0.9}}>
                <RichTextEditor 
                    value="value"
                    onChange={()=>null}
                    name="rich text editor"
                />
            </div>
        </div>
    )
}
