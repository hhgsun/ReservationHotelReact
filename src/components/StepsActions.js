import React from 'react'
import { useSelector } from 'react-redux'
import { selectReservation, selectStep } from '../store/registrySlice';
import "../styles/StepsActions.scss"

export default function StepsActions({ goStepNumber, handlePayment, handleReservUpdate }) {

  const step = useSelector(selectStep)
  const reservation = useSelector(selectReservation)

  return (
    <div className="steps-actions">
      {step !== 0 ? <button onClick={() => goStepNumber(step - 1)}>Geri</button> : <div></div>}
      <button onClick={() => goStepNumber(step + 1)}>
        {step === 2
          ? (
            reservation.id
              ? "Kaydı Güncelle"
              : "Ödeme Yap ve Bitir")
          : "Kaydet ve Devam Et"
        }
      </button>
      {/* {step === 2
        ? (
          reservation.id
            ? <button onClick={() => handleReservUpdate()}>Kaydı Güncelle</button>
            : <button onClick={() => handlePayment()}>Ödeme Yap ve Bitir</button>)
        : <button onClick={() => goStepNumber(step + 1)}>Kaydet ve Devam Et</button>
      } */}
    </div>
  )
}
