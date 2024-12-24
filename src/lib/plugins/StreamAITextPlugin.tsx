import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW } from "lexical";
import createChatCompletionStream  from "@/lib/together/createChatCompletionStream";



const StreamTextPlugin = ({ userMessages=["write a short story of a kid finding santa"], options={} }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!userMessages || userMessages.length === 0) return;

    // Function to insert streamed text
    const insertStreamedText = async () => {
      const tokenStream = createChatCompletionStream(userMessages, options);

      for await (const token of tokenStream) {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            selection.insertText(token); // Insert token at the current cursor position
          }
        });
      }
    };

    insertStreamedText().catch((error) => {
      console.error("Error inserting streamed text:", error);
    });
  }, [editor, userMessages, options]);

  return null;
};

export default StreamTextPlugin;
