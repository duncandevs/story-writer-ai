import { together, TogetherImageResponseData } from ".";

async function createImageFromPrompt (prompt: string): Promise<TogetherImageResponseData> {
    const response = await together.images.create({
        model: "black-forest-labs/FLUX.1-schnell",
        prompt: prompt,
        width: 1024,
        height: 768,
        steps: 12,
        n: 2,
        response_format: "base64",
    });
    return response?.data[0]
};

export default createImageFromPrompt;
