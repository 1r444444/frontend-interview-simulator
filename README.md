# Frontend Interview Simulator

A web app for practicing JavaScript, TypeScript and React interview questions with a timer and progress tracking.

## Features

- Choose topic: JavaScript, TypeScript or React
- 30-second timer per question
- Reveal answer on demand (or auto-reveal when time runs out)
- Progress bar showing current position
- Progress saved in localStorage — continue where you left off

## Tech Stack

React · TypeScript · Tailwind CSS · Vite · localStorage

## Run Locally

```bash
npm install
npm run dev
```

## Deploy

Deployed on Vercel: [live demo](#) ← add link after deploy

## Project Structure

```
src/
  components/    # LandingPage, QuizScreen, Timer, ProgressBar, ResultsScreen
  data/          # questions for JS, TS and React topics
  hooks/         # useProgress (localStorage), useTimer
  types/         # shared TypeScript types
```
