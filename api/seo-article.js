export default async function handler(req, res) {
  const { slug } = req.query;

  // NOTE: If process.env.VITE_API_URL is failing in Vercel,
  // replace it with your actual Render URL (e.g. "https://financepulse-backend.onrender.com")
  const apiUrl =
    process.env.VITE_API_URL || "https://YOUR-RENDER-BACKEND.onrender.com";

  try {
    // 1. Fetch the specific article
    const articleRes = await fetch(`${apiUrl}/api/articles/${slug}`);
    if (!articleRes.ok) throw new Error("Failed to fetch article");
    const article = await articleRes.json();

    // 2. Fetch your site's generic React index.html
    const siteUrl = `https://${req.headers.host}`;
    const baseHtmlRes = await fetch(siteUrl);
    let finalHtml = await baseHtmlRes.text();

    // 3. FOOLPROOF INJECTION: Strip old tags and insert new ones
    if (article && article.title) {
      const imageToUse =
        article.imageUrl ||
        "https://financepulse-ai-pi.vercel.app/og-preview.jpg";

      // A. Delete the old title to prevent duplicates
      finalHtml = finalHtml.replace(/<title>.*?<\/title>/gi, "");

      // B. Delete ALL existing generic Open Graph and Twitter tags from index.html
      finalHtml = finalHtml.replace(/<meta[^>]*property="og:[^>]*>/gi, "");
      finalHtml = finalHtml.replace(/<meta[^>]*name="twitter:[^>]*>/gi, "");

      // C. Build the exact, specific tags Facebook wants
      const seoTags = `
        <title>${article.title} | FinancePulse AI</title>
        <meta property="og:title" content="${article.title}" />
        <meta property="og:description" content="${article.excerpt || ""}" />
        <meta property="og:image" content="${imageToUse}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${article.title}" />
        <meta name="twitter:image" content="${imageToUse}" />
      `;

      // D. Inject the new tags right before </head>
      finalHtml = finalHtml.replace("</head>", seoTags + "</head>");
    }

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(finalHtml);
  } catch (error) {
    console.error("SEO Injection Error:", error);
    // Print the error to the screen instead of redirecting so we can debug if it crashes
    res
      .status(500)
      .send(`SEO Function Crashed: ${error.message}. Check your API URL!`);
  }
}
