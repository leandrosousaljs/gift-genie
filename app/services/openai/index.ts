'use server';

import { OpenAI } from 'openai';
import { messages } from './messages';

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

export const getAIResponse = async (userPrompt: string): Promise<string> => {
  messages.push({
    role: 'user',
    content: `Generate fresh gift ideas for this new user request: ${userPrompt}`,
  });

  try {
    const stream = await openai.chat.completions.create({
      model: process.env.AI_MODEL as string,
      messages,
      stream: true,
    });

    let giftSuggestions = '';

    for await (const chunk of stream) {
      giftSuggestions += chunk.choices[0].delta.content;
    }

    return giftSuggestions;
  } catch (error) {
    console.error('Error making AI request: ', error);

    return `Sorry, I couldn't find any suggestions right now. Please try again later.`;
  }
};
