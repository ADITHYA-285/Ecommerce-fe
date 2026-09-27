import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

const CustomerLayout = () => {

  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default CustomerLayout;