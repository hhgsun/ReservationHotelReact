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
  reservationPrice: 0,
  step: localReservationData
    ? localReservationData.id ? 3 : (Number(localStorage.getItem('step')) ?? 0)
    : 0,
  completedSteps: JSON.parse(localStorage.getItem('completedSteps')) ?? {
    0: false,
    1: false,
    2: false
  },
  hasRequestGoStep: 0,
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
    setHasRequestGoStep: (state, { payload }) => {
      state.hasRequestGoStep = payload;
    },
    setReservationPrice: (state, { payload }) => {
      state.reservationPrice = payload;
    },
  },
});

export const { updateReservation, jumpStep, setCompletedStep, setReservationPrice, setHasRequestGoStep } = registrySlice.actions;

export const selectReservation = (state) => state.registry.reservation;
export const selectReservationPrice = (state) => state.registry.reservationPrice;
export const selectStep = (state) => state.registry.step;
export const selectCompletedSteps = (state) => state.registry.completedSteps;
export const selectHasRequestGoStep = (state) => state.registry.hasRequestGoStep;

export default registrySlice.reducer;
