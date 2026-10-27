'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import { getAIResponse } from './services/openai';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData): Promise<void> => {
    const userPrompt = formData.get('userPrompt');

    if (typeof userPrompt !== 'string') return;

    const response = await getAIResponse(userPrompt);
    setResult(response);
  };

  return (
    <div>
      <header>
        <img src="#" alt="Gift Genie" />
        <h1>Gift Genie</h1>
      </header>

      <main>
        <form action={handleSubmit}>
          <textarea
            name="userPrompt"
            id="userPrompt"
            placeholder="e.g. My friend who loves hiphop music has a birthday coming up..."
            required
          />

          <Button type="submit">
            <img src="#" alt="Lamp" />
            <span>Rub the Lamp</span>
          </Button>
        </form>

        <section>{result && <ReactMarkdown>{result}</ReactMarkdown>}</section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Gift Genie</p>
      </footer>
    </div>
  );
}
