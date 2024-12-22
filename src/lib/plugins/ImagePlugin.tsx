import React, { useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";

export function ImagePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [editor] = useLexicalComposerContext();

  const onAddImage = () => {
    // let src = "";
    // if (url) src = url;
    // if (file) src = URL.createObjectURL(file);
    let src = "https://www.billboard.com/wp-content/uploads/2024/11/J-Cole-2024-Dreamville-Music-Festival-89-billboard-1548.jpg?w=942&h=623&crop=1"

    editor.update(() => {
      const node = $createImageNode({ src, alt: "Dummy text" });
      $insertNodes([node]);
    });
    setFile(undefined);
    setURL("");
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={onAddImage}>Add Image</button>
    </div>
  );
}