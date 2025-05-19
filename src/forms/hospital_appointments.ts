export default class HospitalAppointment {
  id: number;
  consultationDate: string; // format: 'YYYY-MM-DD, formまではdayjsで扱う。'
  memo: string;

  // consultation_dateとconsultationDateどちらも受け取れるようにする
  constructor(data?: { id?: number, consultation_date?: string, consultationDate?: string, memo?: string}) {
    this.id = data?.id || 0;
    this.consultationDate = data?.consultation_date || data?.consultationDate || '';
    this.memo = data?.memo || '';
  }
}