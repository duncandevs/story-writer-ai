"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import './page.css';

const editorConfig = {
  namespace: 'MinimalEditor',
  theme: {},
  onError: (error) => {
    console.error(error);
  },
};

// Floating Toolbar Component
function FloatingToolbar() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, visible: false });

  useEffect(() => {
    const updateToolbarPosition = () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nativeSelection = window.getSelection();
        console.log('native selection range count: ', nativeSelection && nativeSelection.rangeCount)
        if (nativeSelection && nativeSelection.rangeCount > 0) {
          const domRange = nativeSelection.getRangeAt(0);
          const rect = domRange.getBoundingClientRect();
          setPosition({
            top: rect.top + window.scrollY + 40, // Place above the selection
            left: rect.left + window.scrollX,
            visible: true,
          });
        } else {
          setPosition((prev) => ({ ...prev, visible: false }));
        }
      } else {
        setPosition((prev) => ({ ...prev, visible: false }));
      }
    };

    const removeListener = editor.registerUpdateListener(() => {
      editor.getEditorState().read(updateToolbarPosition);
    });

    return () => {
      removeListener();
    };
  }, [editor]);

  const handleBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const handleItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  const handleUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  };

  return position.visible ? (
    <div
      ref={toolbarRef}
      className="floating-toolbar"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <button onClick={handleBold} className="toolbar-button">
        B
      </button>
      <button onClick={handleItalic} className="toolbar-button">
        I
      </button>
      <button onClick={handleUnderline} className="toolbar-button">
        U
      </button>
    </div>
  ) : null;
}

export default function MinimalEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor" />}
          placeholder={<div className="placeholder">Start writing...</div>}
          ErrorBoundary={(error) => <div>An error occurred: {error.message}</div>}
        />
        <HistoryPlugin />
        <FloatingToolbar /> {/* Add the Floating Toolbar */}
      </div>
    </LexicalComposer>
  );
}
