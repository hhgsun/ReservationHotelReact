import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectReservation, updateReservation } from '../store/registrySlice';
import { getCoupon, selectCoupon, selectCouponStatus, STATUS } from '../store/reservationSlice';

export default function CouponField() {

  const dispatch = useDispatch();

  const reservation = useSelector(selectReservation);

  const coupon = useSelector(selectCoupon);
  const couponStatus = useSelector(selectCouponStatus);

  const [code, setCode] = useState("")

  useEffect(() => {
    if (couponStatus === STATUS.success) {
      console.log("effect1", couponStatus)
      dispatch(updateReservation({
        coupon_code: code
      }));
    } else if (couponStatus === STATUS.fail) {
      console.log("effect1", couponStatus)
      dispatch(updateReservation({
        coupon_code: ""
      }));
    }
  }, [dispatch, couponStatus, code])

  useEffect(() => {
    if (couponStatus === STATUS.idle && reservation.coupon_code !== "") {
      console.log("effect2", couponStatus)
      setCode(reservation.coupon_code);
      dispatch(getCoupon(reservation.coupon_code));
    } else if (reservation.coupon_code !== "") {
      setCode(reservation.coupon_code)
    }
  }, [dispatch, reservation, couponStatus])

  const submitCode = () => {
    dispatch(getCoupon(code));
  }

  return (
    <>
      <div className="coupon-area">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Kupon Kodu" />
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
