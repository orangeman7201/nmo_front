import { Inter } from "next/font/google";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const inter = Inter({ subsets: ["latin"] });

interface ConsultationReport {
  id: number;
  hospital_appointment_id: number;
  consultation_memo: string;
  start_date: string;
  end_date: string;
  hospital_appointment: {
    id: number;
    consultationDate: string;
    memo: string;
  };
  conditions: Array<{
    id: number;
    detail: string;
    occurred_date: string;
    strength: number;
    memo: string;
  }>;
}

export default function ReportDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [report, setReport] = useState<ConsultationReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`consultation_reports/${id}`);
        setReport(response.data);
      } catch (error) {
        console.error('レポートの取得に失敗しました:', error);
        setError('レポートの取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">来院レポート詳細</h1>
        <p className="text-center py-4">読み込み中...</p>
      </div>
    );
  }

  if (!report && !loading) {
    return (
      <div className="container mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">来院レポート詳細</h1>
        <p className="text-red-500 text-center py-4">指定されたレポートが見つかりません。</p>
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
      <h1 className="text-2xl font-bold mb-4">来院レポート詳細</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {report && (
        <div className="bg-white shadow-md rounded p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">来院情報</h2>
          <p className="mb-2">
            <span className="font-medium">来院日:</span> {report.hospital_appointment && report.hospital_appointment.consultationDate ? 
              dayjs(report.hospital_appointment.consultationDate).format('YYYY年MM月DD日') : '（日付なし）'}
          </p>
          <p className="mb-4">
            <span className="font-medium">メモ:</span> {report.hospital_appointment && report.hospital_appointment.memo ? 
              report.hospital_appointment.memo : '（メモなし）'}
          </p>
          
          <h2 className="text-xl font-semibold mb-4 mt-6">来院レポート</h2>
          <p className="mb-6 whitespace-pre-wrap">{report.consultation_memo}</p>
          
          {report.conditions && report.conditions.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4 mt-6">期間中の体調記録</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">日付</th>
                      <th className="py-3 px-6 text-left">体調</th>
                      <th className="py-3 px-6 text-center">強さ</th>
                      <th className="py-3 px-6 text-left">メモ</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {report.conditions.map((condition) => (
                      <tr key={condition.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left">
                          {dayjs(condition.occurred_date).format('YYYY年MM月DD日')}
                        </td>
                        <td className="py-3 px-6 text-left">{condition.detail}</td>
                        <td className="py-3 px-6 text-center">{condition.strength}</td>
                        <td className="py-3 px-6 text-left">{condition.memo || '（メモなし）'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
      
      <div className="mt-6">
        <Link href="/reports" className="text-blue-500 hover:underline">
          来院レポート一覧に戻る
        </Link>
      </div>
    </div>
  );
}
