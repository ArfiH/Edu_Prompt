import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

router.get('/', async (req, res) => {
  const query = req.query.q || '';
  if (!query.trim()) return res.json([]);

  const cacheKey = query.toLowerCase();
  const now = Date.now();

  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (now - timestamp < CACHE_TTL) {
      return res.json(data);
    } else {
      cache.delete(cacheKey);
    }
  }

  const url = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const text = buffer.toString('utf-8');

    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']');
    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(jsonString);

    const suggestions = parsed[1].map((item) => item[0]);

    cache.set(cacheKey, { data: suggestions, timestamp: now });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'inline');
    res.json(suggestions);
  } catch (err) {
    console.error('❌ Error parsing suggestions:', err.message);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

export default router;
