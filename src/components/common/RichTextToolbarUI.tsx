import { WandSparkles, Image, Bold, Type, Italic, CaseUpper } from "lucide-react"
import { Toolbar, ToolbarAction, ToolbarContent, ToolbarDivider } from "./Toolbar"

type RichTextToolbarUIActions = {
    onAITextAction: () => void;
    onAIImageAction: () => void;
    onHeaderTypeAction: () => void;
    onSubheaderTypeAction: () => void;
    onBoldAction: () => void;
    onUppercaseAction: () => void;
    onItalicAction: () => void;
}

interface RichTextToolbarUIProps extends RichTextToolbarUIActions {
    classNames?: string;
}

export const RichTextToolbarUI: React.FC<RichTextToolbarUIProps> = ({...props}) => {
    return (
        <Toolbar classNames={props.classNames}>
            <ToolbarContent>
                <ToolbarAction onClick={props.onAITextAction}>
                    <WandSparkles width={20} height={20} strokeWidth={1.25}/>
                </ToolbarAction>
                <ToolbarAction onClick={props.onAIImageAction}>
                    <Image width={20} height={20} strokeWidth={1.25}/>
                </ToolbarAction>
                <ToolbarDivider />
                <ToolbarAction onClick={props.onHeaderTypeAction}>
                    <Type width={20} height={20} />
                </ToolbarAction>
                <ToolbarAction onClick={props.onSubheaderTypeAction}>
                    <Type width={16} height={16} />
                </ToolbarAction>
                <ToolbarAction onClick={props.onBoldAction}>
                    <Bold width={20} height={20} />
                </ToolbarAction>
                <ToolbarAction onClick={props.onItalicAction}>
                    <Italic width={20} height={20} />
                </ToolbarAction>
                <ToolbarAction onClick={props.onUppercaseAction}>
                    <CaseUpper width={30} height={30} strokeWidth={1.25} />
                </ToolbarAction>
            </ToolbarContent>
        </Toolbar>
    )
};