import React from 'react'
import { useDispatch } from 'react-redux';
import { initialReservationData, jumpStep, updateReservation } from '../store/registrySlice';
import "../styles/AppHeader.scss";

export default function AppHeader() {

  const dispatch = useDispatch();

  const newReservation = () => {
    dispatch(updateReservation(initialReservationData));
    dispatch(jumpStep(0));
  }

  return (
    <header className="app-header">
      <div className="brand">
        <h1>OTEL</h1>
        <h2>Rezervasyon Sistemi</h2>
      </div>
      <nav>
        <a href="#0" onClick={() => newReservation()}>Yeni Rezervasyon Yap</a>
      </nav>
    </header>
  )
}
