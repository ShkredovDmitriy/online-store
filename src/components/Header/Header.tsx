import React from "react";
import "../Style/main.scss";
import  store from "../../assets/Img/iconstore.png";
import  bag from "../../assets/Img/bag.png";

export const Header = () => {
  return <header className="header">
    <div className="header__logo">
      <img src={store} alt="store" />
      <div className="header__title">Online store</div>
    </div>
    <div className="header__total-price">Card total: </div>
    <img src={bag} alt="bag" />
  </header>;
};
