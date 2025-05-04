import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import Condition from '../../forms/conditions';
import HospitalAppointment from '../../forms/hospital_appointments';
import Calendar from './components/_calendar';
import Modal from './components/_modal';
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  // コンポーネント内に移動
  const createCondition = (condition: Condition) => {
    axios.post('conditions', { condition }).then((response) => {
      router.push('/conditions'); // window.location.hrefの代わりにrouter.pushを使用
    }).catch((error) => {
      console.log(error);
    })
  }

  const createHospitalAppointment = (hospitalAppointment: HospitalAppointment) => {
    axios.post('hospital_appointments', { hospital_appointment: hospitalAppointment }).then((response) => {
      router.push('/conditions');
    }).catch((error) => {
      console.log(error);
    })
  }

  const getTargetMonth = () => {
    const { targetMonth } = router.query;
    return typeof targetMonth === 'string' ? targetMonth : dayjs().format('YYYY-MM-DD');
  }

  const [conditions, setConditions] = useState(Array<Condition>);
  const [hospitalAppointment, setHospitalAppointments] = useState(Array<HospitalAppointment>);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Dayjs | null>(null);

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
