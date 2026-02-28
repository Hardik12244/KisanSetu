const fs = require('fs');
const path = require('path');

const agricultureData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data.json'), 'utf8')
);

module.exports = (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { state, city, landSize } = req.body;

  if (!state || !agricultureData[state]) {
    return res.json({ error: "Invalid state" });
  }

  if (!city) {
    const cities = Object.keys(agricultureData[state].cities);
    return res.json({ cities });
  }

  if (!agricultureData[state].cities[city]) {
    return res.json({ error: "Invalid city" });
  }

  let sizeType = landSize <= 2 ? "small" : "large";

  const info = agricultureData[state].cities[city][sizeType];
  const coords = agricultureData[state].cities[city].coords;
  let sizeCategory = landSize <= 2
    ? "Small Farmer (Priority Support)"
    : "Large Farmer (Machinery Support)";

  res.json({
    category: sizeCategory,
    governmentScheme: info.scheme,
    recommendedCrop: info.crop,
    expertTip: info.tip,
    soil: info.soil,
    link: info.link,
    coords: coords,
    city: city,
  });
};
