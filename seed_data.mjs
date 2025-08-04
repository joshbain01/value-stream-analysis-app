import { collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedData = async () => {
  const mapsCollection = collection(db, 'valueStreamMaps');
  const sampleMap = {
    title: 'Sample Manufacturing Process',
    createdAt: new Date().toISOString(),
    timeInMotion: 15,
    laborRate: 30,
    processAccounting: {
      revenue: 50000,
      inventory: 10000,
      operatingExpenses: 20000
    },
    steps: [
      {
        id: '1',
        name: 'Order Processing',
        time: 20,
        employeeFunction: 'Admin',
        cycleCost: 15,
        inventoryCosts: 5,
        risks: [
          {
            id: 'r1',
            description: 'Incorrect order details',
            timeImpact: 10,
            probability: 5,
            additionalCost: 50
          }
        ]
      },
      {
        id: '2',
        name: 'Assembly',
        time: 120,
        employeeFunction: 'Technician',
        cycleCost: 50,
        inventoryCosts: 20,
        risks: []
      },
      {
        id: '3',
        name: 'Quality Assurance',
        time: 30,
        employeeFunction: 'QA Inspector',
        cycleCost: 25,
        inventoryCosts: 10,
        risks: [
          {
            id: 'r2',
            description: 'Defective part found',
            timeImpact: 60,
            probability: 2,
            additionalCost: 200
          }
        ]
      }
    ]
  };

  await addDoc(mapsCollection, sampleMap);
  console.log('Sample data has been seeded.');
};

seedData();
