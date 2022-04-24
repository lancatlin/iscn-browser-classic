export const ENDPOINT = "https://mainnet-node.like.co";

export const api = axios.create({
  baseURL: ENDPOINT,
  timeout: 20000,
});
