const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const agricultureData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

app.get('/get-advice',(req,res)=>{
    console.log("hi");
})

app.post('/get-advice', (req, res) => {
    const { state, landSize } = req.body; 
    
    const info = agricultureData[state]; 

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