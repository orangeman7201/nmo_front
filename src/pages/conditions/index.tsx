import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import Condition from '../../forms/conditions';
import Calendar from './components/_calendar';
import ConditionModal from './components/_condition_modal';
import dayjs, { Dayjs } from "dayjs";

const inter = Inter({ subsets: ["latin"] });

// urlパラメータからtargetMonthを取得する
const getTargetMonth = () => {
  const query = new URLSearchParams(window.location.search);
  const targetMonth = query.get('targetMonth');
  return targetMonth ? targetMonth : dayjs().format('YYYY-MM-DD');
}

export default function Home() {
  const [conditions, setConditions] = useState(Array<Condition>);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Dayjs | null>(null);

  // Q. ここで関数を定義してもいいのか？
  const openModal = (date: Dayjs) => {
    setIsModalOpen(true);
    setModalDate(date);
  }

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
      <Calendar
        openModal={openModal}
        targetMonth={getTargetMonth()}
        conditions={conditions}
      />

      {/* 体調の新規作成モーダル */}
      {/* 日付をクリックするとモーダルが表示される */}
      {isModalOpen && <ConditionModal date={modalDate} closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}
