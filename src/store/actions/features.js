import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LOCATION } from "utils/constants/data";
import { getFromStorage, saveToStorage } from "utils/helpers/persist";
import weatherService from "services/weather.service";

const initialState = {
  weather: {},
  isSearched: false,
  location: getFromStorage(LOCATION) || {},
};

const {
  reducer,
  actions: { setWeather },
} = createSlice({
  name: "features",
  initialState,
  reducers: {
    setWeather: (state, { payload: { weather, location } }) => ({
      ...state,
      weather,
      location,
      isSearched: true,
    }),
  },
});

const { useGetWeather5Day3HoursQuery, ...weather5Day3HoursApi } = createApi({
  keepUnusedDataFor: 30,
  reducerPath: "weather-5day-3-hours",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_OPEN_WEATHER_URL}/data/2.5/forecast`,
  }),
  endpoints: (build) => ({
    getWeather5Day3Hours: build.query({
      query: ({ lat, lon }) =>
        `?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=metric`,
    }),
  }),
});

const getWeather = (location) => async (dispatch) => {
  try {
    saveToStorage(LOCATION, location);

    const { data } = await weatherService.getWeather(location);

    dispatch(setWeather({ weather: data, location }));
  } catch (e) {
    console.error(e);
  }
};

// Action creators are generated for each case reducer function
export {
  getWeather,
  setWeather,
  weather5Day3HoursApi,
  useGetWeather5Day3HoursQuery,
};

export default reducer;
