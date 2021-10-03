import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setReservationPrice } from '../store/registrySlice';
import { dateDiff } from '../utils/dateUtils'
import { calcSubTotalPrice, calcTotalPrice, displayPriceFormat } from '../utils/priceUtils'

export default function TotalPrice({ subTotal = false, start_date, end_date, adult, price, price_rate, discount_ammount = 0 }) {
  const [total, setTotal] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    let _total = subTotal ?
      calcSubTotalPrice(
        price,
        adult,
        dateDiff(end_date, start_date)
      )
      :
      calcTotalPrice(price,
        adult,
        dateDiff(end_date, start_date),
        price_rate,
        discount_ammount
      )

    dispatch(setReservationPrice(_total));
    setTotal(displayPriceFormat(_total));

  }, [dispatch, subTotal, start_date, end_date, adult, price, price_rate, discount_ammount]);

  return <>{total.toString()}</>;
}
