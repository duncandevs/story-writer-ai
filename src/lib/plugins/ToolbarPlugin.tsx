import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  TextFormatType,
  $isTextNode,
  LexicalNode,
  TextNode
} from "lexical";
import { RichTextAction } from "@/contants";
import { RichTextToolbar } from "@/components/common/RichTextToolbar";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";


const _mergeNodeStyle = (node: TextNode, styles = {}) => {
    // Get existing styles from the node
    let nodeStyles = node.__style || "";
  
    // Parse existing styles into an object
    const styleObj: { [key: string]: string } = {};
    nodeStyles.split(";").forEach((style) => {
      const [key, value] = style.split(":").map((s) => s.trim());
      if (key && value) {
        styleObj[key] = value;
      }
    });
  
    // Iterate through new styles and toggle them
    for (const [key, value] of Object.entries(styles)) {
      if (styleObj[key] === value) {
        // If the style exists with the same value, remove it
        delete styleObj[key];
      } else {
        // Otherwise, add or update the style
        styleObj[key] = value;
      }
    }
  
    // Convert the updated styles back into a CSS string
    const newStyleString = Object.entries(styleObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");
  
    // Set the new style string to the node
    node.setStyle(newStyleString);
  };
  

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
                _mergeNodeStyle(node, { "font-size": size })
            }
        });
      }
    });
  };

  const applyUppercase= () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const textNodes = selection.getNodes();
        textNodes.forEach((node) => {
            if($isTextNode(node)) {
                console.log(node.__style)
                _mergeNodeStyle(node, { "text-transform": "uppercase" })
            }
        });
      }
    });
  };

  const onAddImage = () => {
    let src = "https://images.unsplash.com/photo-1727261909598-ce67f083f858?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    editor.update(() => {
      const node = $createImageNode({ src, alt: "Dummy text" });
      $insertNodes([node]);
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
      <RichTextToolbar 
        onAIImageAction={onAddImage}
        onAITextAction={()=>null}
        onUppercaseAction={applyUppercase}
        onBoldAction={() => toggleStyle("bold")}
        onItalicAction={() => toggleStyle("italic")}
        onHeaderTypeAction={() => applyFontSize("40px")}
        onSubheaderTypeAction={() => applyFontSize("32px")}
      />
    </div>
  );
}
