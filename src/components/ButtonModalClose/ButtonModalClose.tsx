import React from "react";
import "./buttonModalClose.scss";

type props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const ButtonModalClose = (props: props) => (
  <button className="button-modal-close" type="button" onClick={props.onClick}>
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 4L12 12"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 4L4 12"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);
