// utils/facebookPoster.js

async function autoPostToFacebook(article) {
  const pageId = process.env.FB_PAGE_ID;
  const accessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const frontendUrl =
    process.env.FRONTEND_URL || "https://financepulse-ai-pi.vercel.app";

  if (!pageId || !accessToken) {
    console.warn("⚠️ Facebook credentials missing. Skipping auto-post.");
    return;
  }

  // The exact link Facebook will scrape
  const articleLink = `${frontendUrl}/articles/${article.slug}`;

  // The caption above the link preview
  const message = `📈 New on FinancePulse AI: ${article.title}\n\n${article.excerpt}\n\nRead more here: ${articleLink}`;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/feed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          link: articleLink,
          access_token: accessToken,
        }),
      },
    );

    const data = await response.json();

    if (data.error) throw new Error(data.error.message);
    console.log("✅ Successfully posted to Facebook! Post ID:", data.id);
  } catch (error) {
    console.error("❌ Facebook API Error:", error.message);
  }
}

module.exports = { autoPostToFacebook };
