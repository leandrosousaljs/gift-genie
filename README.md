# Gift Genie 🧞

O **Gift Genie** é um gerador de ideias de presentes movido a inteligência artificial. Você descreve a ocasião e quem vai ganhar o presente, e o Gênio retorna sugestões estruturadas com:

- Nome do presente com descrição curta
- Por que funciona para aquela pessoa
- Faixa de preço atual
- Links para comprar (lojas e redes sociais)

## Tecnologias

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Vercel AI SDK

### Pré-requisitos

- Node.js 24+
- Uma chave de API para um provedor compatível com OpenAI (ex.: OpenAI, Groq, Together, etc.)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/leandrosousaljs/gift-genie.git
cd gift-genie

# Instale as dependências
npm install
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha com seus valores:

```bash
cp .env.example .env
```

### Executando em desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.
