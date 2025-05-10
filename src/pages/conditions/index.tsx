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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // コンポーネント内に移動
  const createCondition = (condition: Condition) => {
    axios.post('conditions', { condition }).then((response) => {
      setIsModalOpen(false); // モーダルを閉じる
      setSuccessMessage('体調情報が正常に登録されました');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      axios.get('conditions', { params: { target_month: getTargetMonth() } }).then((response) => {
        setConditions(response.data);
      });
    }).catch((error) => {
      console.log(error);
    })
  }

  const createHospitalAppointment = (hospitalAppointment: HospitalAppointment) => {
    axios.post('hospital_appointments', { hospital_appointment: hospitalAppointment }).then((response) => {
      setIsModalOpen(false); // モーダルを閉じる
      setSuccessMessage('病院予約が正常に登録されました');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      axios.get('hospital_appointments', { params: { target_month: getTargetMonth() } }).then((response) => {
        setHospitalAppointments(response.data);
      });
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
    <div className="container mx-auto p-4 pb-20">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      <div className="text-2xl font-bold mb-4">Condition一覧</div>
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
