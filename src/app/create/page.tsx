import { Textarea } from "@/components/ui/textarea";

export default function Test () {
    return <div className="flex h-screen w-screen align-center justify-center">
        <div className="flex flex-col h-32 mt-[15%] gap-2">
            <p>Generate Image</p>
            <Textarea className="w-[560px]"/>
            <button className="flex self-start bg-green-400 p-2 pl-4 pr-4 rounded-md">Create</button>
        </div>
    </div>
}