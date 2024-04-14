export default class Condition {
  id: number;
  detail: string;
  occurredDate: string; // format: 'YYYY-MM-DD, formまではdayjsで扱う。'
  strength: number;
  memo: string;

  constructor(data?: { id?: number, detail?: string, occurredDate?: string, strength?: number, memo?: string}) {
    this.id = data?.id || 0;
    this.detail = data?.detail || '';
    this.occurredDate = data?.occurredDate || '';
    this.strength = data?.strength || 0;
    this.memo = data?.memo || '';
  }
}