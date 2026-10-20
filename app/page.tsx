import { useState } from 'react';

export default function Home() {
  const [userPrompt, setUserPrompt] = useState('');

  return (
    <div>
      <header>
        <img src="" alt="" />
        <h1>Gift Genie</h1>
      </header>

      <main>
        <form>
          <textarea onChange={(e) => setUserPrompt(e.target.value)} placeholder="Enter a gift idea..." />

          <button type="submit">
            <img src="" alt="" />
            <span>Rub the Lamp</span>
          </button>
        </form>

        <section></section>
      </main>
    </div>
  );
}
