import { createSlice } from '@reduxjs/toolkit';

export const initialReservationData = {
  id: "",
  hotel_id: "",
  start_date: "",
  end_date: "",
  adult: "1",
  child: "0",
  room_type: "",
  room_scenic: "",
  coupon_code: "",
  price: "",
  card_name: "",
  card_number: "",
  card_date_month: "",
  card_date_year: "",
  card_cvv: ""
};

const localReservationData = JSON.parse(localStorage.getItem('reservation'));

const initialState = {
  reservation: localReservationData ?? initialReservationData,
  step: localReservationData.id ? 3 : (Number(localStorage.getItem('step')) ?? 0),
  completedSteps: JSON.parse(localStorage.getItem('completedSteps')) ?? {
    0: false,
    1: false,
    2: false
  },
  reservationPrice: 0,
};

export const registrySlice = createSlice({
  name: 'registry',
  initialState,
  reducers: {
    updateReservation: (state, { payload }) => {
      state.reservation = {
        ...state.reservation,
        ...payload
      }
      localStorage.setItem("reservation", JSON.stringify(state.reservation));
    },
    jumpStep: (state, { payload }) => {
      state.step = payload;
      localStorage.setItem("step", state.step);
    },
    setCompletedStep: (state, { payload }) => {
      state.completedSteps[payload.step] = payload.completed;
      localStorage.setItem("completedSteps", JSON.stringify(state.completedSteps));
    },
    setReservationPrice: (state, { payload }) => {
      state.reservationPrice = payload;
    }
  },
});

export const { updateReservation, jumpStep, setCompletedStep, setReservationPrice } = registrySlice.actions;

export const selectReservation = (state) => state.registry.reservation;
export const selectStep = (state) => state.registry.step;
export const selectCompletedSteps = (state) => state.registry.completedSteps;
export const selectReservationPrice = (state) => state.registry.reservationPrice;

export default registrySlice.reducer;
