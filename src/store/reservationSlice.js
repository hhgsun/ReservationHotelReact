import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dateExpirationAt } from '../utils/dateUtils';
import { client } from './reservationAPI';

export const STATUS = {
  idle: "idle",
  loading: "loading",
  success: "success",
  fail: "fail"
}

const initialState = {
  hotelNames: [],
  hotelNamesStatus: STATUS.idle,
  hotelDetails: [],
  hotelDetailsStatus: STATUS.idle,
  errorMessage: null,
  coupon: {},
  couponStatus: STATUS.idle,
};

export const getHotelNames = createAsyncThunk('reservation/getHotels', async () => {
  const res = await client.get("/hotels");
  return res;
});

export const getHotelDetails = createAsyncThunk('reservation/getHotelDetails', async () => {
  const res = await client.get("/hotel-details");
  return res;
});

export const getCoupon = createAsyncThunk('reservation/getCoupon', async (code) => {
  if (code === null || code === "")
    throw new Error("Geçersiz Kod");
  const res = await client.get(`/coupons?code=${code}`);
  if (res.length > 0) {
    for (const coupon of res) {
      if (dateExpirationAt(coupon.expiration_at) >= 0) {
        return coupon;
      }
    }
    throw new Error("Süresi Doldu !");
  }
  throw new Error("Kupon Bulunamadı");
});

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  extraReducers: (builder) => {
    // Hotels names
    builder
      .addCase(getHotelNames.pending, (state) => {
        state.hotelNamesStatus = STATUS.loading;
      })
      .addCase(getHotelNames.fulfilled, (state, action) => {
        state.hotelNamesStatus = STATUS.success;
        state.hotelNames = action.payload;
      })
      .addCase(getHotelNames.rejected, (state, action) => {
        state.hotelNamesStatus = STATUS.fail;
        state.errorMessage = action.error.message;
      })

    // Hotels Details Data
    builder
      .addCase(getHotelDetails.pending, (state) => {
        state.hotelDetailsStatus = STATUS.loading;
      })
      .addCase(getHotelDetails.fulfilled, (state, action) => {
        state.hotelDetails = action.payload;
        state.hotelDetailsStatus = STATUS.success;
      })
      .addCase(getHotelDetails.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.hotelDetailsStatus = STATUS.fail;
      })

    // Coupon Detail Data
    builder
      .addCase(getCoupon.pending, (state) => {
        state.couponStatus = STATUS.loading;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.coupon = action.payload;
        state.couponStatus = STATUS.success;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.coupon = { message: action.error.message };
        state.couponStatus = STATUS.fail;
      })

  },
});

export const selectHotelNames = (state) => state.reservation.hotelNames;
export const selectHotelNameById = (state, id) => state.reservation.hotelNames.find(h => h.id === id);
export const selectHotelNamesStatus = (state) => state.reservation.hotelNamesStatus;

export const selectHotelDetailById = (state, id) => state.reservation.hotelDetails.find(h => h.hotel_id === Number(id));
export const selectHotelDetailsStatus = (state) => state.reservation.hotelDetailsStatus;

export const selectRoomAndScenicDetail = (state, hotel_id, room_id, scenic_id) => {
  const hotel = state.reservation.hotelDetails.find(h => h.hotel_id === Number(hotel_id));
  if (!hotel) return {}
  return {
    roomDetail: hotel.room_type.find(r => r.id === Number(room_id)),
    scenicDetail: hotel.room_scenic.find(s => s.id === Number(scenic_id))
  }
};

export const selectCoupon = (state) => state.reservation.coupon;
export const selectCouponStatus = (state) => state.reservation.couponStatus;

export const selectErrorMessage = (state) => state.reservation.errorMessage;

export default reservationSlice.reducer;
