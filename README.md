
# ArtisanConnect - A Full-Stack E-Commerce Platform

This document provides a comprehensive overview of the **ArtisanConnect** web application, built with Next.js, Firebase, and Tailwind CSS. It is designed for developers to understand the architecture, run the project locally, manage its data, and deploy it to production.

---

## ✅ 1. Project Overview

**ArtisanConnect** is a modern, full-stack e-commerce platform designed to connect Moroccan artisans with a global audience. It provides a marketplace for authentic, handmade goods, empowering local cooperatives and preserving cultural heritage.

### Key Features:
-   **Full E-commerce Flow:** Browse products, filter by category, add to cart, and view product details.
-   **Artisan & Cooperative Showcases:** Dedicated pages to tell the stories of the people behind the products.
-   **User Authentication:** Secure user registration and login system with email verification.
-   **Customer Reviews:** Authenticated users can leave star ratings and written reviews on products.
-   **Comprehensive Admin Panel:** A secure area for administrators to perform CRUD (Create, Read, Update, Delete) operations on products, cooperatives, users, and blog content.
-   **Blog/CMS:** An integrated Content Management System for creating and managing blog posts.

### Tech Stack:
-   **Framework:** Next.js (App Router)
-   **Backend:** Firebase (Firestore Database, Authentication) & Next.js Server Actions
-   **Styling:** Tailwind CSS with shadcn/ui components
-   **Forms:** React Hook Form with Zod for validation
-   **Deployment:** Firebase App Hosting

---

## ✅ 2. Getting Started & Local Setup

Follow these steps to get the project running on your local machine.

### Prerequisites:
-   Node.js (v18 or later)
-   npm or yarn
-   A Firebase project

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd artisan-connect
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Your Firebase Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  In your new project, go to **Project Settings** > **General**. Under "Your apps", create a new **Web App**.
3.  Firebase will provide you with a `firebaseConfig` object. You will need these keys for the next step.
4.  Enable **Firestore Database** and **Authentication** (with the Email/Password provider) in the Firebase console.

### Step 4: Configure Environment Variables
Create a `.env` file in the root of the project and populate it with your Firebase project's keys.

**Create a `.env` file with the following content:**
```env
# Firebase Client-Side SDK Configuration (from your web app settings)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy...YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="1:your-sender-id:web:your-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX" # Optional

# Firebase Admin SDK Configuration (for server-side code)
# 1. In Firebase Console, go to Project Settings > Service Accounts.
# 2. Click "Generate new private key". A JSON file will be downloaded.
# 3. Open the JSON file, copy its entire content, and paste it here as a single-line string.
# Example: FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}'
FIREBASE_SERVICE_ACCOUNT='YOUR_SERVICE_ACCOUNT_JSON_STRING'

# SendGrid API for Contact Form (Optional)
# If you want the contact form to work, create a SendGrid account and add an API key.
SENDGRID_API_KEY='YOUR_SENDGRID_API_KEY'
SENDGRID_TO_EMAIL='your_inbox@example.com'
SENDGRID_FROM_EMAIL='noreply@yourdomain.com'
```

### Step 5: Seed the Database with Sample Data
This command will clear and populate your Firestore database with the sample data from `src/lib/MOCK_DATA.ts`.
```bash
npm run db:seed
```

### Step 6: Run the Development Server
```bash
npm run dev
```
The application should now be running at `http://localhost:3000`.

---

## ✅ 3. Project Structure & Architecture

The application uses the Next.js App Router, promoting a clear separation of concerns.

-   `src/app/`: Contains all pages and layouts. The folder structure maps directly to URL routes.
    -   `src/app/admin/`: All pages and components related to the admin panel. Access is protected by an `AdminAuthGuard`.
    -   `src/app/(public-routes)/`: The main pages of the site like `/`, `/products`, `/about`, etc.
-   `src/components/`: Reusable React components used throughout the application.
    -   `src/components/ui/`: Core, unstyled UI components from `shadcn/ui`.
-   `src/actions/`: **Server Actions**. This is the application's backend. These files contain functions marked with `'use server';` that run exclusively on the server, handling all database mutations (create, update, delete) and secure logic.
-   `src/services/`: Server-side data fetching functions. These are used by Server Components to read data from Firestore.
-   `src/contexts/`: React Context providers for global state management (`AuthContext`, `CartContext`).
-   `src/hooks/`: Custom React hooks (`useAuth`, `useCart`).
-   `src/lib/`: Core libraries, definitions, and utilities.
    -   `definitions.ts`: Central TypeScript type definitions for all data models.
    -   `firebase.ts`: Client-side Firebase SDK initialization.
    -   `firebase-admin.ts`: Server-side Firebase Admin SDK initialization.
-   `src/scripts/`: Node.js scripts for development tasks, like the database seeder.

---

## ✅ 4. Firebase Integration

### Firestore Database
Firestore is the primary database. The data is structured into several top-level collections:
-   **`products`**: Stores all product information. Has a subcollection `reviews`.
-   **`cooperatives`**: Stores details about each artisan cooperative.
-   **`users`**: Stores public profile information for authenticated users. The document ID matches the Firebase Auth UID.
-   **`blogPosts`**: Stores content for the blog. The document ID is the URL-friendly slug.

### Firebase Authentication
-   **Provider:** Email/Password is the primary authentication method.
-   **Admin Role:** The **first user to register** is automatically granted an `isAdmin` custom claim, giving them access to the `/admin` panel. Subsequent admin rights must be granted by an existing admin from the `/admin/users` page.
-   **Email Verification:** New users are required to verify their email address before they can access protected pages like their profile.

### Image Handling
-   **User Avatars:** User profile pictures are stored as Base64 data URIs directly in the `avatarUrl` field of the user's document in Firestore. This avoids the need for Firebase Storage for small images.
-   **Product/Cooperative/Blog Images:** These images are expected to be hosted on an external service (e.g., Imgur, Cloudinary). The application stores and displays images from public URLs. To use your own images, upload them to a hosting provider and paste the direct link into the `URL de l'image` field in the admin panel.

---

## ✅ 5. Security

### Recommended Firestore Rules (`firestore.rules`)
For a production environment, you must secure your database. Here are recommended rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Cooperatives, Products, and Blog Posts are publicly readable
    match /cooperatives/{coopId} {
      allow read: if true;
      allow write: if request.auth.token.isAdmin == true;
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth.token.isAdmin == true;
    }
    match /blogPosts/{slug} {
      allow read: if true;
      allow write: if request.auth.token.isAdmin == true;
    }

    // Users can read their own profile, anyone can see public data
    match /users/{userId} {
      allow read: if true;
      // Only the user or an admin can update their profile
      allow update: if request.auth.uid == userId || request.auth.token.isAdmin == true;
      allow create: if request.auth.uid == userId;
      allow delete: if request.auth.token.isAdmin == true;
    }

    // Anyone can read reviews
    match /products/{productId}/reviews/{reviewId} {
      allow read: if true;
      // Only authenticated and verified users can create their own reviews
      allow create: if request.auth != null && request.auth.token.email_verified == true && request.resource.data.authorId == request.auth.uid;
      // Admins can delete any review
      allow delete: if request.auth.token.isAdmin == true;
    }
  }
}
```

---

## ✅ 6. Deployment

This app is optimized for deployment with **Firebase App Hosting**.

1.  **Install Firebase CLI:**
    ```bash
    npm install -g firebase-tools
    ```
2.  **Log in to Firebase:**
    ```bash
    firebase login
    ```
3.  **Initialize App Hosting:**
    ```bash
    firebase init apphosting
    ```
    Follow the prompts to connect to your Firebase project.

4.  **Deploy:**
    ```bash
    firebase deploy --only hosting
    ```
Firebase will build your Next.js application and deploy it to a scalable, serverless environment.
