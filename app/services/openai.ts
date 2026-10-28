'use server';

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

export const getAIResponse = async (userPrompt: string): Promise<string> => {
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        'You are the Gift Genie!. Make your gift suggestions thoughtful and practical. Your response must be under 100 words. Skip intros and conclusions. Only output gift suggestions.',
    },
    {
      role: 'user',
      content: userPrompt,
    },
  ];

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
