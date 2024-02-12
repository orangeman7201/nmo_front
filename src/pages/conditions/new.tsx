import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import Condition from '../../forms/conditions';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [condition, setConditions] = useState(new Condition());


  return (
    <div>
      <div>新規作成</div>
      <div>体調
        <input type="text" onChange={(e) => {
          setConditions({...condition, detail: e.target.value})
        }} />
      </div>
      <div>日付
        <input type="date" onChange={(e) => {
          setConditions({...condition, occurredDate: new Date(e.target.value)})
        }} />
      </div>
      <div>
        <button onClick={() => {
          axios.post('/conditions', condition).then((response) => {
                  console.log(response);
                }).catch((error) => {
                  console.error(error);
                })
        }}>追加</button>
      </div>
    </div>
  );
}
