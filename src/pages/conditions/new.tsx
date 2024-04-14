import { Inter } from "next/font/google";
import { useState } from 'react';
import axios from '../../plugins/axios';
import Condition from '../../forms/conditions';
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [condition, setConditions] = useState(new Condition());

  return (
    <div>
      <h2 className="mb-8">新規作成</h2>

      <section className="mb-8">
        <div className="mb-8">
          <label htmlFor="detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">体調</label>
          <input onChange={(e) => {
              setConditions({...condition, detail: e.target.value})
            }}
            type="text" id="detail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="体調を入力してください" required />
        </div>
        <div>
          <label htmlFor="occurred-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">症状が起こった日付</label>
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

      <div className="h-16">
        <Link href="/conditions" className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-8">キャンセル</Link>
        {/* heightをtailwindで指定しているが、うまくいかない */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
  );
}
