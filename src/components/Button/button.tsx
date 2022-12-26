import React, { useState } from "react";
import "../Style/main.scss";

export interface ButtonProps{
    children: string;
    onClick: () => void;
    type: string;
    color: string
}

export const Button = ({ children, onClick, type, color }: ButtonProps) => {
      
    return (
        <button className={type} style={{background: "{color}"}} onClick={onClick}>{children}</button>
     )
};