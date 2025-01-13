import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $getRoot, $createTextNode, LexicalEditor } from "lexical";

interface StreamAITextPluginProps {
  userMessages: string[];
  options: {};
}

const StreamTextPlugin: React.FC<StreamAITextPluginProps> = ({ userMessages = [], options = {} }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!userMessages || userMessages.length === 0) return;

    _insertStreamedText(editor, userMessages, options).catch((error) => {
      console.error("Error inserting streamed text:", error);
    });
  }, [userMessages]);

  return null;
};

const _insertStreamedText = async (editor: LexicalEditor, userMessages: string[], options: {}) => {
  const response = await fetch("/api/chatCompletion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: userMessages, options }),
  });

  if (!response.body) {
    console.error("No response body received.");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let chunkBuffer = ""; // Accumulates incomplete data between chunks
  let lastWordFragment = ""; // Tracks the last incomplete word

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode the chunk and add it to the buffer
      const chunk = decoder.decode(value, { stream: true });
      chunkBuffer += chunk; // Append the chunk to the buffer

      // Split the buffer into lines
      const lines = chunkBuffer.split("\n");
      chunkBuffer = lines.pop() || ""; // Retain incomplete line in buffer

      for (const line of lines) {
        const { text, carryOver } = _formatStreamChunk(line, lastWordFragment);

        // Append any carried-over word fragments
        lastWordFragment = carryOver;

        if (text.trim()) {
          editor.update(() => _insertEditorTextCallback(text));
        }
      }
    }

    // Handle any leftover fragment and buffer data
    if (chunkBuffer.trim() || lastWordFragment.trim()) {
      const finalFormattedText = _formatStreamChunk(chunkBuffer + lastWordFragment, "").text;
      editor.update(() => _insertEditorTextCallback(finalFormattedText));
    }
  } catch (error) {
    console.error("Error streaming text:", error);
  } finally {
    reader.releaseLock();
    chunkBuffer = ""; // Clear the buffer
  }
};

const _formatStreamChunk = (chunk: string, carryOver: string = "") => {
  if (!chunk.startsWith("data: ")) return { text: "", carryOver: "" }; // Skip invalid lines

  // Remove the "data: " prefix
  let cleanedChunk = chunk.slice(6);

  // Replace escaped characters
  cleanedChunk = cleanedChunk
    .replace(/^"(.*)"$/, "$1") // Remove wrapping quotes if present
    .replace(/\\n/g, "\n") // Replace escaped newlines with actual newlines
    .replace(/\\"/g, '"') // Replace escaped quotes with regular quotes
    .replace(/\\\\/g, "\\"); // Replace double backslashes with single backslashes

  // Handle word fragments across chunks
  const words = cleanedChunk.split(/(\s+)/); // Split by words and spaces
  const carryOverWord = carryOver + (words.shift() || ""); // Append carry-over word fragment

  // Ensure proper spacing and return formatted text and remaining fragment
  return {
    text: carryOverWord + words.join(""),
    carryOver: words.pop()?.trim() ? words.pop() || "" : "",
  };
};

const _insertEditorTextCallback = (text: string) => {
  const root = $getRoot();
  const selection = $getSelection();

  if ($isRangeSelection(selection)) {
    selection.insertText(text); // Insert text at the cursor position
  } else {
    root.append($createTextNode(text)); // Append text to the end if no selection
  }
};

export default StreamTextPlugin;
