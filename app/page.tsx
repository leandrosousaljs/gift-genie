'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useCompletion } from '@ai-sdk/react';

import { Button } from '@/components/ui/button';

export default function Home() {
  const [userPrompt, setUserPrompt] = useState('');

  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/recommend',
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userPrompt.trim()) return;

    await complete(userPrompt);
    setUserPrompt('');
  };

  return (
    <div>
      <header>
        <img src="#" alt="Gift Genie" />
        <h1>Gift Genie</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <textarea
            name="userPrompt"
            id="userPrompt"
            placeholder="e.g. My friend who loves hiphop music has a birthday coming up..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            required
          />

          <Button type="submit" disabled={isLoading}>
            <img src="#" alt="Lamp" />
            <span>{isLoading ? 'Thinking...' : 'Rub the Lamp'}</span>
          </Button>
        </form>

        {isLoading && !completion && <p>Buscando ideias...</p>}

        <section>{completion && <ReactMarkdown>{completion}</ReactMarkdown>}</section>

        {error && <p>{`Sorry, I couldn't find any suggestions right now. Please try again later.`}</p>}
      </main>

      <footer>
        <p>
          Developed by{' '}
          <a href="https://www.linkedin.com/in/leandrosousaljs/" target="_blank" rel="noopener noreferrer">
            Leandro Sousa
          </a>
        </p>
      </footer>
    </div>
  );
}
