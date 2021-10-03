import React, { useEffect, useState } from 'react'
import Cards from 'react-credit-cards'
import "react-credit-cards/lib/styles.scss"
import { useDispatch, useSelector } from 'react-redux'
import PreviewBox from '../components/PreviewBox'
import { selectHasRequestGoStep, selectReservation, setCompletedStep, updateReservation } from '../store/registrySlice'
import { selectCouponStatus, STATUS } from '../store/reservationSlice'

import "../styles/PreviewPaymentView.scss"
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../utils/cardUtils'
import { dateMonthsStrList, dateYearsStrList } from '../utils/dateUtils'

export default function PreviewPaymentView() {
  const dispatch = useDispatch();

  const reservation = useSelector(selectReservation)

  const couponStatus = useSelector(selectCouponStatus)

  const hasRequestGoStep = useSelector(selectHasRequestGoStep)

  const [cardData, setCardData] = useState({
    name: reservation.card_name ?? "",
    number: reservation.card_number ?? "",
    cvc: reservation.card_cvv ?? "",
    expiry: reservation.card_date_month + "/" + reservation.card_date_year.substr(2, 4), // rcc
    focus: '',
    card_date_month: reservation.card_date_month ?? "", // selectbox
    card_date_year: reservation.card_date_year ?? "", // selectbox
  });

  const canSave = [
    reservation.card_name,
    reservation.card_number,
    reservation.card_date_month,
    reservation.card_date_year,
    reservation.card_cvv,
    couponStatus !== STATUS.loading,
  ].every(Boolean);

  useEffect(() => {
    dispatch(setCompletedStep({ step: 2, completed: canSave }));
  }, [dispatch, canSave])

  useEffect(() => {
    dispatch(updateReservation({
      card_name: cardData.name,
      card_number: cardData.number,
      card_cvv: cardData.cvc,
      card_date_month: cardData.card_date_month,
      card_date_year: cardData.card_date_year
    }));
  }, [dispatch, cardData])

  const handleCardInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = formatCreditCardNumber(value)
    } else if (name === "cvc") {
      value = formatCVC(value)
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
    }
    setCardData(() => ({
      ...cardData,
      [name]: value
    }));
  }

  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.type === "select-one" ? "expiry" : e.target.name });
  }

  const changeCardDate = (e) => {
    let { name, value } = e.target;
    let expiry = value;
    if (name === "card_date_month") {
      if (cardData.card_date_year !== "") {
        expiry = expiry + "" + cardData.card_date_year.substr(2, 4);
      } else {
        expiry = expiry + "••";
      }
    } else if (name === "card_date_year") {
      if (cardData.card_date_month !== "") {
        expiry = cardData.card_date_month + "" + expiry.substr(2, 4);
      } else {
        expiry = "••" + expiry.substr(2, 4);
      }
    }
    setCardData(() => ({
      ...cardData,
      [name]: value,
      expiry: expiry
    }));
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
          placeholders={{ name: "AD SOYAD" }}
        />

        <fieldset className={`card-fieldset ${hasRequestGoStep === 3
          && (reservation.card_name === '' || reservation.card_number === '' || reservation.card_date_month === '' || reservation.card_date_year === '' || reservation.card_cvv === '')
          ? 'error-input'
          : ''}`}>
          <legend>Kredi Kartı Bilgileri</legend>

          <label className="card-row">
            <span>Kartın Üzerindeki İsim</span>
            <input
              placeholder="Kartın Üzerindeki İsim Giriniz"
              name="name"
              value={cardData.name}
              onChange={(e) => handleCardInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
              className={hasRequestGoStep === 3 && reservation.card_name === '' ? 'error-input' : ''}
            />
          </label>

          <label className="card-row">
            <span>Kartın Numarası</span>
            <input
              placeholder="Kartın Numarası Giriniz"
              name="number"
              value={cardData.number}
              onChange={(e) => handleCardInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
              className={hasRequestGoStep === 3 && reservation.card_number === '' ? 'error-input' : ''}
            />
          </label>

          <footer className="card-row">
            <div className="card-dates">
              <span>Kartın Son Kullanma Tarihi </span>
              <div className="card-row">
                <label>
                  <select name="card_date_month" defaultValue={cardData.card_date_month}
                    onChange={(e) => changeCardDate(e)} onFocus={(e) => handleInputFocus(e)}
                    className={hasRequestGoStep === 3 && reservation.card_date_month === '' ? 'error-input' : ''}>
                    <option value="" disabled={true}>AY</option>
                    {dateMonthsStrList.map(m =>
                      <option key={m} value={m}>
                        {m}
                      </option>)
                    }
                  </select>
                </label>
                <label>
                  <select name="card_date_year" defaultValue={cardData.card_date_year}
                    onChange={(e) => changeCardDate(e)} onFocus={(e) => handleInputFocus(e)}
                    className={hasRequestGoStep === 3 && reservation.card_date_year === '' ? 'error-input' : ''}>
                    <option value="" disabled={true}>YIL</option>
                    {dateYearsStrList().map(y =>
                      <option key={y} value={y}>
                        {y}
                      </option>)
                    }
                  </select>
                </label>
              </div>
            </div>

            <label className="card-cvv">
              <span>CVC</span>
              <input
                placeholder="CVV"
                name="cvc"
                value={cardData.cvc}
                onChange={(e) => handleCardInputChange(e)}
                onFocus={(e) => handleInputFocus(e)}
                className={hasRequestGoStep === 3 && reservation.card_cvv === '' ? 'error-input' : ''}
              />
            </label>
          </footer>

          <div className="error-info">
            <b>! Lütfen bilgilerinizi eksiksiz giriniz</b>
          </div>

        </fieldset>
      </div>

      <PreviewBox isHiddenCouponInput={false} />

    </div>
  )
}
