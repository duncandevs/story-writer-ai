import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { $isImageNode, $createImageNode } from './imageNode';
import { $getRoot, LexicalNode } from 'lexical'

export function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Listen for editor state updates
    const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const imageNodes: LexicalNode[] = [];
        console.log('SHOW ME ALL THE NODES: ', root.getChildren())
        // Traverse through the root to find all ImageNodes
        root.getChildren().forEach((node) => {
          if ($isImageNode(node)) {
            console.log('FOUND AN IMAGE NODE: ', node)
            imageNodes.push(node);
          }
        });

        console.log('Found ImageNodes:', imageNodes); // Debugging
      });
    });

    return () => {
      // Clean up listener
      removeUpdateListener();
    };
  }, [editor]);

  // Add a function to insert an image
  const insertImage = (src: string) => {
    editor.update(() => {
      const imageNode = $createImageNode(src);
      const selection = editor.getEditorState().read(() => $getRoot());
      selection.append(imageNode);
    });
  };

  return null; // This plugin does not render anything directly
}
