# Product Backlog

This document outlines the remaining tasks and considerations before the Value Stream Mapping App can be deployed.

## 1. Feature Completeness
- [x] **Implement all core features defined for the MVP (e.g., full CRUD for process steps, risks, and metrics).**
  - **Description:** Ensure that all planned functionalities for managing value stream maps, including creating, reading, updating, and deleting maps, process steps, risks, and associated metrics, are fully implemented and functional. This includes all necessary UI components and backend logic.
  - **Dependencies:** Clear definition of MVP features.
  - **Constraints:** Time and resource availability.
  - [x] **Implement Value Stream Map Dashboard:** Display a list of all existing value stream maps with title, creation date, and options to open or delete.
  - [x] **Implement New Value Stream Map Creation:** Allow users to create a new map by providing a title, including a confirmation dialog for deletion.
  - [x] **Implement Process Step CRUD:**
    - [x] Add, edit, and delete process steps within a value stream map.
    - [x] Ensure each process step component has editable fields for: Step Name, Employee Function, Time (minutes), Cycle Cost, Inventory Costs.
    - [x] Implement calculation for `Total Cycle Cost` (`Cycle Cost + Defect Costs + Inventory Costs`).
  - [x] **Implement Risk Analysis CRUD:**
    - [x] Associate defect risks with each process step.
    - [x] Implement a dialog for adding new risks with fields: Description, Risk Time, Risk Probability, Additional Risk Cost.
    - [x] Implement calculation for `Defect Cost` (`(Risk Time / 60) * Labor Rate + Additional Risk Cost`).
    - [x] Implement calculation for `Total Defect Costs` (sum of all associated risk costs for a step).
    - [x] Allow users to delete individual risks.
  - [x] **Implement Financial and Process Metrics Section:**
    - [x] Create a dedicated metrics section at the top of the VSM Editor.
    - [x] Implement input fields for: Revenue, Inventory (of finished goods), Operating Expenses, Time in Motion (minutes).
    - [x] Implement real-time calculation and display of: `Total Process Time`, `Total Defect Cost`, `Total Cycle Cost`, `Throughput`, `EBITDA`.

- [ ] **Ensure all user interactions are intuitive and complete.**
  - **Description:** Verify that the user interface provides clear feedback for all actions, handles edge cases gracefully (e.g., empty states, invalid inputs), and guides the user through workflows effectively.
  - **Dependencies:** Completion of core feature implementation.
  - **Constraints:** Requires user testing and feedback.

## 2. Testing & Quality Assurance
- [ ] **Write comprehensive integration tests for Firebase interactions (e.g., creating, updating, deleting maps, steps, risks).**
  - **Description:** Develop automated tests that verify the correct interaction between the application's frontend and Firebase Firestore. This includes testing data persistence, updates, and deletions across all relevant data models.
  - **Dependencies:** Stable Firebase setup and data models.
  - **Constraints:** Requires knowledge of testing frameworks (e.g., Vitest, React Testing Library) and Firebase testing utilities.

- [ ] **Implement end-to-end (E2E) tests to cover critical user flows (e.g., creating a map, adding steps, viewing metrics).**
  - **Description:** Create automated tests that simulate real user scenarios from start to finish, interacting with the deployed application (or a local build) through the browser. This ensures the entire system works as expected.
  - **Dependencies:** Stable application build; selection of an E2E testing framework (e.g., Cypress, Playwright).
  - **Constraints:** Can be time-consuming to set up and maintain.

- [ ] **Conduct thorough manual testing across different browsers and devices.**
  - **Description:** Perform hands-on testing of the application on various web browsers (Chrome, Firefox, Safari, Edge) and device types (desktop, tablet, mobile) to identify layout issues, responsiveness problems, and functional bugs that automated tests might miss.
  - **Dependencies:** Stable application build.
  - **Constraints:** Requires dedicated time and access to various testing environments.

## 3. Security
- [ ] **Review and harden Firebase Firestore security rules to ensure data integrity and prevent unauthorized access.**
  - **Description:** Analyze and refine the Firebase Firestore security rules to precisely control read and write access to data based on user authentication status, roles, and data ownership. This is critical to prevent data breaches and unauthorized modifications.
  - **Dependencies:** Understanding of Firebase security rules syntax and application's data structure.
  - **Constraints:** Requires careful planning to avoid locking out legitimate users.

- [ ] **Implement user authentication and authorization (if not already present and part of the MVP).**
  - **Description:** Integrate a user authentication system (e.g., Firebase Authentication) to allow users to sign up, log in, and manage their accounts. Implement authorization logic to restrict access to certain features or data based on user roles or permissions.
  - **Dependencies:** Firebase project setup; clear definition of user roles/permissions.
  - **Constraints:** Adds complexity to the application; requires careful handling of user data.

- [ ] **Securely manage API keys and other sensitive credentials using environment variables.**
  - **Description:** Ensure that all sensitive information, such as Firebase API keys or other third-party service credentials, are not hardcoded directly into the codebase. Instead, load them securely using environment variables that are injected at build or runtime.
  - **Dependencies:** Understanding of environment variable management in the chosen deployment environment.
  - **Constraints:** Requires configuration on the deployment platform.

## 4. Performance & Optimization
- [ ] **Optimize all static assets (images, SVGs) for web delivery.**
  - **Description:** Compress and resize images (PNG, JPG) to reduce file size without significant loss of quality. Optimize SVGs for smaller file sizes. This improves page load times.
  - **Dependencies:** Image optimization tools (e.g., ImageOptim, SVGO).
  - **Constraints:** Manual effort for existing assets; can be automated for future assets.

- [ ] **Implement code splitting or lazy loading for larger components/routes to improve initial load times.**
  - **Description:** Configure the build process (Vite) to split the JavaScript bundle into smaller chunks. Load these chunks only when they are needed (e.g., when a user navigates to a specific route or interacts with a component).
  - **Dependencies:** Understanding of React.lazy and Suspense, or dynamic imports in Vite.
  - **Constraints:** Can add complexity to routing and component loading.

- [ ] **Review and optimize Firebase queries and data structures for efficiency.**
  - **Description:** Analyze Firebase Firestore queries to ensure they are efficient and use indexes effectively. Refactor data structures if necessary to minimize reads and writes, especially for frequently accessed or large datasets.
  - **Dependencies:** Understanding of Firebase Firestore indexing and query best practices.
  - **Constraints:** May require changes to existing data models and associated code.

## 5. Deployment & Infrastructure
- [x] **Define and configure the production deployment environment (e.g., Firebase Hosting, Netlify, Vercel).**
  - **Description:** Chosen Firebase Hosting and configured the necessary settings for deploying the application. This includes setting up domains, SSL certificates, and environment variables.
  - **Dependencies:** Selection of a hosting provider; access to DNS management.
  - **Constraints:** Requires account setup and configuration with the chosen provider.

- [ ] **Set up a continuous integration/continuous deployment (CI/CD) pipeline.**
  - **Description:** Automate the process of building, testing, and deploying the application whenever changes are pushed to the main branch of the repository. This ensures consistent deployments and early detection of issues.
  - **Dependencies:** Git repository (already present); CI/CD service (e.g., GitHub Actions, GitLab CI, CircleCI).
  - **Constraints:** Initial setup can be complex; requires maintenance.

- [ ] **Configure custom domain (if applicable).**
  - **Description:** If a custom domain is desired, configure DNS records to point to the deployed application and ensure SSL is properly set up for the custom domain.
  - **Dependencies:** Purchased custom domain; configured hosting environment.
  - **Constraints:** Requires access to domain registrar and hosting provider settings.

## 6. Monitoring & Analytics
- [x] **Implement a Cloud Function to monitor Firestore usage.**
  - **Description:** Deployed a Firebase Cloud Function that triggers on writes (create, update, delete) to the `valueStreamMaps` collection and logs the activity. This log can be used to set up alerts in Google Cloud Logging.
  - **Dependencies:** Firebase project setup; Firebase CLI installed.
  - **Constraints:** Requires manual setup of log-based alerts in Google Cloud Console. Does not prevent usage, only alerts on it.

- [ ] **Set up analytics to monitor user engagement and application usage (e.g., Google Analytics, Firebase Analytics).**
  - **Description:** Integrate an analytics platform to collect data on how users interact with the application, including page views, event tracking, and user demographics. This helps in understanding user behavior and making informed product decisions.
  - **Dependencies:** Selection of an analytics service; integration with the application's codebase.
  - **Constraints:** Requires account setup with the chosen service; adherence to privacy regulations.

## 7. Documentation
- [x] **Update `README.md` with deployment instructions and any necessary setup steps for new contributors.**
  - **Description:** Provide clear, step-by-step instructions on how to set up the development environment, run the application locally, and deploy it to production. Include prerequisites and common troubleshooting tips.
  - **Dependencies:** Finalized deployment strategy; clear development setup process.
  - **Constraints:** Requires accurate and up-to-date information.

- [x] **Document API endpoints and data models (if applicable).**
  - **Description:** Create documentation for any external or internal APIs used by the application, detailing endpoints, request/response formats, authentication requirements, and error codes. Document the structure and relationships of Firebase Firestore data models.
  - **Dependencies:** Stable API and data model definitions.
  - **Constraints:** Can be time-consuming to create and maintain.

## 8. User Experience (UX) & UI Polish
- [x] **Create reusable UI components (e.g., Button, InputField, Card).**
  - **Description:** Started creating a library of reusable React components with consistent styling using Tailwind CSS. The `Button`, `InputField`, and `Card` components have been created and integrated. `Metrics.jsx`, `ProcessStep.jsx`, `Risk.jsx`, `RiskList.jsx`, `ValueStreamMapList.jsx`, and `App.jsx` have been refactored to use these new components.
  - **Dependencies:** Defined design system (colors, typography, spacing).
  - **Constraints:** Iterative process; requires careful design and implementation.

- [ ] **Conduct a final UI/UX review to ensure consistency, responsiveness, and visual appeal.**
  - **Description:** Perform a comprehensive review of the entire user interface to identify any inconsistencies in design, ensure responsiveness across various screen sizes, and refine visual elements for a polished look and feel.
  - **Dependencies:** All UI components implemented.
  - **Constraints:** Subjective; requires design expertise or user feedback.

- [x] **Address any minor UI glitches or inconsistencies.**
  - **Description:** Fixed small visual bugs, alignment issues, font discrepancies, or interaction quirks that detract from the overall user experience. Specifically, removed unused and potentially conflicting CSS from `src/App.css`.
  - **Dependencies:** UI/UX review completed.
  - **Constraints:** Requires attention to detail and potentially iterative adjustments.
