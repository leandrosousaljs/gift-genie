'use server';

import { OpenAI } from 'openai';

import { instructions } from './instructions';

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

export const getAIResponse = async (userPrompt: string): Promise<string> => {
  try {
    const response = await openai.responses.create({
      model: process.env.AI_MODEL as string,
      instructions,
      input: userPrompt,
      tools: [{ type: 'web_search' }],
    });

    return response.output_text;
  } catch (error) {
    console.error('Error making AI request: ', error);

    return `Sorry, I couldn't find any suggestions right now. Please try again later.`;
  }
};
