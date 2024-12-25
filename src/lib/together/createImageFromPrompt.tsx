import { together, TogetherImageResponseData } from ".";

type CreateImageFromPromptResponse = {
    data: TogetherImageResponseData,
    imageSource: string | null;
}
async function createImageFromPrompt (prompt: string): Promise<CreateImageFromPromptResponse> {
    const response = await together.images.create({
        model: "black-forest-labs/FLUX.1-schnell",
        prompt: prompt,
        width: 1024,
        height: 768,
        steps: 12,
        n: 2,
        response_format: "base64",
    });
    let data = response?.data[0];
    return {
        data,
        imageSource: data ? `data:image/png;base64,${data.b64_json}` : null
    }
};

export default createImageFromPrompt;
