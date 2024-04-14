
import { Dayjs } from "dayjs";
import { useState } from 'react';
import Condition from '../../../forms/conditions';
import axios from '../../../plugins/axios';

export default function ConditionModal(props: { date: Dayjs | null, closeModal: () => void }) {
  const [condition, setConditions] = useState(new Condition())

  return (
    <div className="modal">
      <div className="modal__background" onClick={props.closeModal}></div>
      <div className="modal__body">
        <div className="modal__body__header">
          <div className="modal__body__header__title">Condition新規作成</div>
          <div className="modal__body__header__close" onClick={props.closeModal}>×</div>
        </div>

        <section className="mb-8">
          <div className="mb-8">
            <label htmlFor="detail" className="condition_modal__label">体調</label>
            <input onChange={(e) => {
                setConditions({...condition, detail: e.target.value})
              }}
              type="text" id="detail" className="condition_modal__input" placeholder="体調を入力してください" required />
          </div>
          <div>
            <label htmlFor="occurred-date" className="condition_modal__label">症状が起こった日付</label>
            {/* カレンダーのところだけbootを使う */}
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div>
              <input onChange={(e) => {
                setConditions({...condition, occurredDate: new Date(e.target.value)})
              }}
              id="occurred-date" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="症状が起こった日付" />
            </div>
          </div>
        </section>

        <div className="condition_modal__button-area">
          <button
            className="condition_modal__button"
            onClick={() => {
              axios.post('/conditions', condition).then((response) => {
                      // 一覧画面にリダイレクト
                      window.location.href = '/conditions';
                    }).catch((error) => {
                      console.error(error);
                    })
          }}>追加</button>
        </div>
      </div>
    </div>
  );
}
