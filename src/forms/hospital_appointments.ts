export default class HospitalAppointment {
  id: number;
  consultationDate: string; // format: 'YYYY-MM-DD, formまではdayjsで扱う。'
  memo: string;

  constructor(data?: { id?: number, consultationDate?: string, memo?: string}) {
    this.id = data?.id || 0;
    this.consultationDate = data?.consultationDate || '';
    this.memo = data?.memo || '';
  }
}