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

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: 'PUT' })
}

client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: 'DELETE' })
}
