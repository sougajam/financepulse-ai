export default async function handler(req, res) {
  // 1. Get the article ID or slug from the URL
  const { slug } = req.query;
  const apiUrl = process.env.VITE_API_URL; // Your Render backend URL

  try {
    // 2. Fetch the specific article data from your backend
    // (Adjust the endpoint if your API path is slightly different)
    const articleRes = await fetch(`${apiUrl}/api/articles/${slug}`);
    const article = await articleRes.json();

    // 3. Fetch your site's generic React index.html
    const siteUrl = `https://${req.headers.host}`;
    const baseHtmlRes = await fetch(siteUrl);
    let finalHtml = await baseHtmlRes.text();

    // 4. Inject the specific article data into the HTML
    if (article) {
      // Replace Title
      finalHtml = finalHtml.replace(
        /<title>(.*?)<\/title>/,
        `<title>${article.title} | FinancePulse AI</title>`,
      );

      // Replace Open Graph Title
      finalHtml = finalHtml.replace(
        /<meta property="og:title" content="[^"]*"/g,
        `<meta property="og:title" content="${article.title}"`,
      );

      // Replace Open Graph Image (Assuming your DB saves the image as 'thumbnail' or 'imageUrl')
      const imageToUse =
        article.thumbnail ||
        article.imageUrl ||
        "https://financepulse-ai-pi.vercel.app/og-preview.jpg";
      finalHtml = finalHtml.replace(
        /<meta property="og:image" content="[^"]*"/g,
        `<meta property="og:image" content="${imageToUse}"`,
      );
      finalHtml = finalHtml.replace(
        /<meta name="twitter:image" content="[^"]*"/g,
        `<meta name="twitter:image" content="${imageToUse}"`,
      );
    }

    // 5. Send the modified HTML to Facebook's bot (and human browsers)
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(finalHtml);
  } catch (error) {
    console.error("SEO Injection Error:", error);
    // If it fails, just redirect them to the generic homepage so nothing breaks
    res.redirect("/");
  }
}
