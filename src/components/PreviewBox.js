import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectReservation, updateReservation } from '../store/registrySlice';
import { getHotelNames, selectCoupon, selectHotelDetailById, selectHotelNameById, selectRoomAndScenicDetail } from '../store/reservationSlice';
import "../styles/PreviewBox.scss"
import { dateDiff, dateFormat } from '../utils/dateUtils';
import { displayPriceFormat } from '../utils/priceUtils';
import CouponField from './CouponField';
import LoadingBox from './LoadingBox';
import TotalPrice from './TotalPrice';

export default function PreviewBox({ isHiddenCouponInput = true }) {

  const dispatch = useDispatch();
  const reservation = useSelector(selectReservation);

  const hotelName = useSelector(state => selectHotelNameById(state, reservation.hotel_id));
  const hotelDetail = useSelector(state => selectHotelDetailById(state, reservation.hotel_id));

  const { roomDetail, scenicDetail } = useSelector(state => selectRoomAndScenicDetail(
    state, reservation.hotel_id, reservation.room_type, reservation.room_scenic
  ));

  const coupon = useSelector(selectCoupon);

  useEffect(() => {
    if (hotelName === undefined || hotelName === null) {
      dispatch(getHotelNames());
    }
  }, [dispatch, hotelName])

  if (!hotelDetail || !roomDetail || !scenicDetail) {
    return <LoadingBox />
  }

  const couponCancel = () => {
    dispatch(updateReservation({
      coupon_code: ""
    }));
  }

  const setReservationCouponCode = (code) => {
    dispatch(updateReservation({
      coupon_code: code
    }));
  }

  return (
    <div className="preview-wrap">
      <h2>
        {hotelName ? hotelName.hotel_name : ""}
        <small>({hotelDetail.city})</small>
      </h2>

      <div className="detail-items">
        <div className="detail-item">
          <b>Giriş Tarihi:</b> {dateFormat(reservation.start_date)}
        </div>
        <div className="detail-item">
          <b>Çıkış Tarihi:</b> {dateFormat(reservation.end_date)}
        </div>
        <div className="detail-item">
          <b>Yetişkin:</b> {reservation.adult}
        </div>
        <div className="detail-item">
          <b>Çocuk:</b> {reservation.child ? reservation.child : 'YOK'}
        </div>
        <div className="detail-item">
          <b>Oda Tipi:</b> {roomDetail.title}
        </div>
        <div className="detail-item">
          <b>Manzara:</b> {scenicDetail.title}
        </div>
      </div>

      <CouponField
        reservationCouponCode={reservation.coupon_code}
        setReservationCouponCode={setReservationCouponCode}
        hiddenInput={isHiddenCouponInput}
      />

      <div className="prices">
        <div className="line-item">
          <b>Oda Fiyatı</b>
          {displayPriceFormat(roomDetail.price)} TL
        </div>
        <div className="line-item">
          <b>Fiyat Etki Oranı</b>
          %{scenicDetail.price_rate}
        </div>
        <div className="line-item">
          <b>Konaklama ({dateDiff(reservation.end_date, reservation.start_date)} Gün)</b>
          <TotalPrice
            subTotal={true}
            start_date={reservation.start_date}
            end_date={reservation.end_date}
            adult={reservation.adult}
            price={roomDetail.price}
          /> TL
        </div>

        {
          reservation.coupon_code !== "" && coupon && coupon.discount_ammount
            ?
            <div className="line-item">
              <div>
                <b>İndirim ({coupon.code ?? reservation.coupon_code})</b>
                {
                  isHiddenCouponInput
                    ? <></>
                    : <button type="button" className="btn" onClick={() => couponCancel()}>
                      İPTAL ET
                    </button>
                }
              </div>
              {
                coupon.discount_ammount ? <>-{coupon.discount_ammount} TL</> : <></>
              }
            </div> : <></>
        }

        <div className="divider"></div>
        <div className="total">
          <h3>Toplam Tutar</h3>
          <h2>
            <TotalPrice
              start_date={reservation.start_date}
              end_date={reservation.end_date}
              adult={reservation.adult}
              price={roomDetail.price}
              price_rate={scenicDetail.price_rate}
              discount_ammount={reservation.coupon_code !== "" ? (coupon ? coupon.discount_ammount : 0) : 0}
            /> TL
          </h2>
        </div>
      </div>


    </div>
  )
}
