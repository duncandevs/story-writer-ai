
"use client";
import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot } from 'lexical'; // Import $getRoot
import { ImageNode, $createImageNode } from './basicNode';
import './page.css';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

const editorConfig = {
  namespace: 'BasicEditor',
  theme: {},
  nodes: [ImageNode], // Register the BasicNode
  onError: (error) => {
    console.error('Editor Error:', error);
  },
};

function InsertBasicNodeButton() {
  const [editor] = useLexicalComposerContext();

  const handleInsert = () => {
    editor.update(() => {
      const root = $getRoot(); // Get the root node
      const imageNode = $createImageNode({
        altText: "IMAGE",
        src:"https://cdn.dribbble.com/userupload/17382372/file/original-97c91235cd1c453ed9e345f3a87863a2.jpg?resize=752x&vertical=center",
      }); // Create the imageNode
      root.append(imageNode); // Append the imageNode to the root
    });
  };

  return <button onClick={handleInsert}>Insert Basic Node</button>;
}

export default function BasicEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <RichTextPlugin 
          contentEditable={<ContentEditable className="editor" />}
          placeholder={<div className="placeholder">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <InsertBasicNodeButton />
      </div>
    </LexicalComposer>
  );
}
