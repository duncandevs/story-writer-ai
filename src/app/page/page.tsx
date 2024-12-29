"use client"
import './page.css';
import { RichTextEditor } from "@/lib/RichTextEditor";
import './page.css';

export default function RichText () {
    return (
        <div className='abhayaLibre' style={{maxHeight: 1600, minHeight: window.innerHeight}}>
            <div style={{height: window.innerHeight * 0.9}}>
                <input placeholder='TITLE' className='EditorTitle flex'/>
                <RichTextEditor 
                    value="value"
                    onChange={()=>null}
                    name="rich text editor"
                />
            </div>
        </div>
    )
}
