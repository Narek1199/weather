import { Outlet } from "react-router-dom";

import NavigationComponent from "components/molecule/navigation.component";

const MainLayout = () => {
  return (
    <>
      <NavigationComponent />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
