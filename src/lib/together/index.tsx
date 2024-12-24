import Together from "together-ai";

export type TogetherImageResponseData = Together.Images.ImageFile.Data | null;

export const together = new Together({
    apiKey: process.env['NEXT_PUBLIC_TOGETHER_API_KEY'], // This is the default and can be omitted
});
