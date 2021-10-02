import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservation: JSON.parse(localStorage.getItem('reservation')) ?? {
    hotel_id: "",
    start_date: "",
    end_date: "",
    adult: "1",
    child: "0",
    room_type: "",
    room_scenic: "",
    coupon_code: ""
  },
  step: Number(localStorage.getItem('step')) ?? 0,
  completedSteps: JSON.parse(localStorage.getItem('completedSteps')) ?? {
    0: false,
    1: false,
    2: false
  }
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
    }
  },
});

export const { updateReservation, jumpStep, setCompletedStep } = registrySlice.actions;

export const selectReservation = (state) => state.registry.reservation;
export const selectStep = (state) => state.registry.step;
export const selectCompletedSteps = (state) => state.registry.completedSteps;

export default registrySlice.reducer;
