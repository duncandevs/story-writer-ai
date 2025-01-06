import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

const PAGE_LENGTH = 1000;

export const PaginationPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [pageLength, setPageLength] = useState(0);

    useEffect(() => {
        const removeUpdateListener = editor.registerUpdateListener(() => {
            editor.getEditorState().read(() => {
                const root = $getRoot();
                const textContent = root.getTextContent();
                setPageLength(textContent.length)
            });
        });

        // Cleanup the listener when the component unmounts
        return () => {
            removeUpdateListener();
        };
    }, [editor]);

    useEffect(()=>{
        console.log('pageLength: ', pageLength)
    }, [pageLength])

    return null;
};