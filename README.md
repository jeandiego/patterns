# React Patterns & Utilities

A collection of reusable React patterns, custom hooks, adapters, and utility functions for modern web applications.

## 📋 Overview

This repository contains a curated set of battle-tested patterns and utilities that solve common development challenges in React applications. Each pattern is designed to be:

- **Reusable**: Drop-in solutions for common scenarios
- **Type-safe**: Written in TypeScript with proper type definitions
- **Well-tested**: Each pattern includes comprehensive tests
- **Production-ready**: Used in real-world applications

## 🚀 Patterns & Components

### Custom Hooks

- **`use-debounce`** - Debounce values and callbacks to optimize performance
- **`use-guarded-handlers`** - Compose multiple guards around event handlers
- **`use-local-storage-synced`** - Sync state with localStorage automatically
- **`use-search-params-with-timestamp`** - Enhanced URL search params management

### UI Components & Patterns

- **`create-dialog`** - Programmatically create and manage React dialogs
- **`destructive-action-guard`** - Protect users from destructive actions with confirmation dialogs
- **`render.if`** - Conditional rendering component with type safety

### Adapters

- **`http-client`** - Type-safe HTTP client interface
- **`axios-adapter`** - Axios implementation of the HTTP client
- **`storage`** - Abstract storage interface
- **`local-storage`** - localStorage implementation of the storage interface

### Utilities

- **`object.utils`** - Object manipulation utilities
- **`string.utils`** - String processing and formatting utilities

## 🏗️ Architecture

This repository follows several key architectural patterns:

- **Adapter Pattern**: Abstract interfaces with concrete implementations (HTTP clients, storage)
- **Guard Pattern**: Composable middleware for event handlers
- **Hook Pattern**: Custom React hooks for stateful logic
- **Render Props Pattern**: Flexible conditional rendering
- **Factory Pattern**: Programmatic component creation

## 🧪 Testing

Each pattern includes comprehensive tests using modern testing practices:

- Unit tests for all utilities and hooks
- Component testing for React components
- Integration tests for complex patterns

## 📁 Structure

```
patterns/
├── adapters/           # Interface adapters (HTTP, storage)
├── create-dialog/      # Programmatic dialog management
├── destructive-action-guard/  # User protection patterns
├── render.if/          # Conditional rendering utilities
├── use-debounce/       # Performance optimization hooks
├── use-guarded-handlers/  # Event handler middleware
├── use-local-storage-synced/  # State persistence hooks
├── use-search-params-with-timestamp/  # URL state management
└── utils/              # Pure utility functions
```

## 🤝 Contributing

These patterns are extracted from real-world projects and continuously refined. Feel free to use them in your projects and contribute improvements back to the collection.

## 📄 License

Each pattern is self-contained and can be used independently in your projects.
