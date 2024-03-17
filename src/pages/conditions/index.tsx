import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import Link from 'next/link';
import Condition from '../../forms/conditions';
import Calendar from './components/_calendar';

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
      {/* デフォルトで当月のカレンダーを表示 */}
      {/* 次の月を押すと次の月のカレンダーが表示される */}
      <Calendar targetMonth={"2024-03-01"} />
      {/* <Link href="/conditions/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">新規作成</Link> */}
    </div>
  );
}
