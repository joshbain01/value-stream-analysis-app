# Value Stream Mapping App

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
-   **Data Persistence:** The application uses Firebase for backend services, enabling users to save and retrieve their value stream maps. This ensures data persistence across sessions.
-   **User Interface:** The UI is built with React components, styled using Tailwind CSS for a modern and responsive design.
-   **Routing:** (If applicable, not explicitly seen in file structure but common for SPAs) React Router or a similar library would handle navigation between different views of the application.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (LTS version recommended)
-   npm (comes with Node.js)
-   Git

### Project Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd value-stream-mapping-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Firebase Setup

This application uses Firebase for data storage. To run it locally, you need to set up your own Firebase project.

1.  **Create a Firebase Project:**
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click "Add project" and follow the steps to create a new project.

2.  **Register a Web App:**
    - In your Firebase project, click the web icon `</>` to add a web app.
    - Follow the instructions to register your app. You'll receive your Firebase configuration object.

3.  **Configure Environment Variables:**
    - Create a `.env` file in the root of your project (where `package.json` is located).
    - Add your Firebase configuration details to this file. Replace the placeholders with your actual Firebase project configuration:
    ```
    VITE_FIREBASE_API_KEY="YOUR_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="YOUR_APP_ID"
    VITE_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID" # Optional, if using Analytics
    ```
    *Note: Vite exposes environment variables starting with `VITE_` to your client-side code.* Ensure these are correctly configured in `src/services/firebase.js`.

4.  **Set up Firestore Database:**
    - In the Firebase Console, navigate to "Firestore Database".
    - Create a new database in production mode (or test mode for development, but remember to secure it later).
    - You will need to set up appropriate [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started) to control access to your data.

### Running the Application Locally

To run the application in development mode:

```bash
npm run dev
```

This will typically start a local development server and provide a URL (e.g., `http://localhost:5173`) where you can access the application in your browser.

### Running Tests

To run the unit tests:

```bash
npm test
```

### Linting

To run the linter and check for code style issues:

```bash
npm run lint
```

## Deployment

To create a production-ready build of the application:

```bash
npm run build
```

This command will compile and optimize your application code and assets into the `dist/` directory. You can then deploy the contents of this `dist/` directory to any static site hosting service (e.g., Firebase Hosting, Netlify, Vercel, GitHub Pages).

### Example: Deploying to Firebase Hosting

1.  **Install Firebase CLI:**
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase:**
    ```bash
    firebase login
    ```

3.  **Initialize Firebase in your project:**
    ```bash
    firebase init hosting
    ```
    Follow the prompts. When asked for your public directory, enter `dist`.

4.  **Deploy:**
    ```bash
    firebase deploy --only hosting
    ```

