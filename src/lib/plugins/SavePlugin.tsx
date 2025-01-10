import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor } from "lexical";
import React, { useEffect, useState } from "react";
import { useStoryPage } from "@/domains/stories/hooks";
import { debounce } from "lodash";
import { useMutation } from "react-query";
import { createOrUpdatePage } from "@/domains/stories/api";


interface SavePluginProps {
    storyId: string;
    pageId: string;
}

export const SavePlugin: React.FC<SavePluginProps> = ({ storyId, pageId }) => {
    const [editor] = useLexicalComposerContext();
    const [editorState, setEditorState] = useState<string | null>(null);
    const mutation = useMutation(createOrUpdatePage);

    // Debounced function to update the page
    const debouncedUpdatePage = React.useCallback(
        debounce((page) => {
            mutation.mutate(page);
        }, 500),
        [mutation]
    );

    useEffect(() => {
        // Register an update listener that gets called on every editor state change
        const removeUpdateListener = editor.registerUpdateListener(() => {
            const serializedEditorState = _serializeAndSaveEditorStateToJson(editor);
            setEditorState(serializedEditorState)
        });

        return () => {
            removeUpdateListener(); // Cleanup the listener when the component unmounts
        };
    }, [editor]); // This effect depends on the `editor` instance

    useEffect(() => {
        if (editorState) {
            const page = {
                id: pageId,
                chapter_id: "0caecfbd-1be6-4a0f-8a13-ddaab64aefba",
                content: editorState,
            };
            debouncedUpdatePage(page);
        }
    }, [editorState, debouncedUpdatePage, pageId]);

    return null;
}

function _serializeAndSaveEditorStateToJson(editor: LexicalEditor): string {
    const editorState = editor.getEditorState();
    const json = editorState.toJSON();
    const jsonState = JSON.stringify(json)
    localStorage.setItem('editorState', jsonState);
    return jsonState;
};

export async function loadEditorSavedState(){
    const initialState = localStorage.getItem('editorState');
    return initialState;
};