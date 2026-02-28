const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "https://hardik12244.github.io"
}));
app.options('*', cors());
app.use(express.json());

const agricultureData = JSON.parse(fs.readFileSync('data.json', 'utf8'));


app.post('/get-advice', (req, res) => {

    const { state, city, landSize } = req.body;

    if (!state || !agricultureData[state]) {
        return res.json({ error: "Invalid state" });
    }

    if (!city) {
        if (!agricultureData[state].cities) {
            return res.json({ cities: [] });
        }

        const cities = Object.keys(agricultureData[state].cities);
        return res.json({ cities });
    }
    if (!agricultureData[state].cities[city]) {
        return res.json({ error: "Invalid city" });
    }

    if (landSize === undefined) {
        return res.json({ error: "Land size missing" });
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
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});