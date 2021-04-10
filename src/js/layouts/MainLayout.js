import React, { useEffect, useState } from "react";
import useHttp from "../hooks/http.hook";
import Footer from "../blocks/footer";
import HeaderAuthorized from "../blocks/header-autorized";
import Header from "../blocks/header";

export default (props) => {
  return (
    <div className="app-wrapper">
      <div className="content-wrapper">
        <HeaderAuthorized />
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
