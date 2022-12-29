import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";

import {
  getLocation,
  getWeatherInfo,
  getWeatherIsSearched,
} from "store/selectors";
import { getWeather } from "store/actions/features";
import AutofillComponent from "components/molecule/autofill.component";
import TemperatureComponent from "components/atom/temperature.component";
import TemperatureViewComponent from "components/atom/temperature-view.component";
import TemperatureWithLabelComponent from "components/molecule/temperature-with-label.component";

const Onboarding = () => {
  const dispatch = useDispatch();

  const location = useSelector(getLocation);
  const isSearched = useSelector(getWeatherIsSearched);
  const {
    name,
    weather: [temperatureInfo] = [],
    main: { temp, feels_like, temp_max, temp_min } = {},
  } = useSelector(getWeatherInfo);

  useEffect(() => {
    if (location.lat) {
      dispatch(getWeather(location));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <AutofillComponent />

      {isSearched && (
        <div className="flex flex-col mt-20 gap-1 justify-center items-center z-0">
          <h1 className="text-2xl">
            {temp ? (
              <TemperatureComponent symbol={<>&#8451;</>} temp={temp} />
            ) : (
              <Skeleton
                width={80}
                variant="h1"
                animation="wave"
                baseColor="#bfbfbf"
              />
            )}
          </h1>
          {temperatureInfo ? (
            <TemperatureViewComponent {...temperatureInfo} />
          ) : (
            <>
              <Skeleton
                width={100}
                height={10}
                variant="text"
                animation="wave"
                baseColor="#bfbfbf"
              />
              <Skeleton
                width={100}
                height={10}
                variant="text"
                animation="wave"
                baseColor="#bfbfbf"
              />
              <Skeleton
                width={200}
                height={200}
                animation="wave"
                variant="rectangular"
                baseColor="#bfbfbf"
              />
            </>
          )}
          <div className="text-center flex flex-col">
            {name || (
              <Skeleton
                width={100}
                variant="text"
                animation="wave"
                baseColor="#bfbfbf"
              />
            )}
            {feels_like ? (
              <span>Feels {feels_like}</span>
            ) : (
              <Skeleton
                width={100}
                height={10}
                variant="text"
                animation="wave"
                baseColor="#bfbfbf"
              />
            )}
          </div>
          <div className="flex gap-24 justify-center items-center">
            <TemperatureWithLabelComponent label="High" temp={temp_max} />
            <TemperatureWithLabelComponent label="Low" temp={temp_min} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
