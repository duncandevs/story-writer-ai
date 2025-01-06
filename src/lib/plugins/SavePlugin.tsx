import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, createEditor } from "lexical";
import { useEffect, useState } from "react";

export const SavePlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [editorState, setEditorState] = useState(null);
    const [editorStateLoadingIsFinished, setEditorStateLoadingIsFinished] = useState(false);
    
    // loadEditorSavedState(editor).then((res) => {
    //     setEditorState(editorState);
    // }).catch((err)=>{
    //     setEditorStateLoadingIsFinished(true);
    // });

    useEffect(() => {
        // Register an update listener that gets called on every editor state change
        const removeUpdateListener = editor.registerUpdateListener(() => {
            // Assuming _serializeEditorStateToJson is a function that serializes the editor state
            _serializeAndSaveEditorStateToJson(editor);
        });

        // Cleanup the listener when the component unmounts
        return () => {
            removeUpdateListener();
        };
    }, [editor]); // This effect depends on the `editor` instance

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
    // Retrieve the serialized state from localStorage
    const initialState = localStorage.getItem('editorState');
    return initialState;
};