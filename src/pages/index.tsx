import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from 'axios';

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
          <div>{condition.occurred_date}</div>
        </div>
      ))}
    </div>
  );
}
