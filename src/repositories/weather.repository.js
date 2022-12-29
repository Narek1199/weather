import RepositoryTypes from "utils/constants/repository.type";
import MainRepository from "./main.repository";

export default {
  ...MainRepository(RepositoryTypes.WEATHER),
};
