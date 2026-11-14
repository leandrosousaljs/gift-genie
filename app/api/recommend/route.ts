import { createOpenAI } from '@ai-sdk/openai';
import { createTextStreamResponse, streamText, toTextStream } from 'ai';

import { instructions } from '@/app/services/openai/instructions';

const openai = createOpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai.responses(process.env.AI_MODEL as string),
    system: instructions,
    prompt,
    tools: {
      web_search: openai.tools.webSearch({}),
    },
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
