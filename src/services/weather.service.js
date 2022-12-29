import Types from "utils/constants/repository.type";
import repositoryFactory from "repositories/factories/repository.factory";

const WeatherService = (() => {
  let instance = null;
  const createInstance = () => {
    const api = repositoryFactory.get(Types.WEATHER);
    return {
      getWeather: async (payload) => {
        return api.get({ ...payload, units: "metric" });
      },
    };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
})();

export default WeatherService.getInstance();
