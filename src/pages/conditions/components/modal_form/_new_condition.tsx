
import dayjs, { Dayjs } from "dayjs";
import { useState } from 'react';
import Condition from '../../../../forms/conditions';

interface Props {
  date: Dayjs | null,
  createCondition: (condition: Condition) => void
}

export default function ConditionModal(props: Props) {
  const [condition, setConditions] = useState(new Condition({occurredDate: props.date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD')}))

  return (
    <div>
      <section className="mb-8">
        <div className="mb-8">
          <label htmlFor="detail" className="condition_modal__label">体調</label>
          <input onChange={(e) => {
              setConditions({...condition, detail: e.target.value})
            }}
            type="text" id="detail" className="condition_modal__input" placeholder="体調を入力してください" required />
        </div>
        <div className="mb-8">
          <label htmlFor="occurred-date" className="condition_modal__label">症状が起こった日付</label>
          {/* カレンダーのところだけbootを使う */}
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input onChange={(e) => {
                setConditions({...condition, occurredDate: dayjs(e.target.value).format('YYYY-MM-DD')})
              }}
              value={condition.occurredDate}
              id="occurred-date"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="症状が起こった日付"
            />
          </div>
        </div>
        <div className="mb-8">
          <label htmlFor="strength" className="condition_modal__label">強さ</label>
          <input onChange={(e) => {
              setConditions({...condition, strength: Number(e.target.value)})
            }}
            type="number"
            id="strength"
            className="condition_modal__input"
            placeholder="強さを入力してください"
            min="0"
            max="10"
            value={condition.strength}
            required />
        </div>
        <div>
          <label htmlFor="memo" className="condition_modal__label">メモ</label>
          <textarea onChange={(e) => {
              setConditions({...condition, memo: e.target.value})
            }}
            id="memo"
            className="condition_modal__input"
            placeholder="メモを入力してください"
            value={condition.memo} />
        </div>
      </section>

      <div className="condition_modal__button-area">
        <button
          className="condition_modal__button"
          onClick={() => props.createCondition(condition)}>追加</button>
      </div>
    </div>
  );
}
