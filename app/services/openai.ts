import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

const messages: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content:
      'Make these suggestions thoughtful and practical. Your response must be under 100 words. Skip intros and conclusions. Only output gift suggestions.',
  },
];

try {
  const response = await openai.chat.completions.create({
    model: process.env.AI_MODEL as string,
    messages,
  });

  console.log(response.choices[0].message?.content);
} catch (error) {
  if (error instanceof OpenAI.APIError) {
    if (error.status === 401 || error.status === 403) {
      console.error("Authentication error: Check your AI_KEY and make sure it's valid", error);
    }
  }

  console.error('Error making AI request: ', error);
}
