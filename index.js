const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const agricultureData = JSON.parse(fs.readFileSync('data.json', 'utf8'));


app.post('/get-advice', (req, res) => {

    const { state, landSize } = req.body;

    if (!agricultureData[state]) {
        return res.json({
            category: "Unknown",
            governmentScheme: "No data available",
            recommendedCrop: "No data available",
            expertTip: "Please enter valid state"
        });
    }

    let sizeType = landSize <= 2 ? "small" : "large";
    const info = agricultureData[state][sizeType];
    
    let sizeCategory = "";

    if (landSize <= 2) {
        sizeCategory = "Small Farmer (Priority Support)";
    } else {
        sizeCategory = "Large Farmer (Machinery Support)";
    }

    res.json({
        category: sizeCategory,
        governmentScheme: info.scheme,
        recommendedCrop: info.crop,
        expertTip: info.tip
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});