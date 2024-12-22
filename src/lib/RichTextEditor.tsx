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
      <Card>
        <LexicalComposer initialConfig={initialConfig}>
            <ImagePlugin />
            <ToolbarPlugin />
          {/* <ToolbarPlugin /> */}
          <Card style={{height: 350}}>
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className={cn({
                    height: `100%`,
                    fontSize: 12,
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
                  className={cn({
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
          </Card>
          <AutoFocusPlugin />
          <HistoryPlugin />
          <ListPlugin />
          {/* <CustomOnChangePlugin value={value} onChange={onChange} /> */}
        </LexicalComposer>
      </Card>
    );
  }
);