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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* HelmetProvider manages your SEO tags */}
    <HelmetProvider>
      {/* ClerkProvider manages your authentication */}
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </HelmetProvider>
  </StrictMode>,
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
<ErrorBoundary>
  <App />
  <Analytics />
</ErrorBoundary>;
