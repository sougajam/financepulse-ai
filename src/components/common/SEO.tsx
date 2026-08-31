import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  imageUrl?: string;
  url?: string;
}

export function SEO({
  title,
  description,
  type = "website",
  imageUrl,
  url,
}: SEOProps) {
  const siteName = "FinancePulse AI";

  // 1. Ensure the image URL is always absolute for Facebook's scraper
  const getAbsoluteImageUrl = () => {
    const path = imageUrl || "/og-preview.jpg"; // Your default fallback image
    if (path.startsWith("http")) return path;

    // Safely grab the current domain in a browser environment
    if (typeof window !== "undefined") {
      return `${window.location.origin}${path}`;
    }

    return path;
  };

  const finalImageUrl = getAbsoluteImageUrl();

  // 2. Automatically grab the current page URL if one isn't explicitly passed
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <Helmet>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImageUrl} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImageUrl} />
    </Helmet>
  );
}
