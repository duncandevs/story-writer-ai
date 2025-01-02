import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, createEditor } from "lexical";
import { useEffect } from "react";

export const SavePlugin = () => {
    const [editor] = useLexicalComposerContext();
    
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

export function _loadEditorSavedState(editor: LexicalEditor){
        // Retrieve the serialized state from localStorage
        const serializedState = localStorage.getItem('editorState');
        if (serializedState) {
            // Parse the serialized state back into an object
            const parsedState = JSON.parse(serializedState);
            // Use Lexical's API to set the editor's state
            // editor.setEditorState((state = editor._editorState)=>state.);
        }
}