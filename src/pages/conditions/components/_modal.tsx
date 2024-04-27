
import dayjs, { Dayjs } from "dayjs";
import { useState } from 'react';
import NewCondition from './modal_form/_new_condition';
import NewHospitalAppointment from './modal_form/_new_hospital_appointment';
import Condition from '../../../forms/conditions';
import HospitalAppointment from '../../../forms/hospital_appointments';

interface Props {
  date: Dayjs | null,
  closeModal: () => void,
  createCondition: (condition: Condition) => void
  createHospitalAppointment: (hospitalAppointment: HospitalAppointment) => void
}

export default function Modal(props: Props) {
  const [isCondition, setIsCondition] = useState(true);

  return (
    <div className="modal">
      <div className="modal__background" onClick={props.closeModal}></div>
      <div className="modal__body">
        <div className="modal__body__header">
          <div className="modal__body__header__title">
            <button onClick={() => setIsCondition(true)} className={isCondition ? 'active' : '' }>気になること</button>
            <button onClick={() => setIsCondition(false)} className={isCondition ? '' : 'active' }>病院予約</button>
          </div>
          <div className="modal__body__header__close" onClick={props.closeModal}>×</div>
        </div>

        {/* form */}
        {isCondition ? <NewCondition date={props.date} createCondition={props.createCondition} />
          : <NewHospitalAppointment date={props.date} createHospitalAppointment={props.createHospitalAppointment} />}
      </div>
    </div>
  );
}
