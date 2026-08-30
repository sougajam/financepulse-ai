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
  const defaultImage = "https://yourwebsite.com/default-cover.jpg";
  // ADD THIS LINE RIGHT HERE:
  console.log("🟢 SEO WIDGET IS RUNNING FOR:", title);

  return (
    <Helmet>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl || defaultImage} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl || defaultImage} />
    </Helmet>
  );
}
