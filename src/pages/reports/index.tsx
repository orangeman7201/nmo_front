import { Inter } from "next/font/google";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import HospitalAppointment from '../../forms/hospital_appointments';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const inter = Inter({ subsets: ["latin"] });

interface ConsultationReport {
  id: number;
  hospital_appointment_id: number;
  consultation_memo: string;
  start_date: string;
  end_date: string;
}

export default function Reports() {
  const router = useRouter();
  const [hospitalAppointments, setHospitalAppointments] = useState<HospitalAppointment[]>([]);
  const [consultationReports, setConsultationReports] = useState<ConsultationReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const appointmentsResponse = await axios.get('hospital_appointments');
        setHospitalAppointments(appointmentsResponse.data);

        const reportsResponse = await axios.get('consultation_reports');
        setConsultationReports(reportsResponse.data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasReport = (appointmentId: number) => {
    return consultationReports.some(report => report.hospital_appointment_id === appointmentId);
  };

  const getReportId = (appointmentId: number) => {
    const report = consultationReports.find(report => report.hospital_appointment_id === appointmentId);
    return report ? report.id : null;
  };

  const handleCreateReport = (appointmentId: number) => {
    router.push(`/reports/new?appointment_id=${appointmentId}`);
  };

  const handleViewReport = (reportId: number) => {
    router.push(`/reports/${reportId}`);
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">来院レポート一覧</h1>
      
      {loading ? (
        <p className="text-center py-4">読み込み中...</p>
      ) : hospitalAppointments.length === 0 ? (
        <p className="text-center py-4">来院予定がありません。</p>
      ) : (
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">来院日</th>
                <th className="py-3 px-6 text-left">メモ</th>
                <th className="py-3 px-6 text-center">アクション</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {hospitalAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">
                    {dayjs(appointment.consultationDate).format('YYYY年MM月DD日')}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {appointment.memo || '（メモなし）'}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {hasReport(appointment.id) ? (
                      <button
                        onClick={() => handleViewReport(getReportId(appointment.id)!)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                      >
                        レポートを見る
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCreateReport(appointment.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                      >
                        レポートを作成
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-6">
        <Link href="/conditions" className="text-blue-500 hover:underline">
          体調一覧に戻る
        </Link>
      </div>
    </div>
  );
}
