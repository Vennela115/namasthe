const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/restaurants', async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'
  );

  const swiggyApiUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&page_type=DESKTOP_WEB_LISTING';

  try {
    const response = await page.goto(swiggyApiUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    const rawText = await response.text();

    let json;
    try {
      json = JSON.parse(rawText);
    } catch (err) {
      console.error('❌ Invalid JSON:', rawText.slice(0, 100));
      await browser.close();
      return res.status(500).json({ error: 'Invalid JSON response from Swiggy' });
    }

    let restaurants = [];
    for (const card of json?.data?.cards || []) {
      const restList = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (Array.isArray(restList)) {
        // ✅ Keep original full object
        restaurants = restList;
        break;
      }
    }

    res.json({ count: restaurants.length, data: restaurants });
  } catch (err) {
    console.error('❌ Error fetching Swiggy data:', err.message);
    res.status(500).json({ error: 'Failed to fetch data from Swiggy' });
  } finally {
    await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
