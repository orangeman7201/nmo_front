
import dayjs, { Dayjs } from "dayjs";
import Condition from '@/forms/conditions';
import HospitalAppointment from '@/forms/hospital_appointments';

// 日付を配列で保存する関数
const calendarByWeek = (targetMonth: string) => {
  const startDate: Dayjs = dayjs(targetMonth).startOf('month');
  const endDate = startDate.endOf('month');
  const monthDates = [];
  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'date')) {
    monthDates.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  // 日曜日始まりの週ごとに分割する
  const calendarByWeek: Dayjs[][] = [];
  let currentWeek: Dayjs[] = [];
  monthDates.forEach((date) => {
    if (date.day() === 0) {
      // 日曜日の場合は新しい週を作成
      calendarByWeek.push(currentWeek);
      currentWeek = [date];
    } else {
      // 日曜日以外の場合は既存の週に日付を追加
      currentWeek.push(date);
    }
  });
  calendarByWeek.push(currentWeek);

  // 日曜日始まりの週の最初の週に前月の日付を追加
  const firstWeek = calendarByWeek[0];
  const daysToFill = 7 - firstWeek.length;
  for (let i = 1; i <= daysToFill; i++) {
    firstWeek.unshift(startDate.subtract(i, 'day'));
  }

  // 日曜日始まりの週の最後の週に翌月の日付を追加
  const lastWeek = calendarByWeek[calendarByWeek.length - 1];
  const lastDate = lastWeek[lastWeek.length - 1];
  const daysToFillLast = 7 - lastWeek.length;
  for (let i = 1; i <= daysToFillLast; i++) {
    lastWeek.push(lastDate.add(i, 'day'));
  }

  return calendarByWeek;
}

// 一ヶ月前の月に遷移する
// urlパラメータにセットしてリダイレクトする
const prevMonth = (targetMonth: string) => {
  const prevMonth = dayjs(targetMonth).subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
  window.location.href = `?targetMonth=${prevMonth}`;
}

// 一ヶ月後の月に遷移する
// urlパラメータにセットしてリダイレクトする
const nextMonth = (targetMonth: string) => {
  const nextMonth = dayjs(targetMonth).add(1, 'month').startOf('month').format('YYYY-MM-DD');
  window.location.href = `?targetMonth=${nextMonth}`;
}

// 日付がtargetMonthと同じ月かどうかを判定する
const inTargetMonth = (date: Dayjs, targetMonth: string) => {
  return date.format('YYYY-MM') === dayjs(targetMonth).format('YYYY-MM');
}

const hasCondition = (date: Dayjs, conditions: Array<Condition>) => {
  return conditions.filter((c: Condition) => dayjs(c.occurredDate).date() === dayjs(date).date()).length > 0;
}

// 日付に診察日があるかどうかを判定する
const hasHospitalAppointment = (date: Dayjs, hospitalAppointments: Array<HospitalAppointment>) => {
  return hospitalAppointments.filter((ha: HospitalAppointment) => dayjs(ha.consultationDate).date() === dayjs(date).date()).length > 0;
}

interface Props {
  openModal: (date: Dayjs) => void;
  targetMonth: string;
  conditions: Array<Condition>;
  hospitalAppointments: Array<HospitalAppointment>;
}

export default function Calendar(props: Props) {
  return (
    <div>
      <div>{dayjs(props.targetMonth).format('YYYY年MM月')}</div>
      <div>
        <button onClick={() => prevMonth(props.targetMonth)}>前月</button>
        <button onClick={() => nextMonth(props.targetMonth)}>次月</button>
      </div>

      <div className="calendar">
        <div className="day">
          <div className="sunday">日</div>
          <div>月</div>
          <div>火</div>
          <div>水</div>
          <div>木</div>
          <div>金</div>
          <div className="saturday">土</div>
        </div>
        {/* 週の表示 */}
        <div className="week">
          {calendarByWeek(props.targetMonth).map((week, index) => (
            <div key={index} className="date">
              {week.map(date => (
                <button
                  key={date.format('YYYY-MM-DD')}
                  className={ `cell ${inTargetMonth(date, props.targetMonth) ? '' : 'grey'} ${hasHospitalAppointment(date, props.hospitalAppointments) ? 'has-hospital-appointment' : ''}` }
                  onClick={() => props.openModal(date)}
                >
                  <div>{date.format('D')}</div>
                  {hasCondition(date, props.conditions) &&<div>・</div>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
