import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import Condition from '../../forms/conditions';
import Calendar from './components/_calendar';
import dayjs from "dayjs";

const inter = Inter({ subsets: ["latin"] });

// urlパラメータからtargetMonthを取得する
const getTargetMonth = () => {
  const query = new URLSearchParams(window.location.search);
  const targetMonth = query.get('targetMonth');
  return targetMonth ? targetMonth : dayjs().format('YYYY-MM-DD');
}

// Todo: このfunctionを修正する
export default function Home() {
  const [conditions, setConditions] = useState(Array<Condition>);
  useEffect(() => {
    // なぜかキャメルケースに変換されないので後ほど修正する
    axios.get('conditions', { params: { target_month: getTargetMonth() } } ).then((response) => {
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
      <Calendar targetMonth={getTargetMonth()} conditions={conditions} />
      {/* <Link href="/conditions/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">新規作成</Link> */}
    </div>
  );
}
