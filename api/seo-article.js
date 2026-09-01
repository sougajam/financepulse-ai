export default async function handler(req, res) {
  const { slug } = req.query;
  const apiUrl = process.env.VITE_API_URL;

  try {
    // 1. Fetch the specific article
    const articleRes = await fetch(`${apiUrl}/api/articles/${slug}`);
    if (!articleRes.ok) throw new Error("Failed to fetch article");
    const article = await articleRes.json();

    // 2. Fetch your site's generic React index.html
    const siteUrl = `https://${req.headers.host}`;
    const baseHtmlRes = await fetch(siteUrl);
    let finalHtml = await baseHtmlRes.text();

    // 3. FOOLPROOF INJECTION: Insert tags right before closing </head>
    if (article && article.title) {
      const imageToUse =
        article.imageUrl ||
        "https://financepulse-ai-pi.vercel.app/og-preview.jpg";

      // Remove old title to prevent duplicates
      finalHtml = finalHtml.replace(/<title>.*?<\/title>/i, "");

      // Build the exact tags Facebook wants
      const seoTags = `
        <title>${article.title} | FinancePulse AI</title>
        <meta property="og:title" content="${article.title}" />
        <meta property="og:description" content="${article.excerpt || ""}" />
        <meta property="og:image" content="${imageToUse}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${article.title}" />
        <meta name="twitter:image" content="${imageToUse}" />
      `;

      // Inject tags right before </head>
      finalHtml = finalHtml.replace("</head>", seoTags + "</head>");
    }

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(finalHtml);
  } catch (error) {
    console.error("SEO Injection Error:", error);
    res.redirect("/");
  }
}
