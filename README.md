# react-ai-chatbot

An AI-powered chatbot web application built with React and Vite, supporting multiple large language models including Google Gemini, OpenAI (GPT), and DeepSeekAI.

## Features
- Conversational chatbot UI
- Multiple AI assistants (Gemini, OpenAI, DeepSeekAI)
- Streaming AI responses
- Markdown-rendered messages
- Light / Dark theme toggle
- Loader animation during response generation
- Responsive design for desktop and mobile

## Tech Stack
- React 19
- Vite
- OpenAI SDK
- @google/generative-ai
- DeepSeekAI (OpenAI-compatible API)
- CSS Modules
- ESLint

## Project Structure
- `src/App.jsx` – Main application logic and state management
- `src/components/Chat` – Chat message rendering with markdown
- `src/components/Controls` – Message input and send controls
- `src/components/Loader` – Loading animation
- `src/components/assistants` – AI provider integrations
- `src/index.css` – Global styles
- `.env.example` – Environment variable template

## AI Assistants
Each assistant is implemented as a separate module:
- Google Gemini
- OpenAI GPT
- DeepSeekAI  

Switching assistants requires minimal code changes.

## Setup
```bash
npm install
npm run dev
