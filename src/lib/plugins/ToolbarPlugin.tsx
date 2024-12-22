import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
  $isTextNode,
} from "lexical";
import { RichTextAction } from "@/contants";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [selectionMap, setSelectionMap] = useState<{ [key: string]: boolean }>(
    {}
  );

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setSelectionMap({
        [RichTextAction.Bold]: selection.hasFormat("bold"),
        [RichTextAction.Italics]: selection.hasFormat("italic"),
        [RichTextAction.Underline]: selection.hasFormat("underline"),
      });
    }
  };

  const toggleStyle = (style: TextFormatType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(style); // Use formatText directly on RangeSelection
      }
    });
  };

  const applyFontSize = (size: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const textNodes = selection.getNodes();
        textNodes.forEach((node) => {
            if($isTextNode(node)) {
                node.setStyle(`font-size: ${size}`)
            }
        });
      }
    });
  };

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor]);

  return (
    <div className="flex gap-4 toolbar">
      <button
        className={`toolbar-btn ${selectionMap.bold ? "active" : ""}`}
        onClick={() => toggleStyle("bold")}
      >
        <strong>B</strong>
      </button>
      <button
        className={`toolbar-btn ${selectionMap.italic ? "active" : ""}`}
        onClick={() => toggleStyle("italic")}
      >
        <em>Italics</em>
      </button>
      <button className="toolbar-btn" onClick={() => applyFontSize("40px")}>
        T
      </button>
      <button className="toolbar-btn" onClick={() => applyFontSize("32px")}>
        t
      </button>
    </div>
  );
}
