"use client"
import './page.css';
import { RichTextEditor } from "@/lib/RichTextEditor";

export default function RichText () {
    return (
        <div className='container'>
            <RichTextEditor 
                value="value"
                onChange={()=>null}
                name="rich text editor"
            />
            <p className='text-chocolate-brown'>TESTING</p>
        </div>
    )
}
