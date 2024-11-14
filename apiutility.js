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