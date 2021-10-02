import React from 'react'
import "../styles/AppHeader.scss";

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="brand">
        <h1>OTEL</h1>
        <h2>Rezervasyon Sistemi</h2>
      </div>
      <nav>
        <a href="#hhg">Yeni Rezervasyon Yap</a>
      </nav>
    </header>
  )
}
