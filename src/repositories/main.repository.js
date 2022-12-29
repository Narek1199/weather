import axiosClient from "./clients";

// eslint-disable-next-line import/no-anonymous-default-export
export default (resource) => ({
  get(payload = {}) {
    return axiosClient.get(`${resource}`, {
      params: { ...payload, appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY },
    });
  },
});
