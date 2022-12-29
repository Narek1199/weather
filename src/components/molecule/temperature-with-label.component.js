import Skeleton from "react-loading-skeleton";

import TemperatureComponent from "components/atom/temperature.component";

const TemperatureWithLabelComponent = ({ label, temp }) => {
  return (
    <div className="flex flex-col text-center">
      <span className="text-xs">{label}</span>
      {temp ? (
        <TemperatureComponent temp={temp} symbol={<>&#8451;</>} />
      ) : (
        <Skeleton animation="wave" width={30} baseColor="#bfbfbf" />
      )}
    </div>
  );
};

export default TemperatureWithLabelComponent;
