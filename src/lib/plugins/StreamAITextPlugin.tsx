import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $getRoot, $createTextNode } from "lexical";
import { createChatCompletionStream }  from "@/lib/together/createChatCompletionStream";


interface StreamAITextPluginProps {
    userMessages: string[],
    options: {}
}

const StreamTextPlugin: React.FC<StreamAITextPluginProps> = ({ userMessages=[], options={} }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!userMessages || userMessages.length === 0) return;

    const insertStreamedText = async () => {
      const tokenStream = createChatCompletionStream(userMessages, options);

      for await (const token of tokenStream) {
        editor.update(() => {
          const root = $getRoot();
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            selection.insertText(token); // Insert text token at the current cursor position
          } else {
            root.append($createTextNode(token)); // Insert text token at the end of the editor if editor is not in focus
          }
        });
      }
    };

    insertStreamedText().catch((error) => {
      console.error("Error inserting streamed text:", error);
    });
  }, [userMessages]);

  return null;
};

export default StreamTextPlugin;
