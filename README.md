# Value Stream Mapping App

This is a web application built with React and Firebase that enables users to create, manage, and analyze value stream maps. The tool helps in identifying process steps, tracking time and costs, and assessing defect risks to improve operational efficiency.

### Features
* **Value Stream Management**: Create, view, and delete multiple value stream maps.
* **Process Steps**: Add, edit, and remove individual process steps with details such as employee function, time, and costs.
* **Risk Tracking**: Associate defect risks with each process step, including risk time, probability, and additional costs. The application automatically calculates the total risk cost.
* **Data-Driven Metrics**: The dashboard provides a real-time summary of key metrics like Total Process Time, Total Defect Cost, and Total Cycle Cost.
* **Financial Overview**: Input and track high-level financial data like Revenue, Inventory, and Operating Expenses to automatically calculate Throughput and EBITDA.
* **Responsive UI**: The interface is designed to be fully responsive and functional on both desktop and mobile devices.

### Getting Started

#### Prerequisites
-   Node.js and npm installed on your machine.
-   A Firebase project with Firestore enabled.

#### Installation
1.  Clone the repository:
    ```bash
    git clone [repository-url]
    cd value-stream-mapping-app
    ```
2.  Install the project dependencies:
    ```bash
    npm install
    ```

#### Configuration
1.  Create a Firebase project and enable Firestore.
2.  In the Firebase console, go to "Project settings" and find your "Firebase config" object.
3.  Create a file named `.env.local` in the root of your project.
4.  Add your Firebase configuration to the file, replacing the placeholder values with your own:
    ```
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```
5.  In the Firebase Console, go to the Firestore Database section and apply the following security rules to allow read/write access for authenticated users (this is a simplified rule for demonstration and local testing):
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /artifacts/{appId}/users/{userId}/{document=**} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```

#### Running the App
Start the development server:
```bash
npm start