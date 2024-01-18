import { useState } from "react";
import "./index.css";

export default function App() {
  const [billCost, setBillCost] = useState(0);
  const [rating1, setRating1] = useState('');
  const [rating2, setRating2] = useState('');
  return (
    <div className="app">
      <Bill billCost={billCost} onBillCost={setBillCost} />
      <SelectPercentage rating={rating1} onSetRating={setRating1} text='How did you like your service?'/>
      <SelectPercentage rating={rating2} onSetRating={setRating2} text='How did your friend like the service?'/>
      <Output billCost={billCost} rating1={rating1} rating2={rating2} />
      {billCost > 0 && <Reset setBillCost={setBillCost} setRating1={setRating1} setRating2={setRating2} />}
    </div>
  );
}

function Bill({billCost, onBillCost}) {

  return (
    <div className="bill">
      <p>How much was your bill?</p>
      <input
        type="text"
        value={billCost}
        onChange={(e) =>
          onBillCost(
            isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
          )
        }
      />
    </div>
  );
}

function SelectPercentage({text, rating, onSetRating}){

  return(
  <div className="bill">
    <p>{text}</p>
    <select value={rating} onChange={(e) => onSetRating(e.target.value)}>
      <option value="0" key='0%' >Dissatisfied (0%)</option>
      <option value="5" key='5%' >It was okay (5%)</option>
      <option value="10" key='10%' >It was good (10%)</option>
      <option value="20" key='20%' >Absolutely Amazing (20%)</option>
    </select>
  </div>
  )
}

function Output({billCost, rating1, rating2}){
  const avg = Math.round((Number(rating1) + Number(rating2)) / 2);
  const tip = Math.round(billCost * (avg/100));
  return <div className="output">
    {billCost > 0 && 
    <h3>You pay ${billCost + tip}({billCost} + ${tip} tip)</h3>
}
  </div>
}

function Reset({setBillCost, setRating1, setRating2}){
  function handleReset(){
    setBillCost(0);
    setRating1('')
    setRating2('');
  }
  return <button onClick={handleReset}>Reset</button>
}