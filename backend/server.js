// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Allow all origins for dev (or use your frontend origin)
app.use(cors());

// Utility: Launch Puppeteer
const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
};

// API: Fetch Swiggy restaurant menu by ID
app.get('/menu', async (req, res) => {
  const restaurantId = req.query.restaurantId;

  if (!restaurantId) {
    return res.status(400).json({ error: 'Missing restaurantId in query params' });
  }

  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'
  );

  const menuApiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9716&lng=77.5946&restaurantId=${restaurantId}`;

  try {
    const response = await page.goto(menuApiUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    const rawText = await page.evaluate(() => document.querySelector("pre")?.innerText || "");
    let json;

    try {
      json = JSON.parse(rawText);
    } catch (err) {
      console.error('❌ Invalid JSON:', rawText.slice(0, 150));
      return res.status(500).json({ error: 'Swiggy returned malformed JSON' });
    }

    const menu = json?.data?.cards || [];

    res.json({
      restaurantId,
      itemCount: menu.length,
      menu,
    });
  } catch (err) {
    console.error('❌ Error fetching Swiggy menu:', err.message);
    res.status(500).json({ error: 'Failed to fetch menu from Swiggy' });
  } finally {
    await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
