import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
   const[amount, setAmount] = useState(1);
   const[fromCurrency,setFromCurrency]= useState("USD");
   const[toCurrency,setToCurrency]= useState("INR");
   const[convertedAmount,setConvertedAmount]= useState(null);
   const[exchangeRate, setExchangeRate]= useState(null);

   useEffect(()=>{
    const getExchangeRate = async ()=> {
     try{
      let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
      const response = await axios.get(url);
      // console.log(response);
      setExchangeRate(response.data.rates[toCurrency]);

     } catch(error){
      console.error("Error fetching exchange rate:",error);
       
     }
     };
      getExchangeRate();
     },[fromCurrency, toCurrency]);

     useEffect(()=>{
      if(exchangeRate !== null){
        setConvertedAmount((amount*exchangeRate).toFixed(2));
      }


     },[amount, exchangeRate]);

     const handleAmountChange=(e)=>{ 
      const value = parseFloat(e.target.value);
      setAmount(isNaN (value)? 0:value);
    };

    const handleFromCurrencyChange=(e)=>{
       setFromCurrency(e.target.value);
      };

      const handleToCurrencyChange=(e)=>{
        setToCurrency(e.target.value);
       };

  
  return (
    <>
    <div className="currency-converter"> 
    <div className="box"></div>
    <div className="data">
    <h2>CURRENCY CONVERTER</h2>

    <div className="input-container">
    <label htmlFor="amt">Amount:</label>
    <input type="number" id="amt" value={amount} onChange={handleAmountChange}/>
    </div>


  <div className="input-container">
  <label htmlFor="fromCurrency">From Currency:</label>
  <select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
    <option value="USD">USD - United State Dollar</option>
    <option value="EUR">EUR - Euro </option>
    <option value="GBP">GBP - British Pound Sterling </option>
    <option value="JPY">JPY - Japanese Yen</option>
    <option value="AUD">AUD - Australian Dollar</option>
    <option value="CAD">CAD - Canadian Dollar</option>
    <option value="CNY">CNY - Chinese Yuan</option>
    <option value="INR">INR - Indian Rupee </option>
    <option value="BRL">BRL - Brazilizn Real</option>
    <option value="ZAR">ZAR - South African Rand</option>
  </select>
  </div>


  <div className="input-container">
  <label htmlFor="toCurrency">To Currency:</label>
  <select id="fromCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
   <option value="USD">USD - United State Dollar</option>
   <option value="EUR">EUR - Euro </option>
   <option value="GBP">GBP - British Pound Sterling </option>
   <option value="JPY">JPY - Japanese Yen</option>
   <option value="AUD">AUD - Australian Dollar</option>
   <option value="CAD">CAD - Canadian Dollar</option>
   <option value="CNY">CNY - Chinese Yuan</option>
   <option value="INR">INR - Indian Rupee </option>
   <option value="BRL">BRL - Brazilizn Real</option>
   <option value="ZAR">ZAR - South African Rand</option>
  </select>
  </div>
   
   <div className="result">
    <p> {amount} {fromCurrency} INR is equal to {convertedAmount} {toCurrency}</p>
   </div>


    </div>
    </div>


  </>
  )
}

export default App
