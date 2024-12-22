"use client"
import { Card } from "@/components/ui/card";
import React, { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { cn } from "./utils";
import { css } from "@emotion/css";

import { ImagePlugin } from "./plugins/ImagePlugin";
// import CustomOnChangePlugin from "./Plugins/CustomOnChangePlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ImageNode } from "./nodes/ImageNode";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor({ value, onChange, placeholder, name }) {
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
                  className={css({
                    height: `inherit`,
                    fontSize: 22,
                    padding: 8,
                    overflow: "auto",
                    outline: "none",
                    border: "1px solid black",
                    borderRadius: "4px",
                  })}
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
          {/* <CustomOnChangePlugin value={value} onChange={onChange} /> */}
          <div style={{
                position: 'absolute', 
                left: 0, 
                right: 0, 
                bottom: '24%',
                marginInline: 'auto', 
                width: "fit-content",
        }}><ToolbarPlugin /></div>
        </LexicalComposer>
    );
  }
);