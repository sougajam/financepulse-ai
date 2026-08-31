import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";

// Import your publishable key from the .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key in .env file");
}

// Render the application EXACTLY ONCE
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ErrorBoundary>
          <App />
          <Analytics />
        </ErrorBoundary>
      </ClerkProvider>
    </HelmetProvider>
  </StrictMode>,
);
