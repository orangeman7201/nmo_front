import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from '../plugins/axios';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [conditions, setConditions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/conditions').then((response) => {
      setConditions(response.data);
    });
  }, [])

  // conditionsがnullの場合はnullを返却
  if (!conditions.length) return null;

  return (
    <div>
      {conditions.map((condition, index) => (
        <div key={index}>
          <div>{condition.id}</div>
          <div>{condition.detail}</div>
          <div>{condition.occurredDate}</div>
        </div>
      ))}

      <div>
        <button onClick={() => {
          axios.post('http://localhost:3000/api/v1/conditions', {
            detail: 'テスト',
            occurredDate: '2021-01-01'
          }).then((response) => {
            console.log(response);
          });
        }}>追加</button>
      </div>
    </div>
  );
}
