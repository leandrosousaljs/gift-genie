import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

const prompt = 'Suggest some gifts for someone who loves programming';

console.log('Prompt:', prompt);
console.log('Making AI request...');

try {
  const response = await openai.chat.completions.create({
    model: process.env.AI_MODEL as string,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  console.log('AI Response:');
  console.log(response.choices[0].message?.content);
} catch (error) {
  if (error instanceof OpenAI.APIError) {
    if (error.status === 401 || error.status === 403) {
      console.error("Authentication error: Check your AI_KEY and make sure it's valid", error);
    }
  }

  console.error('Error making AI request:', error);
}

export default function Home() {
  return <div>Home</div>;
}
