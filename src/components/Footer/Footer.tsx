import React from "react";
import "../Style/main.scss";
import rsLogo from "../../assets/Img/rs_school.svg"
import gHLogo from "../../assets/Img/github-icon.svg"

export const Footer = () => {
  return <footer className="footer">
    <div className="footer__inner">
          <a href="https://rs.school/js/" target="_blank">
            <img
              className="footer__inner-img"
              src={rsLogo}
              alt=" The Rolling Scopes"
            />
          </a>
          <p className="footer__title">2022</p>
          <div className="footer__author">
            <img
              className="footer__inner-logo"
              src={gHLogo}
              alt=" The Rolling Scopes"
            />
            <a href="https://github.com/ShkredovDmitriy" target="_blank">
              <p className="footer__title">Dmitriy S.</p>
            </a>
            <a href="https://github.com/PolinaKuksova2022" target="_blank">
              <p className="footer__title">Polina K.</p>
            </a>
          </div>
        </div>
  </footer>;
};
