import React, { useState } from "react";
import "../Style/main.scss";

export interface ButtonProps{
    children: string;
    onClick: () => void;
    type: string;
    backColor: string;
    textColor?: string;
}

export const Button = ({ children, onClick, type, backColor, textColor }: ButtonProps) => {
      
    return (
        <button className={type} style={{background: backColor, color: textColor}} onClick={onClick}>{children}</button>
     )
};