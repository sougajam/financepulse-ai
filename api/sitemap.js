// api/sitemap.js
export default async function handler(req, res) {
  // Use your actual Render backend URL here
  const apiUrl =
    process.env.VITE_API_URL || "https://financepulse-ai.onrender.com";
  const frontendUrl = "https://financepulse-ai-pi.vercel.app";

  try {
    // 1. Fetch all articles from your database
    const articlesRes = await fetch(`${apiUrl}/api/articles`);
    const articles = await articlesRes.json();

    // 2. Start building the XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 3. Add your static pages (Homepage, etc.)
    xml += `
      <url>
        <loc>${frontendUrl}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    `;

    // 4. Loop through articles and add them to the map
    if (Array.isArray(articles)) {
      articles.forEach((article) => {
        // Format the date for Google (YYYY-MM-DD)
        const date = article.publishedDate
          ? new Date(article.publishedDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];

        xml += `
          <url>
            <loc>${frontendUrl}/articles/${article.slug}</loc>
            <lastmod>${date}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>
        `;
      });
    }

    xml += `</urlset>`;

    // 5. Send the XML response to Google
    res.setHeader("Content-Type", "text/xml");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    ); // Cache for fast loading
    res.status(200).send(xml);
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    res.status(500).send("Failed to generate sitemap");
  }
}
