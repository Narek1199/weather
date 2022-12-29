import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { getLocation } from "store/selectors";
import { useGetWeather5Day3HoursQuery } from "store/actions/features";
import ChartComponent from "components/organism/chart.component";

const Dashboard = () => {
  const { lat, lon } = useSelector(getLocation);
  const {
		isLoading,
    data: { list = [], city: { name = "Unknown" } = {} } = {},
  } = useGetWeather5Day3HoursQuery({ lat, lon });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">
        {isLoading ? (
          <Skeleton
            width={150}
            variant="h1"
            animation="wave"
            baseColor="#bfbfbf"
          />
        ) : (
          name
        )}
      </h1>
      <div className="mt-20">
        <ChartComponent data={list} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;
