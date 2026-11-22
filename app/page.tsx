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
    <div className="max-w-200 mx-auto px-6 py-6 min-h-screen flex flex-col">
      <header className="text-center animate-fade-in-down">
        <div className="flex items-center justify-center gap-4">
          <Image
            src={genie}
            alt="Gênio"
            width={60}
            height={60}
            className="w-15 h-15 max-[480px]:w-12 max-[480px]:h-12"
            style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }}
          />
          <h1 className="text-[clamp(2rem,5vw,2.5rem)] font-extrabold tracking-[-0.02em] max-[480px]:text-xl">
            Gift Genie
          </h1>
        </div>
      </header>

      <main className="flex-1">
        <form onSubmit={handleSubmit} className="mb-2">
          <div className="w-full flex">
            <textarea
              name="userPrompt"
              id="userPrompt"
              placeholder="Ex.: Minha irmã adora fazer trilhas, curte ficção científica e está sempre descobrindo lugares novos para comer..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              required
              className="flex-1 bg-transparent border-0 border-b-2 border-white/20 rounded-none min-h-[calc(1.5em*3+1.2rem)] leading-normal py-3 px-0 text-[1.2rem] max-[480px]:text-[1.25rem] font-inherit resize-none transition-[border-color] duration-300 ease-in-out overflow-y-hidden focus:outline-none focus:border-(--accent-primary) placeholder:text-white/40"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>

          <div
            className={`flex flex-col items-center my-8 max-[480px]:my-4 transition-all duration-[0.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isLoading ? 'scale-90' : ''
            }`}
          >
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-transparent border-none cursor-pointer outline-none flex flex-col items-center gap-4 tap-transparent disabled:cursor-default disabled:opacity-100 ${
                isLoading ? '' : ''
              }`}
              style={{ background: 'transparent' }}
            >
              <Image
                src={lamp}
                alt="Lâmpada"
                width={156}
                height={156}
                className={`w-39 h-39 max-[480px]:w-32 max-[480px]:h-32 transition-all duration-[0.4s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:-rotate-5 focus:scale-110 focus:-rotate-5 ${
                  isLoading ? 'animate-rub-lamp' : ''
                }`}
                style={{
                  filter: isLoading
                    ? 'drop-shadow(0 0 30px var(--accent-hover))'
                    : 'drop-shadow(0 0 8px var(--accent-glow))',
                }}
              />
              <span
                className="text-[1.5rem] max-[480px]:text-[1.5rem] font-semibold opacity-90"
                style={{ color: 'var(--text-secondary)' }}
              >
                {isLoading ? 'Invocando ideias de presentes...' : 'Esfregue a lâmpada'}
              </span>
            </button>
          </div>
        </form>

        <section className="pb-4">
          {completion && (
            <div
              className={`transition-opacity duration-[0.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                completion ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <article className="text-base leading-relaxed prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-1">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 my-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 my-1">{children}</ol>,
                    li: ({ children }) => <li className="mb-1 pl-1 marker:text-(--accent-glow)">{children}</li>,
                    h2: ({ children }) => (
                      <h2 className="mt-2 mb-1 font-bold text-lg" style={{ color: 'var(--accent-primary)' }}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mt-2 mb-1 font-bold text-xl" style={{ color: 'var(--accent-primary)' }}>
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="mt-2 mb-1 font-bold text-base" style={{ color: 'var(--accent-primary)' }}>
                        {children}
                      </h4>
                    ),
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    a: ({ children, href }) => (
                      <a href={href} className="text-(--accent-primary) underline hover:opacity-80 transition-opacity">
                        {children}
                      </a>
                    ),
                    hr: () => <hr className="my-2 border-border" />,
                  }}
                >
                  {completion}
                </ReactMarkdown>
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

      <footer className="text-center pt-6 border-t border-border animate-fade-in-up">
        <p style={{ color: 'var(--text-secondary)' }}>
          Desenvolvido por{' '}
          <a
            href="https://www.github.com/leandrosousaljs/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent-primary)' }}
          >
            Leandro Sousa
          </a>
        </p>
      </footer>
    </div>
  );
}
