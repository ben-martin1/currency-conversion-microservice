# Currency Conversion
This API-based microservice converts dollars, pounds, yen, and euros between themselves. 
# Installation and Setup
Clone the repo with `git clone https://github.com/ben-martin1/currency-conversion-microservice/`
To run, install express, liveserver and cors:  
`npm install express`  
`npm install live-server`  
`npm install cors`  
Then run index.js with `npm run index.js` 
Then to test it, run index.html on the specified host as defined by origin in app.use(cors). You can do this by right clicking the HTML file in the explorer in your IDE and select "Open with Liveserver"  
The request will print in the terminal running index.js, and the output will log in the web browser making the call. It will also be returned by the script calling the API.  

# Sample Call
This repo contains a sample form and API call. 
### Request
```
const currencyConversion = async (fromCur, toCur) =>{
    try {
      // modify fetch address to match api endpoint as needed
      const res = await fetch("http://localhost:3001/convert", { 
        method:"POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({FromCurrency: fromCur, ToCurrency: toCur})
      },);
      if (!res.ok){
        throw new Error ("E - !res.ok");
      }
      const res_data = await res.json();
      return res_data
    } catch(err){
      console.error('Error fetching Data!', err);
    }
  };

  document.getElementById("currencyForm").addEventListener("submit", async function(event){
    event.preventDefault(); //prevent page refresh
    const mainForm = document.getElementById("currencyForm")
    const fromCurrency = mainForm.fromCurrency.value;
    const toCurrency = mainForm.toCurrency.value;
    const delta = await currencyConversion(fromCurrency, toCurrency);
    console.log(delta);
    return delta;
  })
```
The eventListener and elementID can be modified to match the user's specifications. The call has two parameters - fromCur and toCur - the origin currency, and conversion currency.  
### Receiving
```
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
```

# Recieving Data
From the call, you can see the data will be printed and returned into a variable `delta`. If invalid to/from currencies are sent, the response will be an error.

# Sequence Diagram
![Sequence Diagram](https://i.ibb.co/Yc2HwYG/sequence-diagram.png)

# Commincation Contract
1) Communicate through Discord.
2) Teammates try to respond within 24 hours to direct messages, and after that follow-ups can be allowed.
3) Prioritize getting working microservice to teammates early to allow tweaking (something like 3-4 days before deadlines).
4) If a team member is late to deliver on a response or early deadline, follow-up, then after 48 hours, seek other teammate help or teaching staff assistance.
5) Communicate in a friendly and respectful manner, and accommodate for different schedules when working with team members.
