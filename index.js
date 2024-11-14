const cors = require("cors");
const express = require("express");

const app = express();
const port = 3001;
const endpointURL = "/convert"; //modify to change API endpoint

app.use(cors({
    origin: 'http://localhost:5500',   // modify to whatever URL index.html is running on, if using liveserver
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses form data  

app.post(endpointURL, (req, res) => {
    const fromCurrency = req.body.FromCurrency;
    const toCurrency = req.body.ToCurrency;
    if (!fromCurrency){
        return res.status(400).send('missing fromCurrency');
    }
    if (!toCurrency){
        return res.status(400).send('missing toCurrency');
    }

    const conversion = {
        dollars:{dollars:1, euros:.93, yen:152.73, pounds:.77},
        euros:{dollars:1.07, euros:1, yen:163.60, pounds:.83},
        yen:{dollars:.0065, euros:.0061, yen:1, pounds:.0051},
        pounds:{dollars:1.29, euros:1.21, yen:197.14, pounds:1},
    };

    const ratio = conversion[fromCurrency][toCurrency]; 
    console.log(`Conversion of ${fromCurrency} to ${toCurrency}: ${ratio}`);
    res.json(ratio);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});