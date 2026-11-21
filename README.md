# FocusBoard – Task Management Dashboard

A clean, responsive task management dashboard designed to help users organize their work, manage priorities, track deadlines, and stay focused.

## Overview

FocusBoard is a frontend task management application built with React. It provides a centralized workspace for managing tasks, monitoring progress, and organizing upcoming deadlines through a simple and intuitive interface.

## Features

- **Dashboard:** Overview of tasks, progress statistics, and Focus Notes.
- **Task management:** Create, view, edit, and delete tasks.
- **Task organization:** Set task categories, priorities, statuses, and due dates.
- **Search and filtering:** Search tasks and filter by status or priority.
- **Calendar:** View scheduled tasks grouped by due date.
- **Settings:** Manage profile information and notification preferences.
- **Dynamic profile menu:** Displays user initials and saved profile details.
- **Persistent storage:** Saves tasks and preferences in browser localStorage.
- **Responsive design:** Desktop, tablet, and mobile layouts.
- **Custom dialogs:** Dedicated task creation, editing, and deletion dialogs.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Development server and production build |
| JavaScript | Application logic |
| CSS3 | Styling and responsive layouts |
| Lucide React | Icons |
| Browser localStorage | Local data persistence |

## Application Pages

### Overview
Dashboard with Focus Notes, task statistics, and task management.

### My Tasks
Dedicated task workspace with search, filters, and task actions.

### Calendar
Tasks grouped chronologically by their due dates.

### Settings
Profile information and notification preferences.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/focusboard.git
```

Navigate into the project:

```bash
cd focusboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |

## Data Storage

FocusBoard currently uses browser localStorage for task and settings persistence.

- Tasks are stored under `focusboard_tasks`.
- Profile and notification preferences are stored under `focusboard_settings`.

Data is stored locally in the browser and is not synchronized across devices or users.

## Project Structure

```text
focusboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── tasks/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Quality Checks

The project has been checked using:

```bash
npm run lint
npm run build
```

Both checks completed successfully.

## Future Improvements

- Backend API integration
- User authentication
- Cloud database synchronization
- Real task reminders and notifications
- Drag-and-drop task organization
- Advanced calendar views

## License

This project is available for educational and portfolio purposes. Add a license file if you intend to distribute it under a specific open-source license.