import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, createEditor } from "lexical";
import { useEffect, useState } from "react";
import { createOrUpdatePage } from "@/domains/stories/api";


export const SavePlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [editorState, setEditorState] = useState<string | null>(null);

    useEffect(() => {
        // Register an update listener that gets called on every editor state change
        const removeUpdateListener = editor.registerUpdateListener(() => {
            // Assuming _serializeEditorStateToJson is a function that serializes the editor state
            const serializedEditorState = _serializeAndSaveEditorStateToJson(editor);
            setEditorState(serializedEditorState)
        });

        // Cleanup the listener when the component unmounts
        return () => {
            removeUpdateListener();
        };
    }, [editor]); // This effect depends on the `editor` instance

    useEffect(() => {
        const page = {
            id: "f58ea269-cad8-4d0c-9383-9105065b7ade",
            chapter_id: "0caecfbd-1be6-4a0f-8a13-ddaab64aefba",
            title: null,
            content: editorState
        }
        createOrUpdatePage(page);
    }, [editorState]);

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