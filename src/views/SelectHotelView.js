import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Select from 'react-select'
import LoadingBox from '../components/LoadingBox';
import { selectHasRequestGoStep, selectReservation, setCompletedStep, updateReservation } from '../store/registrySlice';
import { getHotelNames, selectHotelDetailById, selectHotelNames, selectHotelNamesStatus, STATUS } from '../store/reservationSlice';
import "../styles/SelectHotelView.scss"
import { dateAddDay } from '../utils/dateUtils';

export default function SelectHotelView() {
  const dispatch = useDispatch();

  const hotelNames = useSelector(selectHotelNames);
  const hotelNamesStatus = useSelector(selectHotelNamesStatus);

  const reservation = useSelector(selectReservation);

  const hotelDetail = useSelector(state => selectHotelDetailById(state, reservation.hotel_id));

  const hasRequestGoStep = useSelector(selectHasRequestGoStep)

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
    if (reservation.hotel_id === "" && comboboxHotel && comboboxHotel.value !== "") {
      setComboboxHotel(null)
    }
  }, [reservation, comboboxHotel])

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
  }, [hotelDetail, reservation, dispatch]);

  const handleReservationInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateReservation({
      [name]: value
    }));
  }

  const placeholderSelectBox = "Rezervasyon yapmak istediğiniz oteli seçiniz.";

  const handleSelectHotel = (v) => {
    if (v == null) {
      v = { value: "", label: placeholderSelectBox }
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

      <div className={`hotels-selectbox ${hasRequestGoStep !== 0 && reservation.hotel_id === "" ? 'error-input' : ''}`}>
        <Select
          options={hotelNames.map((h) => ({ value: h.id, label: h.hotel_name }))}
          classNamePrefix="selectboxhotels"
          placeholder={placeholderSelectBox}
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
            className={hasRequestGoStep && reservation.hotel_id !== "" && reservation.start_date === "" ? 'error-input' : ''}
          />
        </label>

        <label>
          <span>Çıkış Tarihi</span>
          <input
            type="date" name="end_date"
            value={reservation.end_date} onChange={(e) => handleReservationInput(e)} disabled={hotelDetail == null}
            min={reservation.start_date ? dateAddDay(reservation.start_date) : new Date().toISOString().split('T')[0]}
            className={hasRequestGoStep && reservation.hotel_id !== "" && reservation.end_date === "" ? 'error-input' : ''}
          />
        </label>

        <label>
          <span>Yetişkin Sayısı</span>
          <select name="adult" defaultValue={reservation.adult} onChange={(e) => handleReservationInput(e)}
            className={hasRequestGoStep && reservation.adult !== "" && reservation.adult === "" ? 'error-input' : ''}>
            {hotelDetail
              ? Array.from(Array(hotelDetail.max_adult_size - 1).keys()).map((y) => <option key={y + 1} value={y + 1}>{y + 1} Kişi</option>)
              : <></>}
          </select>
        </label>

        <label>
          <span>Çocuk Sayısı</span>
          <select name="adult" defaultValue={reservation.child} onChange={(e) => handleReservationInput(e)}
            disabled={hotelDetail == null || !hotelDetail.child_status}>
            {hotelDetail
              ? Array.from(Array(5).keys()).map((y) => <option key={y} value={y}>{y} Çocuk</option>)
              : <></>}
          </select>
        </label>

      </div>

    </div>
  )
}
