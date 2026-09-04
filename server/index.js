const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const { autoPostToFacebook } = require("./utils/facebookPoster");
const app = express();
const PORT = process.env.PORT || 5000;

// Set up the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL Database!"))
  .catch((err) => console.error("❌ Database connection error:", err.stack));

app.use(cors());
app.use(express.json());

// Basic health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "FinancePulse API is running normally!",
  });
});

// Setup Route: This creates the table, adds the image column, and adds one article
app.get("/api/setup", async (req, res) => {
  try {
    // 1. Create the base table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(100),
        excerpt TEXT,
        content TEXT,
        author VARCHAR(100),
        published_date DATE,
        reading_time VARCHAR(50)
      );
    `);

    // 2. Add the image_url column if it doesn't already exist
    await pool.query(
      `ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_url TEXT;`,
    );

    // 3. Check if it's empty, and insert a test article if it is
    const result = await pool.query("SELECT COUNT(*) FROM articles");
    if (parseInt(result.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO articles (title, slug, category, excerpt, content, author, published_date, reading_time)
        VALUES (
          'The Power of Compound Interest', 
          'power-of-compound-interest', 
          'Personal Finance', 
          'Learn why compounding is the 8th wonder of the world.', 
          '# The Power of Compounding\n\nCompound interest is interest calculated on the initial principal...', 
          'FinancePulse Team', 
          '2026-08-18', 
          '5 min read'
        )
      `);
      return res.json({ message: "Table created and test article inserted!" });
    }

    res.json({
      message: "Table already exists and has data. Image column is ready.",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Database setup failed", details: err.message });
  }
});

// 1. Fetch ALL articles (for the main Articles page)
app.get("/api/articles", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, title, slug, category, excerpt, content, author, 
        image_url AS "imageUrl",
        published_date AS "publishedDate", 
        reading_time AS "readingTime" 
      FROM articles 
      ORDER BY published_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// 2. Fetch a SINGLE article by its slug (for the Article Detail page)
app.get("/api/articles/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      `
      SELECT 
        id, title, slug, category, excerpt, content, author, 
        image_url AS "imageUrl",
        published_date AS "publishedDate", 
        reading_time AS "readingTime" 
      FROM articles 
      WHERE slug = $1
    `,
      [slug],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch the article" });
  }
});

/// Create a NEW article
app.post("/api/articles", async (req, res) => {
  try {
    const { title, category, excerpt, content, author, readingTime, imageUrl } =
      req.body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const publishedDate = new Date().toISOString().split("T")[0];

    const result = await pool.query(
      `
      INSERT INTO articles (title, slug, category, excerpt, content, author, published_date, reading_time, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `,
      [
        title,
        slug,
        category,
        excerpt,
        content,
        author,
        publishedDate,
        readingTime,
        imageUrl,
      ],
    );

    // ==========================================
    // 🚀 NEW: Trigger Facebook Auto-Post
    // ==========================================
    // This runs silently in the background using the newly saved article data
    autoPostToFacebook(result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).json({ error: "Failed to create the article" });
  }
});
// DELETE an article by ID
app.delete("/api/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM articles WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({
      message: "Article deleted successfully",
      deletedArticle: result.rows[0],
    });
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).json({ error: "Failed to delete the article" });
  }
});

// UPDATE an article by ID
app.put("/api/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, excerpt, content, author, readingTime, imageUrl } =
      req.body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const result = await pool.query(
      `
      UPDATE articles 
      SET title = $1, slug = $2, category = $3, excerpt = $4, content = $5, author = $6, reading_time = $7, image_url = $8
      WHERE id = $9
      RETURNING *;
      `,
      [
        title,
        slug,
        category,
        excerpt,
        content,
        author,
        readingTime,
        imageUrl,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating article:", err);
    res.status(500).json({ error: "Failed to update the article" });
  }
});

// ==========================================
// MILESTONE 6: CACHED ALPHA VANTAGE API
// ==========================================

// Create an empty object to store our cached prices in the server's memory
const marketCache = {};
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes in milliseconds

app.get("/api/market/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const now = Date.now();

    // 1. THE CACHE CHECK
    // If we have data for this symbol AND it is less than 15 minutes old, send it!
    if (
      marketCache[symbol] &&
      now - marketCache[symbol].timestamp < CACHE_TTL
    ) {
      console.log(`⚡ Serving ${symbol} directly from backend cache!`);
      return res.json(marketCache[symbol].data);
    }

    // 2. THE API FETCH
    // If the cache is empty or expired, ask Wall Street for fresh data
    console.log(`🌐 Cache missed. Fetching fresh data for ${symbol}...`);
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // 3. SAVE AND RESPOND
    if (data["Global Quote"] && data["Global Quote"]["01. symbol"]) {
      const quote = data["Global Quote"];

      const formattedData = {
        symbol: quote["01. symbol"],
        price: parseFloat(quote["05. price"]).toFixed(2),
        change: parseFloat(quote["09. change"]).toFixed(2),
        changePercent: quote["10. change percent"].replace("%", ""),
      };

      // Save the fresh data and the current time into our cache bucket
      marketCache[symbol] = {
        timestamp: now,
        data: formattedData,
      };

      return res.json(formattedData);
    } else {
      // 4. THE FALLBACK
      // If the API blocks us (limit reached), but we have old data, serve the old data
      if (marketCache[symbol]) {
        console.log(`⚠️ API Limit hit. Serving STALE cache for ${symbol}`);
        return res.json(marketCache[symbol].data);
      }

      // Total failure (No cache + API blocked)
      res.status(429).json({ error: "API Limit Reached", details: data });
    }
  } catch (error) {
    console.error("Error fetching market data:", error);
    res.status(500).json({ error: "Server error fetching market data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
