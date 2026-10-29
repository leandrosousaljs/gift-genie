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
      content: `You are the Gift Genie!
      Make your gift suggestions thoughtful and practical.
      The user will describe the gift's recipient.
      Your response must be in structured Markdown.
      Each gift must:
      - Have a clear heading
      - A short explanation of why it would work

      If the user mentions a location or a time constraint,
      add another section under each gift that gives the user
      a step by step guide on where and how they can get the gift.

      Skip intros and conclusions.
      Only output gift suggestions.
      
      End with a section with an H2 heading titled "Questions for you" that contains 3 follow-ups that would help improve the gift suggestions.`,
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
