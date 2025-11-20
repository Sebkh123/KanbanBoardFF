# Kanban Board

A task management application built using Vue 3, Vuetify and the Composition API.  
The project includes TypeScript support, modular logic via composables, and unit testing with Vitest.  
The application allows users to manage tasks across multiple workflow stages in a clean Kanban interface.

## Features

- Kanban board with tasks organized into columns
- Create, edit and delete tasks
- Drag-and-drop functionality for moving tasks between status columns
- Vuetify-based UI components
- Composition API structure for logic separation
- TypeScript interfaces for tasks, priority and status
- Vitest unit tests for core functionality

## Architecture

### Composition API  
All task management logic is located inside a composable (`useKanbanBoard`), allowing components to focus purely on presentation and user interaction.

### TypeScript  
The system defines strong types for `Task`, `Priority` and `StatusId`, increasing clarity and minimizing runtime issues.

## Testing

Vitest is used to validate the Kanban logic.  
Tests are located in `src/__tests__/`.

Run tests using:

```
npm run test
```

## Project Setup

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Build for production:

```
npm run build
```

## Hosting

The project supports deployment on services such as Vercel, GitHub Pages or Netlify.
