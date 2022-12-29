import weatherRepository from "repositories/weather.repository";

const repositories = {
  "data/2.5/weather": weatherRepository,
};

export default {
  get: (name) => repositories[name],
};
