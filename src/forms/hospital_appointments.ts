export default class HospitalAppointment {
  id: number;
  consultationDate: string; // format: 'YYYY-MM-DD, formまではdayjsで扱う。'
  memo: string;

  constructor(data?: { id?: number, consultation_date?: string, memo?: string}) {
    this.id = data?.id || 0;
    this.consultationDate = data?.consultation_date || '';
    this.memo = data?.memo || '';
  }
}