import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jumpStep, selectCompletedSteps, selectStep } from '../store/registrySlice';
import "../styles/StepsActions.scss"

export default function StepsActions() {

  const dispatch = useDispatch();
  const step = useSelector(selectStep)
  const completedSteps = useSelector(selectCompletedSteps)

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
      <button onClick={() => goStepNumber(step + 1)}>
        {step === 2 ? "Ödeme Yap ve Bitir" : "Kaydet ve Devam Et"}
      </button>
    </div>
  )
}
