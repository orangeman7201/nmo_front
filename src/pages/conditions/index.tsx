import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import Link from 'next/link';
import Condition from '../../forms/conditions';

const inter = Inter({ subsets: ["latin"] });

// Todo: このfunctionを修正する
export default function Home() {
  const [conditions, setConditions] = useState(Array<Condition>);
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/conditions').then((response) => {
      setConditions(response.data);
    });
  }, [])

  // conditionsがnullの場合はnullを返却
  if (!conditions.length) return null;

  return (
    <div>
      <div>Condition一覧</div>
      {conditions.map((condition, index) => (
        // conditionの方を作成する
        <div key={index}>
          <div>{condition.id}</div>
          <div>{condition.detail}</div>
          {/* このエラーはわからん */}
          <div>{condition.occurredDate}</div>
        </div>
      ))}
      <Link href="/conditions/new">新規作成</Link>
    </div>
  );
}
