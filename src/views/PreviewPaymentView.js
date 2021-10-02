import React, { useState } from 'react'
import Cards from 'react-credit-cards'
import "react-credit-cards/lib/styles.scss"
import PreviewBox from '../components/PreviewBox'

import "../styles/PreviewPaymentView.scss"
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../utils/cardUtils'

export default function PreviewPaymentView() {

  const [cardData, setCardData] = useState(
    {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    }
  )

  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  }


  const handleCardInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "number") {
      value = formatCreditCardNumber(value)
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
    } else if (name === "cvc") {
      value = formatCVC(value)
    }

    setCardData(prevState => (
      {
        ...cardData,
        [name]: value
      }
    ))
  }

  return (
    <div className="preview-payment-view">

      <div className="payment-wrap">
        <Cards
          name={cardData.name}
          number={cardData.number}
          cvc={cardData.cvc}
          expiry={cardData.expiry}
          focused={cardData.focus}
        />

        <fieldset className="card-fieldset">
          <legend>Kredi Kartı Bilgileri</legend>

          <label className="card-row">
            <span>Kartın Üzerindeki İsim</span>
            <input
              name="name"
              placeholder="Kartın Üzerindeki İsim Giriniz"
              onChange={(e) => handleCardInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
            />
          </label>

          <label className="card-row">
            <span>Kartın Numarası</span>
            <input
              name="number"
              placeholder="Kartın Numarası Giriniz"
              value={cardData.number}
              onChange={(e) => handleCardInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
            />
          </label>

          <footer className="card-row">
            <label>
              <span>Kartın Son Kullanma Tarihi</span>
              <input
                name="expiry"
                placeholder="AY/YIL"
                value={cardData.expiry}
                onChange={(e) => handleCardInputChange(e)}
                onFocus={(e) => handleInputFocus(e)}
              />
            </label>
            <label>
              <span>CVC</span>
              <input
                name="cvc"
                placeholder="CVV"
                value={cardData.cvc}
                onChange={(e) => handleCardInputChange(e)}
                onFocus={(e) => handleInputFocus(e)}
              />
            </label>
          </footer>

        </fieldset>
      </div>

      <PreviewBox isHiddenCouponInput={false} />

    </div>
  )
}
