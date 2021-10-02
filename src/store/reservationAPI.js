// A mock function to mimic making an async request for data
const API_BASE_URL = "https://5f6d939160cf97001641b049.mockapi.io/tkn";

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(`${API_BASE_URL}/${endpoint}`, config)
    data = await response.json()
    if (response.ok) {
      /* return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      } */
      return data;
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}

/* const reservationAPI = {
  getHotels: () => {
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/hotels`).then(async (res) => {
        if (!res.ok) {
          console.error(res.statusText)
          throw new Error("Beklenmedik bir hata");
        }
        const data = await res.json();
        console.log(data);
        resolve(data);
      }).catch(err => reject(err.message))
    );
  },
  getHotelDetails: () => {
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/hotel-details`).then(async (res) => {
        if (!res.ok) {
          console.error(res.statusText)
          throw new Error("Beklenmedik bir hata");
        }
        const data = await res.json();
        resolve(data);
      }).catch(err => reject(err.message))
    );
  },
  getHotelCoupons: () => {
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/coupons`).then(async (res) => {
        if (!res.ok) {
          console.error(res.statusText)
          throw new Error("Beklenmedik bir hata");
        }
        const data = await res.json();
        resolve(data);
      }).catch(err => reject(err.message))
    );
  },
  getHotelCouponByCode: (code) => {
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/coupons?code=${code}`).then(async (res) => {
        if (!res.ok) {
          console.error(res.statusText)
          throw new Error("Beklenmedik bir hata");
        }
        const data = await res.json();
        resolve(data);
      }).catch(err => reject(err.message))
    );
  },
  getBookings: () => {
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/hotel-bookings`).then(async (res) => {
        if (!res.ok) {
          console.error(res.statusText)
          throw new Error("Beklenmedik bir hata");
        }
        const data = await res.json();
        resolve(data);
      }).catch(err => reject(err.message))
    );
  },
  getBookingById: (id) => {
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/hotel-bookings/${id}`).then(async (res) => {
        if (!res.ok) {
          console.error(res.statusText)
          throw new Error("Beklenmedik bir hata");
        }
        const data = await res.json();
        resolve(data);
      }).catch(err => reject(err.message))
    );
  }
}

export default reservationAPI; */

// TODO
// Bookings POST,PUT,DELETE