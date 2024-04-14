export default class Condition {
  id: number;
  detail: string;
  occurredDate: string; // format: 'YYYY-MM-DD, formまではdayjsで扱う。'

  constructor(data?: { id?: number, detail?: string, occurredDate?: string }) {
    this.id = data?.id || 0;
    this.detail = data?.detail || '';
    this.occurredDate = data?.occurredDate || '';
  }
}