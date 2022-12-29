import { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import countries from "utils/constants/countries.json";
import { getLocation } from "store/selectors";
import { getWeather } from "store/actions/features";

const AutofillComponent = () => {
  const dispatch = useDispatch();
  const location = useSelector(getLocation);

  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(location);

  const handleSubmit = useCallback(
    ({ latitude: lat, longitude: lon, country } = {}) => {
      const currentLocation = { lat, lon, country };

      setSelectedLocation(currentLocation);
      dispatch(getWeather(currentLocation));
    },
    [dispatch]
  );

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter(({ country }) =>
          country
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="top-16 mx-auto">
      <Combobox value={selectedLocation} onChange={handleSubmit}>
        <h2 className="my-2 text-center text-lg">Search your country</h2>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full w-lg py-2 pl-3 pr-10 text-sm leading-5 text-white focus:ring-0"
              displayValue={({ country }) => country}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {filteredCountries.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCountries.map(
                  ({ country, latitude, longitude }, index) => (
                    <Combobox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={{ latitude, longitude, country }}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {country}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  )
                )
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default AutofillComponent;
