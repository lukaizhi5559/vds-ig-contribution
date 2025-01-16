# Verizon Contribution Model Frontend

This project is the **frontend** application for the **Verizon Contribution Model**. It is built with modern web technologies including **React**, **@tanstack/react-router**, **@tanstack/react-query**, and **React-JSS** for styles. The project also uses **MSW** (Mock Service Worker) for mocking API requests during development.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Context API](#context-api)
- [Styling](#styling)
- [Testing](#testing)
- [Mocking API](#mocking-api)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This application allows Verizon employees to manage submissions in a **Contribution Dashboard**. Users can log in, register, and view or manage their submissions. The frontend leverages React's ecosystem to provide a dynamic and responsive experience.

---

## Features

1. **User Authentication**:
   - Login and Registration support.
   - Maintains session data via Context API.

2. **Contribution Dashboard**:
   - View, create, edit, and manage submissions.
   - Dynamic search functionality.

3. **Mock API for Development**:
   - Uses MSW to simulate backend behavior.

4. **Modern State Management**:
   - React Query for API state handling.

5. **Component-Based Architecture**:
   - Modular design with reusable components.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/contribution-model.git
   cd contribution-model
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Development

To run the development server:

```bash
yarn dev
# or
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

### Production Build

To create a production-ready build:

```bash
yarn build
# or
npm run build
```

Serve the build folder using any static server.

---

## Project Structure

The application is organized as follows:

```
src/
├── Shell/                     # Core app shell and layout
├── api/                       # API integration (React Query)
│   ├── apiClient.ts           # Axios-based API client
│   ├── submissions.ts         # Submissions-related API calls
│   └── users.ts               # Users-related API calls
├── components/                # UI components and pages
│   ├── modals/                # Modals for submissions
│   ├── pages/                 # Core app pages
│   └── ui/                    # Reusable UI components
├── context/                   # Context API (e.g., UserContext)
├── lib/                       # Utility functions
├── mocks/                     # MSW mock API handlers
├── routes/                    # Route configuration
├── types/                     # Type definitions
└── main.tsx                   # App entry point
```

---

## API Integration

The application integrates with APIs using **React Query** and a shared `apiClient`:

- **Users API** (`users.ts`):
  - Fetch all users.
  - Fetch a user by ID.
  - Login and register users.
  - Delete users.

- **Submissions API** (`submissions.ts`):
  - Fetch all submissions.
  - Fetch a submission by ID.
  - Create, edit, and delete submissions.

---

## Context API

The application uses a **Context API** (`UserContext`) to manage user session data across the app. The following are available via the context:
- `isAuthenticated`: Checks if a user is logged in.
- `userDetails`: Stores information about the logged-in user.
- `logout`: Logs out the user and clears session data.

---

## Styling

The project uses **React-JSS** for modular and maintainable styles. Styles for each component or page are defined in `.styles.ts` files, co-located with their respective components.

Example (`Shell.styles.ts`):
```javascript
export const useShellStyles = createUseStyles({
  root: { /* Styles */ },
  header: { /* Styles */ },
});
```

---

## Testing

- **Unit Tests**: Written using `@testing-library/react`.
- **Snapshot Tests**: Managed in the `tests/__snapshots__` directory.
- **MSW for Mocking**: Used in tests to simulate backend APIs.

To run tests:
```bash
yarn test
# or
npm test
```

---

## Mocking API

The project uses **MSW** (Mock Service Worker) for mocking API requests during development and testing. Handlers are defined in `mocks/handlers.js`.

To start the mock server:
```javascript
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}
```

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push the branch and create a PR.

---

## License

This project is licensed under the [MIT License](LICENSE).

---
``` 

This `README.md` provides detailed instructions and insights into the project structure, setup, and functionality. You can further refine it based on your specific requirements.