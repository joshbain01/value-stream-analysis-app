# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## User Workflow

The application is designed to help users create and analyze value stream maps. The typical workflow involves:

1.  **Defining Process Steps:** Users can add individual steps that constitute their process. Each step can have associated metrics.
2.  **Identifying Risks:** For each process step, users can identify potential risks, categorize them, and assign a severity level.
3.  **Visualizing the Map:** The application will visually represent the process steps and their connections, along with associated metrics and risks.
4.  **Analyzing the Value Stream:** Users can analyze the map to identify bottlenecks, areas of waste, and opportunities for improvement.

## High-Level Theory of Operations

The application is a single-page application (SPA) built with React and Vite. It leverages a component-based architecture to manage different parts of the value stream mapping process.

-   **State Management:** The application uses a centralized state management system (likely Zustand, given `useProcessMapStore.js`) to maintain the process map data, including steps, metrics, and risks. This ensures data consistency across different components.
-   **Component Interaction:** React components (e.g., `ProcessStep`, `Metrics`, `Risk`) interact with the global state to display and modify data.
-   **Data Persistence:** (Assumed, based on `firebase.js`) The application likely uses Firebase for backend services, enabling users to save and retrieve their value stream maps. This ensures data persistence across sessions.
-   **User Interface:** The UI is built with React components, styled using Tailwind CSS for a modern and responsive design.
-   **Routing:** (If applicable, not explicitly seen in file structure but common for SPAs) React Router or a similar library would handle navigation between different views of the application.