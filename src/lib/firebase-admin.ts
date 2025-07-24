
import * as admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

interface AdminServices {
  app: App;
  auth: Auth;
  db: Firestore;
}

let services: AdminServices | null = null;

function initializeAdminServices(): AdminServices {
  if (services) {
    return services;
  }

  if (admin.apps.length > 0) {
    const app = admin.apps[0]!;
    services = {
        app,
        auth: getAuth(app),
        db: getFirestore(app),
    };
    return services;
  }
  
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (
    !serviceAccountString ||
    serviceAccountString === 'YOUR_SERVICE_ACCOUNT_JSON_STRING'
  ) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT environment variable is not set or is still a placeholder.'
    );
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountString);

    const app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
    });

    services = {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
    };
    
    return services;

  } catch (error: any) {
    console.error(
      'Failed to parse FIREBASE_SERVICE_ACCOUNT or initialize Firebase Admin SDK.',
      error
    );
    throw new Error(
      'Firebase Admin SDK initialization failed. Check your FIREBASE_SERVICE_ACCOUNT environment variable.',
      { cause: error }
    );
  }
}

const { app, auth, db } = initializeAdminServices();
export { app, auth, db };
