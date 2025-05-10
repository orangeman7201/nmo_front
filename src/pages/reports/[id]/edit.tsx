import { Inter } from "next/font/google";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from '../../../plugins/axios';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const inter = Inter({ subsets: ["latin"] });

interface HospitalAppointment {
  id: number;
  consultationDate: string;
  memo: string;
}

interface Condition {
  id: number;
  detail: string;
  occurred_date: string;
  strength: number;
  memo: string;
}

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
  conditions: Array<Condition>;
}

export default function EditReport() {
  const router = useRouter();
  const { id } = router.query;
  const [report, setReport] = useState<ConsultationReport | null>(null);
  const [consultationMemo, setConsultationMemo] = useState('');
  const [previousConditions, setPreviousConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const [conditionsLoading, setConditionsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`consultation_reports/${id}`);
        setReport(response.data);
        setConsultationMemo(response.data.consultation_memo || '');
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

  useEffect(() => {
    const fetchPreviousConditions = async () => {
      if (!report || !report.hospital_appointment || !report.hospital_appointment.consultationDate) return;
      
      try {
        setConditionsLoading(true);
        
        const appointmentsResponse = await axios.get('hospital_appointments');
        const appointments = appointmentsResponse.data;
        
        const previousAppointments = appointments.filter((app: HospitalAppointment) => {
          return app.id !== report.hospital_appointment_id && 
                 dayjs(app.consultationDate).isBefore(dayjs(report.hospital_appointment.consultationDate));
        });
        
        let conditionsResponse;
        
        if (previousAppointments.length === 0) {
          conditionsResponse = await axios.get(`conditions/up_to_date`, {
            params: { end_date: report.hospital_appointment.consultationDate }
          });
        } else {
          const latestPreviousAppointment = previousAppointments.sort((a: HospitalAppointment, b: HospitalAppointment) => {
            return dayjs(b.consultationDate).unix() - dayjs(a.consultationDate).unix();
          })[0];
          
          conditionsResponse = await axios.get(`conditions/between_dates`, {
            params: {
              start_date: latestPreviousAppointment.consultationDate,
              end_date: report.hospital_appointment.consultationDate
            }
          });
        }
        
        setPreviousConditions(conditionsResponse.data);
      } catch (error) {
        console.error('過去の条件の取得に失敗しました:', error);
      } finally {
        setConditionsLoading(false);
      }
    };

    if (report && report.hospital_appointment) {
      fetchPreviousConditions();
    }
  }, [report, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      setError('レポートIDが指定されていません。');
      return;
    }

    try {
      setSubmitting(true);
      await axios.put(`consultation_reports/${id}`, {
        consultation_report: {
          consultation_memo: consultationMemo
        }
      });
      
      setSuccessMessage('レポートが更新されました。');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('レポートの更新に失敗しました:', error);
      setError('レポートの更新に失敗しました。');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">来院レポート編集</h1>
        <p className="text-center py-4">読み込み中...</p>
      </div>
    );
  }

  if (!report && !loading) {
    return (
      <div className="container mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">来院レポート編集</h1>
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
      <h1 className="text-2xl font-bold mb-4">来院レポート編集</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">来院情報</h2>
        <p className="mb-2">
          <span className="font-medium">来院日:</span> {report?.hospital_appointment && report.hospital_appointment.consultationDate ? 
            dayjs(report.hospital_appointment.consultationDate).format('YYYY年MM月DD日') : '（日付なし）'}
        </p>
        <p className="mb-4">
          <span className="font-medium">メモ:</span> {report?.hospital_appointment && report.hospital_appointment.memo ? 
            report.hospital_appointment.memo : '（メモなし）'}
        </p>
        
        {/* 過去の条件一覧 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">前回からの気になること</h2>
          
          {conditionsLoading ? (
            <p className="text-center py-2">読み込み中...</p>
          ) : previousConditions.length > 0 ? (
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
                  {previousConditions.map((condition) => (
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
          ) : (
            <p className="text-gray-500 italic">この期間に記録された気になることはありません。</p>
          )}
        </div>
        
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
              {submitting ? '送信中...' : 'レポートを更新'}
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
