import { WandSparkles, Image, Bold, Type, Italic, CaseUpper } from "lucide-react"
import { Toolbar, ToolbarAction, ToolbarContent, ToolbarDivider } from "./Toolbar"


export const RichTextToolbar = () => {
    return (
        <Toolbar>
            <ToolbarContent>
                <ToolbarAction onClick={()=>alert('italisize')}>
                    <WandSparkles width={20} height={20} strokeWidth={1.25}/>
                </ToolbarAction>
                <ToolbarAction onClick={()=>alert('italisize')}>
                    <Image width={20} height={20} strokeWidth={1.25}/>
                </ToolbarAction>
                <ToolbarDivider />
                <ToolbarAction onClick={()=>alert('italisize')}>
                    <Type width={20} height={20} />
                </ToolbarAction>
                <ToolbarAction onClick={()=>alert('italisize')}>
                    <Type width={16} height={16} />
                </ToolbarAction>
                <ToolbarAction onClick={()=>alert('bolden')}>
                    <Bold width={20} height={20} />
                </ToolbarAction>
                <ToolbarAction onClick={()=>alert('italisize')}>
                    <Italic width={20} height={20} />
                </ToolbarAction>
                <ToolbarAction onClick={()=>alert('italisize')}>
                    <CaseUpper width={30} height={30} strokeWidth={1.25} />
                </ToolbarAction>
            </ToolbarContent>
        </Toolbar>
    )
};