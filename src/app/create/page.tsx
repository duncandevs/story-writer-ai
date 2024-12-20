'use client';
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Together from "together-ai";

type TogetherImageResponse = Together.Images.ImageFile.Data | null;

const together = new Together({
    apiKey: process.env['NEXT_PUBLIC_TOGETHER_API_KEY'], // This is the default and can be omitted
});

export default function Test () {
    const [prompt, setPrompt] = useState('');
    const [data, setData] = useState<TogetherImageResponse>(null);
    const [isLoading, setIsLoading] = useState(false);

    const createImage = async (prompt: string) => {
        try {
            setIsLoading(true)
            const response = await together.images.create({
                model: "black-forest-labs/FLUX.1-schnell",
                prompt: prompt,
                width: 1024,
                height: 768,
                steps: 12,
                n: 2,
                response_format: "base64",
            });
            let d = response.data[0]
            console.log(d)
            setData(d)
            setIsLoading(false);
        } catch (err) {
            console.log('Failed to create image: ', err);
        };
    };

    return <div className="flex flex-col h-screen w-screen align-center justify-center pt-32">
        <div className="flex justify-center align-center">
            {data && <img style={{borderRadius: 8}} className="max-w-[400px] max-h-[400px] bg-blue-200" src={`data:image/png;base64,${data.b64_json}`} />}
            {isLoading && <p>Loading...</p>}
        </div>
        <div className="flex flex-col m-auto mt-8 gap-2">
            <p>Generate Image</p>
            <Textarea className="w-[560px]" onChange={(e)=>setPrompt(e.target.value)}/>
            <button 
                onClick={()=>createImage(prompt)}
                className="flex self-start bg-green-400 p-2 pl-4 pr-4 rounded-md"
            >
                Create
            </button>
        </div>
    </div>
}