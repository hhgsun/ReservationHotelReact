import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jumpStep, selectCompletedSteps, selectReservation, selectReservationPrice, selectStep } from '../store/registrySlice';
import { sendBooking, sendUpdateBooking } from '../store/reservationSlice';
import "../styles/StepsActions.scss"

export default function StepsActions() {

  const dispatch = useDispatch();
  const step = useSelector(selectStep)
  const completedSteps = useSelector(selectCompletedSteps)

  const reservation = useSelector(selectReservation)

  const reservationPrice = useSelector(selectReservationPrice)

  const handlePayment = () => {
    for (const s in completedSteps) {
      if (Object.hasOwnProperty.call(completedSteps, s)) {
        const completed = completedSteps[s];
        if (completed === false) {
          return;
        }
      }
    }

    dispatch(sendBooking({
      ...reservation,
      price: reservationPrice
    }));
    dispatch(jumpStep(3));
  }

  const handleReservUpdate = () => {
    for (const s in completedSteps) {
      if (Object.hasOwnProperty.call(completedSteps, s)) {
        const completed = completedSteps[s];
        if (completed === false) {
          return;
        }
      }
    }
    if (reservation.id === "") {
      return;
    }
    dispatch(sendUpdateBooking({
      ...reservation,
      price: reservationPrice
    }));
    dispatch(jumpStep(3));
  }

  const goStepNumber = (num) => {
    if (num === 0) {
      dispatch(jumpStep(num));
    }
    if (num === 1 && completedSteps[0]) {
      dispatch(jumpStep(num));
      return;
    }
    if (num === 2 && completedSteps[0] && completedSteps[1]) {
      dispatch(jumpStep(num));
      return;
    }
  }

  return (
    <div className="steps-actions">
      {step !== 0 ? <button onClick={() => goStepNumber(step - 1)}>Geri</button> : <div></div>}
      {step === 2
        ? (
          reservation.id
            ? <button onClick={() => handleReservUpdate()}>Kaydı Güncelle</button>
            : <button onClick={() => handlePayment()}>Ödeme Yap ve Bitir</button>)
        : <button onClick={() => goStepNumber(step + 1)}>Kaydet ve Devam Et</button>
      }
    </div>
  )
}
