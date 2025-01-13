// Import necessary modules
import { type CompletionCreateParams } from 'together-ai/src/resources/chat/index.js';

import { together } from '.'

/**
 * Creates a chat completion using Together AI.
 *
 * @param {Array} userMessages - An array of user message objects.
 * @param {Object} [options] - Optional parameters for the chat completion.
 * @param {string} [options.model] - The model to use for generation.
 * @param {number} [options.temperature] - Sampling temperature.
 * @param {number} [options.top_p] - Top-p sampling.
 * @param {number} [options.top_k] - Top-k sampling.
 * @param {number} [options.repetition_penalty] - Penalty for repetition.
 * @param {Array} [options.stop] - Stop sequences.
 * @param {boolean} [options.stream] - Whether to stream the response.
 *
 * @returns {Promise<void>}
 */

type ChatCompletionOptions = {
        model?: string;
        temperature?: number;
        top_p?: number;
        top_k?: number;
        repetition_penalty?: number;
        stop?: string[];
        stream?: boolean;
        max_tokens?: number;
};

const defaultOptions = {
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    temperature: 0.7,
    top_p: 0.7,
    top_k: 50,
    repetition_penalty: 1,
    stop: ["<|eot_id|>", "<|eom_id|>"],
    stream: true,
    max_tokens: 32768, // Adjust as needed
};

class UserMessage {
  role;
  content;

  constructor(content: string, role: 'user' | 'system' = "user"){
    this.role = role
    this.content = content
  }
}

async function* createChatCompletionStream(
    userMessages: string[] = [],
    options = {}
  ) {
    const requestOptions = { ...defaultOptions, ...options };
  
    try {
      const messages: CompletionCreateParams.Message[] = userMessages?.map((msg)=> new UserMessage(msg));
  
      const response = await together.chat.completions.create({
        messages,
        model: requestOptions.model,
        max_tokens: requestOptions.max_tokens,
        temperature: requestOptions.temperature,
        top_p: requestOptions.top_p,
        top_k: requestOptions.top_k,
        repetition_penalty: requestOptions.repetition_penalty,
        stop: requestOptions.stop,
        stream: requestOptions.stream,
      });
  
      for await (const token of response) {
        const deltaContent = token.choices[0]?.delta?.content || "";
        yield deltaContent;
      }
    } catch (error) {
      console.log("Error creating chat completion:", error?.message || error?.messages?.[0]);
      throw error; // Propagate the error to the caller
    }
}
  

export  { createChatCompletionStream };