'use client';

import { useState } from 'react';
import { getAIResponse } from './services/openai';

export default function Home() {
  const [result, setResult] = useState('');

  const handleSubmit = async (formData: FormData): Promise<void> => {
    const userPrompt = formData.get('userPrompt');

    if (typeof userPrompt !== 'string') return;

    const response = await getAIResponse(userPrompt);

    setResult(response || 'No suggestions found.');
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

          <button type="submit">
            <img src="#" alt="Lamp" />
            <span>Rub the Lamp</span>
          </button>
        </form>

        <section>
          <p>{result}</p>
        </section>
      </main>
    </div>
  );
}
