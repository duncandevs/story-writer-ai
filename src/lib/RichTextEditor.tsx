"use client";
import { Card } from "@/components/ui/card";
import React, { CSSProperties, useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { css } from "@emotion/css";

import { ListNode, ListItemNode } from "@lexical/list";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ImageNode } from "./nodes/ImageNode";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import StreamTextPlugin from "./plugins/StreamAITextPlugin";


interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
};

const toolbarStyles: CSSProperties = {
    position: 'fixed', 
    left: 0, 
    right: 0, 
    bottom: '20%',
    marginInline: 'auto', 
    width: "fit-content",
};

const editorContentStyles = {
    fontSize: 22,
    padding: 16,
    outline: "none",
    margin: 'auto',
    maxWidth: 'var(--default-editor-width)',
    color: 'var(--color-forest-green)',
    paddingBottom: 200,
};

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor({ placeholder, name }) {
    const initialConfig = useMemo(
      () => ({
        namespace: name,
        onError: () => {},
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          TableNode,
          TableCellNode,
          TableRowNode,
          CodeNode,
          CodeHighlightNode,
          ImageNode,
        ],
      }),
      [name]
    );

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className={css(editorContentStyles)}
                />
              }
              placeholder={
                <Card
                  className={css({
                    position: "absolute",
                    color: "#999",
                    top: 8,
                    left: 10,
                    fontSize: 12,
                  })}
                >
                  {placeholder}
                </Card>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          <AutoFocusPlugin />
          <HistoryPlugin />
          <ListPlugin />
          <StreamTextPlugin />
          <div style={toolbarStyles}><ToolbarPlugin /></div>
        </LexicalComposer>
    );
  }
);