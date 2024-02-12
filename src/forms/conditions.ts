export default class Condition {
  id: number;
  detail: string;
  occurredDate: Date;

  constructor(data?: { id: number, detail: string, occurredDate: Date }) {
    this.id = data?.id || 0;
    this.detail = data?.detail || '';
    this.occurredDate = data?.occurredDate || new Date();
  }
}