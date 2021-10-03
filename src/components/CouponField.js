import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCoupon, selectCoupon, selectCouponStatus, STATUS } from '../store/reservationSlice';

export default function CouponField({ reservationCouponCode, setReservationCouponCode }) {

  const dispatch = useDispatch();

  const coupon = useSelector(selectCoupon);
  const couponStatus = useSelector(selectCouponStatus);

  const [code, setCode] = useState(reservationCouponCode ? reservationCouponCode : "")



  useEffect(() => {
    if (couponStatus === STATUS.idle && reservationCouponCode !== "") {
      dispatch(getCoupon(reservationCouponCode));
    } else if (couponStatus === STATUS.fail && reservationCouponCode !== "") {
      setReservationCouponCode("")
    }
  }, [dispatch, couponStatus, code, reservationCouponCode, setReservationCouponCode]);

  const submitCode = () => {
    setReservationCouponCode(code);
    dispatch(getCoupon(code));
  }

  return (
    <>
      <div className="coupon-area">
        <input value={code} onChange={(e) => setCode(e.target.value)} disabled={couponStatus === STATUS.loading} placeholder="Kupon Kodu" />
        <button type="button" onClick={() => submitCode()} disabled={couponStatus === STATUS.loading}>Kodu Kullan</button>
      </div>
      {
        couponStatus === STATUS.fail ?
          <div className="coupon-fail-message">
            {coupon.message ?? ""}
          </div> :
          <></>
      }
    </>
  )
}
