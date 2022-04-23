export const ENDPOINT = ""

export const api = axios.create({
  baseURL: ENDPOINT,
  timeout: 20000,
})

