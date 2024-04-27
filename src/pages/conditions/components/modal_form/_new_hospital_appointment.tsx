
import dayjs, { Dayjs } from "dayjs";
import { useState } from 'react';
import HospitalAppointments from '../../../../forms/hospital_appointments';

interface Props {
  date: Dayjs | null
  createHospitalAppointment: (hospitalAppointment: HospitalAppointments) => void
}

export default function ConditionModal(props: Props) {
  const [hospitalAppointment, setHospitalAppointment] = useState(new HospitalAppointments({consultationDate: props.date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD')}))

  return (
    <div>
      <section className="mb-8">
        <div className="mb-8">
          <label htmlFor="occurred-date" className="condition_modal__label">診察予定日</label>
          {/* カレンダーのところだけbootを使う */}
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input onChange={(e) => {
                setHospitalAppointment({...hospitalAppointment, consultationDate: dayjs(e.target.value).format('YYYY-MM-DD')})
              }}
              value={hospitalAppointment.consultationDate}
              id="occurred-date"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="診察日"
            />
          </div>
        </div>
        <div>
          <label htmlFor="memo" className="condition_modal__label">メモ</label>
          <textarea onChange={(e) => {
              setHospitalAppointment({...hospitalAppointment, memo: e.target.value})
            }}
            id="memo"
            className="condition_modal__input"
            placeholder="メモを入力してください"
            value={hospitalAppointment.memo} />
        </div>
      </section>

      <div className="condition_modal__button-area">
        <button
          className="condition_modal__button"
          onClick={() => props.createHospitalAppointment(hospitalAppointment)}>追加</button>
      </div>
    </div>
  );
}
