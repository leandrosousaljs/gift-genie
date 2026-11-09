'use server';

import { OpenAI } from 'openai';

import { instructions } from './instructions';

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

export const getAIResponse = async (userPrompt: string): Promise<string> => {
  try {
    const stream = await openai.responses.create({
      model: process.env.AI_MODEL as string,
      instructions,
      input: userPrompt,
      tools: [{ type: 'web_search' }],
      stream: true,
    });

    let giftSuggestions = '';

    for await (const event of stream) {
      if (event.type === 'response.output_text.delta') {
        giftSuggestions += event.delta;
      }
    }

    return giftSuggestions;
  } catch (error) {
    console.error('Error making AI request: ', error);

    return `Sorry, I couldn't find any suggestions right now. Please try again later.`;
  }
};
