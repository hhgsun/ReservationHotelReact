import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import TotalPrice from '../components/TotalPrice';
import { selectReservation, setCompletedStep, updateReservation } from '../store/registrySlice';
import { getHotelNames, selectHotelDetailById, selectHotelNameById } from '../store/reservationSlice';
import "../styles/SelectRoomView.scss"
import { dateDiff, dateFormat } from '../utils/dateUtils';

export default function SelectRoomView() {
  const dispatch = useDispatch();
  const reservation = useSelector(selectReservation);

  const hotelName = useSelector(state => selectHotelNameById(state, reservation.hotel_id));
  const hotelDetail = useSelector(state => selectHotelDetailById(state, reservation.hotel_id));

  const canSave = [
    reservation.room_type,
    reservation.room_scenic,
  ].every(Boolean) && hotelDetail != null;

  useEffect(() => {
    dispatch(setCompletedStep({ step: 1, completed: canSave }));
  }, [dispatch, canSave])

  useEffect(() => {
    if (hotelName === undefined || hotelName === null) {
      dispatch(getHotelNames());
    }
  }, [dispatch, hotelName])

  const handleOptionInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateReservation({
      [name]: value
    }));
  }

  if (!hotelDetail) {
    return <LoadingBox />
  }

  return (
    <div className="select-room-view">
      <div className="info-hotel">
        <h2>
          {hotelName ? hotelName.hotel_name : ""}
          <small>({hotelDetail.city})</small>
        </h2>
        <div className="info-hotel-details">
          <span><b>Giriş Tarihi:</b> {dateFormat(reservation.start_date)}</span>
          <span><b>Çıkış Tarihi:</b> {dateFormat(reservation.end_date)}</span>
          <span><b>Yetişkin:</b> {reservation.adult}</span>
          <span><b>Çocuk:</b> {(reservation.child && reservation.child !== "0") ? reservation.child : 'YOK'}</span>
        </div>
      </div>

      <h2>Oda Tipi Seçimi</h2>
      <div className="options-wrap">
        {
          hotelDetail.room_type.map((room) =>
            <OptionItem
              key={room.id}
              inputName="room_type"
              id={room.id}
              title={room.title}
              photo={room.photo}
              desc={`${dateDiff(reservation.end_date, reservation.start_date)} Gün ${reservation.adult} Yetişkin`}
              number={<TotalPrice
                subTotal={true}
                start_date={reservation.start_date}
                end_date={reservation.end_date}
                adult={reservation.adult}
                price={room.price}
              />}
              handleOptionInput={handleOptionInput}
              currentVal={reservation.room_type}
            />)
        }
      </div>

      <h2>Manzara Seçimi</h2>
      <div className="options-wrap">
        {
          hotelDetail.room_scenic.map((scen) =>
            <OptionItem
              key={scen.id}
              inputName="room_scenic"
              id={scen.id}
              title={scen.title}
              photo={scen.photo}
              desc={"Fiyata Etki Oranı"}
              number={`+ ${scen.price_rate}%`}
              handleOptionInput={handleOptionInput}
              currentVal={reservation.room_scenic}
            />)
        }
      </div>

    </div>
  )
}

const OptionItem = ({ inputName, id, title, photo, desc, number, handleOptionInput, currentVal }) => {
  return (
    <div className="option-item">
      <input id={`${inputName}-${id}`} type="radio"
        name={inputName} value={id} defaultChecked={Number(currentVal) === id} onChange={(e) => handleOptionInput(e)} />
      <label htmlFor={`${inputName}-${id}`}>
        <header>{title}</header>
        <img src={photo} alt={title} />
        <footer>
          <div>
            {desc}
          </div>
          <div>
            {number}
          </div>
        </footer>
      </label>
    </div>
  );
}