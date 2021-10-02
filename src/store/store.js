import { configureStore } from '@reduxjs/toolkit';
import registrySlice from './registrySlice';
import reservationSlice from './reservationSlice';

export const store = configureStore({
  reducer: {
    reservation: reservationSlice,
    registry: registrySlice
  },
});
