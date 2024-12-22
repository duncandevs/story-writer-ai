"use client"
import './page.css';
import { RichTextEditor } from "@/lib/RichTextEditor";
import { RichTextToolbar } from '@/components/common/RichTextToolbar';

export default function RichText () {
    return (
        <div className='container'>
            <RichTextEditor 
                value="value"
                onChange={()=>null}
                name="rich text editor"
            />
            <h1 className='roboto'>Abracadabra</h1>
            <p>NOT ROBOTO</p>
            <RichTextToolbar />
        </div>
    )
}
