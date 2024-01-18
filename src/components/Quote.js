import React, { useEffect, useState } from "react";
import quotes from "../utils/quote.png"
import eclipse from "../utils/Ellipse.svg"
const Quote = () => {
  const [quote, setQuote] = useState()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
       try {
         const response = await fetch('https://api.adviceslip.com/advice');
         const data = await response.json();
         setQuote(data.slip.advice);
         setCount(count + 1);
       } catch (error) {
         console.error('Error fetching data:', error);
       }};
    const interval = setInterval(() => {
       fetchData();
    }, 6000);
    return () => clearInterval(interval);
   }, [count]);
  
  return (
    <div>
      <div className="bg-[#192A32] flex flex-col w-[290px] h-[280px] absolute left-[150px] top-[630px] rounded-2xl">
      <h3 className="text-center font-extrabold text-2xl text-[#31C4BE] m-7">Quote {count}</h3>
      <p className="text-center text-[#F2B237] font-extrabold text-2xl">{quote}</p>
      <div className="image relative mt-3">
      <img src={eclipse} alt="eclipse" className="absolute w-[30px] h-[30px] left-[130px]"/>
      <img src={quotes} alt="quotes" className="absolute w-[15px] h-[15px] left-[137px] top-[6px]"/>
      </div>
      </div>
      </div>
  )};

export default Quote;