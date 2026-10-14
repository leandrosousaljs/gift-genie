import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

const userPrompt = 'Suggest some gifts for someone who loves programming';

const userMessage = {
  role: 'user' as const,
  content: userPrompt,
};

console.log('Prompt:', userPrompt);
console.log('Making AI request...');

try {
  const aiResponse = await openai.chat.completions.create({
    model: process.env.AI_MODEL as string,
    messages: [userMessage],
  });

  console.log('AI Response:');
  console.log(aiResponse.choices[0].message?.content);
} catch (error) {
  if (error instanceof OpenAI.APIError) {
    if (error.status === 401 || error.status === 403) {
      console.error("Authentication error: Check your AI_KEY and make sure it's valid", error);
    }
  }

  console.error('Error making AI request:', error);
}
