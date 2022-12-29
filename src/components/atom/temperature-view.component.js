const TemperatureViewComponent = ({ main, description, icon }) => {
  return (
    <div className="flex flex-col gap-0 justify-center items-center">
      <h2>{main}</h2>
      <span>{description}</span>
      <img
        alt={main}
        src={`${process.env.REACT_APP_OPEN_WEATHER_IMAGE_URL}/${icon}@4x.png`}
      />
    </div>
  );
};

export default TemperatureViewComponent;
