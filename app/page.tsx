'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { useCompletion } from '@ai-sdk/react';

import genie from '@/public/genie.svg';
import lamp from '@/public/lamp.svg';

export default function Home() {
  const [userPrompt, setUserPrompt] = useState('');

  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/recommend',
    onError: (error) => {
      console.error('Completion error:', error);
    },
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userPrompt.trim()) return;

    await complete(userPrompt);
    setUserPrompt('');
  };

  return (
    <div className="app-container">
      <header className="animate-fade-in-down">
        <div>
          <Image src={genie} alt="Gênio" width={60} height={60} className="drop-shadow-accent" />
          <h1>Gift Genie</h1>
        </div>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="mb-2">
          <div className="w-full flex">
            <textarea
              name="userPrompt"
              id="userPrompt"
              placeholder="Ex.: Minha irmã adora fazer trilhas, curte ficção científica e está sempre descobrindo lugares novos para comer..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              required
            />
          </div>

          <div className={`lamp-container ${isLoading ? 'scale-90' : ''}`}>
            <button type="submit" disabled={isLoading} className={`${isLoading ? '' : ''}`}>
              <Image
                src={lamp}
                alt="Lâmpada"
                width={156}
                height={156}
                className={`${isLoading ? 'animate-rub-lamp' : ''}`}
                style={{
                  filter: isLoading
                    ? 'drop-shadow(0 0 30px var(--accent-hover))'
                    : 'drop-shadow(0 0 8px var(--accent-glow))',
                }}
              />
              <span>{isLoading ? 'Invocando ideias de presentes...' : 'Esfregue a lâmpada'}</span>
            </button>
          </div>
        </form>

        <section>
          {completion && (
            <div className={`${completion ? 'opacity-100' : 'opacity-0'}`}>
              <article>
                <ReactMarkdown>{completion}</ReactMarkdown>
              </article>
            </div>
          )}
        </section>

        {error && (
          <p className="text-center" style={{ color: 'var(--text-secondary)' }}>
            O gênio precisa de um descanso! Tente novamente mais tarde.
          </p>
        )}
      </main>

      <footer className="animate-fade-in-up">
        <p style={{ color: 'var(--text-secondary)' }}>
          Desenvolvido por{' '}
          <a
            href="https://www.github.com/leandrosousaljs/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-primary)' }}
          >
            Leandro Sousa
          </a>
        </p>
      </footer>
    </div>
  );
}
