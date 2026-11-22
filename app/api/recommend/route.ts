import { createOpenAI } from '@ai-sdk/openai';
import { createUIMessageStreamResponse, streamText, toUIMessageStream } from 'ai';

import { instructions } from '@/app/api/recommend/instructions';

const openai = createOpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = streamText({
      model: openai.responses(process.env.AI_MODEL as string),
      system: instructions,
      prompt: `Generate fresh gift suggestions for this request: ${prompt}`,
      tools: {
        web_search: openai.tools.webSearch({}),
      },
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: (error) => {
          console.error('Streaming error:', error);
          return error instanceof Error ? error.message : String(error);
        },
      }),
    });
  } catch (error) {
    console.error('Error in /api/recommend:', error);

    return Response.json({ error: 'Failed to generate gift suggestions.' }, { status: 500 });
  }
}
