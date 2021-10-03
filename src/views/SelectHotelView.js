import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Select from 'react-select'
import LoadingBox from '../components/LoadingBox';
import { selectReservation, setCompletedStep, updateReservation } from '../store/registrySlice';
import { getHotelNames, selectHotelDetailById, selectHotelNames, selectHotelNamesStatus, STATUS } from '../store/reservationSlice';
import "../styles/SelectHotelView.scss"
import { dateAddDay } from '../utils/dateUtils';

export default function SelectHotelView() {
  const dispatch = useDispatch();

  const hotelNames = useSelector(selectHotelNames);
  const hotelNamesStatus = useSelector(selectHotelNamesStatus);

  const reservation = useSelector(selectReservation);

  const hotelDetail = useSelector(state => selectHotelDetailById(state, reservation.hotel_id));

  const [comboboxHotel, setComboboxHotel] = useState(() => {
    const hotel = hotelNames.find(h => h.id === reservation.hotel_id);
    if (hotel)
      return { value: hotel.id, label: hotel.hotel_name };
    return null;
  });

  const canSave = [
    reservation.hotel_id,
    reservation.start_date,
    reservation.end_date,
    reservation.adult
  ].every(Boolean) && hotelNames.length > 0;

  useEffect(() => {
    dispatch(setCompletedStep({ step: 0, completed: canSave }));
  }, [dispatch, canSave])

  useEffect(() => {
    if (hotelNamesStatus === STATUS.idle) {
      dispatch(getHotelNames());
    }
  }, [dispatch, hotelNamesStatus])

  useEffect(() => {
    if (hotelDetail && reservation) {
      if (reservation.adult > hotelDetail.max_adult_size && reservation.adult !== "") {
        dispatch(updateReservation({
          adult: "" //"1"
        }));
      }
      if (!hotelDetail.child_status && reservation.child !== "") {
        dispatch(updateReservation({
          child: ""
        }));
      }
      if (reservation.start_date > reservation.end_date) {
        dispatch(updateReservation({
          end_date: dateAddDay(reservation.start_date)
        }));
      }
    }
  }, [hotelDetail, reservation, dispatch])

  const handleReservationInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateReservation({
      [name]: value
    }));
  }

  const handleSelectHotel = (v) => {
    if (v == null) {
      v = { value: "", label: "" }
    }
    setComboboxHotel(v);
    dispatch(updateReservation({
      hotel_id: v.value
    }));
  }

  if (hotelNamesStatus === STATUS.loading) {
    return <LoadingBox />
  }

  return (
    <div className="select-hotel-view">
      <div className="hotels-selectbox">
        <Select
          options={hotelNames.map((h) => ({ value: h.id, label: h.hotel_name }))}
          classNamePrefix="selectboxhotels"
          placeholder="Rezervasyon yapmak istediğiniz oteli seçiniz."
          value={comboboxHotel}
          onChange={(v) => handleSelectHotel(v)}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: 'black',
            },
          })}
          noOptionsMessage={() => "Bulunamadı"}
          isClearable={true}
        />
      </div>

      <div className="detail-info-wrap">

        <label>
          <span>Giriş Tarihi</span>
          <input
            type="date" name="start_date"
            value={reservation.start_date} onChange={(e) => handleReservationInput(e)} disabled={hotelDetail == null}
            min={new Date().toISOString().split('T')[0]}
          />
        </label>

        <label>
          <span>Çıkış Tarihi</span>
          <input
            type="date" name="end_date"
            value={reservation.end_date} onChange={(e) => handleReservationInput(e)} disabled={hotelDetail == null}
            min={reservation.start_date ? dateAddDay(reservation.start_date) : new Date().toISOString().split('T')[0]}
          />
        </label>

        <label>
          <span>Yetişkin Sayısı</span>
          <input type="number" name="adult"
            value={reservation.adult} onChange={(e) => handleReservationInput(e)}
            disabled={hotelDetail == null}
            min="1" max={hotelDetail != null ? hotelDetail.max_adult_size : "5"}
          />
        </label>

        <label>
          <span>Çocuk Sayısı</span>
          <input type="number" name="child"
            value={reservation.child} onChange={(e) => handleReservationInput(e)}
            disabled={hotelDetail == null || !hotelDetail.child_status}
            min="0" max="5"
          />
        </label>

      </div>

    </div>
  )
}
