import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import Condition from '../../forms/conditions';
import HospitalAppointment from '../../forms/hospital_appointments';
import Calendar from './components/_calendar';
import Modal from './components/_modal';
import dayjs, { Dayjs } from "dayjs";

const inter = Inter({ subsets: ["latin"] });

// urlパラメータからtargetMonthを取得する
const getTargetMonth = () => {
  const query = new URLSearchParams(window.location.search);
  const targetMonth = query.get('targetMonth');
  return targetMonth ? targetMonth : dayjs().format('YYYY-MM-DD');
}

// 体調の新規作成
const createCondition = (condition: Condition) => {
  axios.post('conditions', { condition }).then((response) => {
    window.location.href = '/conditions';
  }).catch((error) => {
    console.log(error);
  })
}

// 病院予約の新規作成
const createHospitalAppointment = (hospitalAppointment: HospitalAppointment) => {
  axios.post('hospital_appointments', { hospital_appointment: hospitalAppointment }).then((response) => {
    window.location.href = '/conditions';
  }).catch((error) => {
    console.log(error);
  })
}

export default function Home() {
  const [conditions, setConditions] = useState(Array<Condition>);
  const [hospitalAppointment, setHospitalAppointments] = useState(Array<HospitalAppointment>);
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
    axios.get('hospital_appointments', { params: { target_month: getTargetMonth() } } ).then((response) => {
      setHospitalAppointments(response.data);
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
        hospitalAppointments={hospitalAppointment}
      />

      {/* 体調の新規作成モーダル */}
      {/* 日付をクリックするとモーダルが表示される */}
      {isModalOpen &&
        <Modal
          date={modalDate}
          closeModal={() => setIsModalOpen(false)}
          createCondition={createCondition}
          createHospitalAppointment={createHospitalAppointment} />}
    </div>
  );
}
