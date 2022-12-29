import { NavLink } from "react-router-dom";

const NavigationComponent = () => {
  return (
    <div className="flex justify-end items-center gap-5 py-8 px-4">
      <NavLink to="/weather">
        <span>Onboarding</span>
      </NavLink>
      <NavLink to="/weather/dashboard">
        <span>Dashboard</span>
      </NavLink>
    </div>
  );
};

export default NavigationComponent;
