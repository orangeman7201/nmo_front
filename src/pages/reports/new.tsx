import { Inter } from "next/font/google";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const inter = Inter({ subsets: ["latin"] });

interface HospitalAppointment {
  id: number;
  consultationDate: string;
  memo: string;
}

export default function CreateReport() {
  const router = useRouter();
  const { appointment_id } = router.query;
  const [appointment, setAppointment] = useState<HospitalAppointment | null>(null);
  const [consultationMemo, setConsultationMemo] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointment_id) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`hospital_appointments/${appointment_id}`);
        setAppointment(response.data);
      } catch (error) {
        console.error('来院予定の取得に失敗しました:', error);
        setError('来院予定の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    if (appointment_id) {
      fetchAppointment();
    }
  }, [appointment_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appointment_id) {
      setError('来院予定IDが指定されていません。');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('consultation_reports', {
        consultation_report: {
          hospital_appointment_id: Number(appointment_id),
          consultation_memo: consultationMemo
        }
      });
      
      router.push('/reports');
    } catch (error) {
      console.error('レポートの作成に失敗しました:', error);
      setError('レポートの作成に失敗しました。');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">来院レポート作成</h1>
        <p className="text-center py-4">読み込み中...</p>
      </div>
    );
  }

  if (!appointment && !loading) {
    return (
      <div className="container mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">来院レポート作成</h1>
        <p className="text-red-500 text-center py-4">指定された来院予定が見つかりません。</p>
        <div className="mt-6">
          <Link href="/reports" className="text-blue-500 hover:underline">
            来院レポート一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">来院レポート作成</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">来院情報</h2>
        <p className="mb-2">
          <span className="font-medium">来院日:</span> {appointment && dayjs(appointment.consultationDate).format('YYYY年MM月DD日')}
        </p>
        <p className="mb-4">
          <span className="font-medium">メモ:</span> {appointment?.memo || '（メモなし）'}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="consultationMemo" className="block text-gray-700 text-sm font-bold mb-2">
              来院レポート
            </label>
            <textarea
              id="consultationMemo"
              value={consultationMemo}
              onChange={(e) => setConsultationMemo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={6}
              placeholder="来院の内容や医師からのアドバイスなどを記入してください"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? '送信中...' : 'レポートを作成'}
            </button>
            <Link href="/reports" className="text-blue-500 hover:underline">
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
