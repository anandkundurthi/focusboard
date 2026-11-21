# AI Usage Disclosure

## 1. AI Tools Used

- **ChatGPT (OpenAI)** – Used as an AI-assisted development and problem-solving tool.

## 2. Areas Where AI Was Used

AI assistance was used during the development of FocusBoard for:

- Generating and improving React components.
- Implementing task creation, editing, deletion, and status updates.
- Implementing shared state management using React Context API and custom hooks.
- Adding localStorage persistence.
- Implementing search, filtering, and dashboard statistics.
- Developing responsive layouts and styling.
- Debugging React errors and improving code organization.
- Reviewing code quality and accessibility considerations.

## 3. Representative Prompts

Examples of prompts used during development:

1. "Act as a senior React developer and help me build a responsive task management dashboard using React and Vite."
2. "Implement task creation, editing, deletion, and status updates using reusable React components."
3. "Help me implement shared task state using React Context API and a custom hook."
4. "Add search and filtering functionality for tasks based on status and priority."

## 4. Human Review and Validation

AI-generated suggestions and code were reviewed and tested during development.

The following functionality was manually verified:

- Creating, editing, and deleting tasks.
- Updating task statuses.
- Searching and filtering tasks.
- Dashboard statistics.
- localStorage data persistence.
- Responsive layouts across different screen sizes.
- Application behavior and production build.
- ESLint checks and build validation.

## 5. Example of AI Suggestion Reviewed and Corrected

During development, an initial implementation placed the React Context definition, provider, and custom hook in the same file. This caused Fast Refresh ESLint errors.

The implementation was refactored by separating the Context definition, provider, and custom hook into dedicated files. Imports were updated accordingly.

After the correction, ESLint checks and the production build completed successfully.

## 6. Limitations

- Application data is stored locally using browser localStorage.
- There is no backend database or cloud synchronization.
- There is no user authentication or multi-user support.

## 7. Declaration

ChatGPT was used as a development assistant for code generation, implementation guidance, debugging, refactoring, and problem-solving.

All generated code was reviewed, modified where necessary, and tested as part of the development process. I understand the implemented application and can explain its components, state management, and functionality.