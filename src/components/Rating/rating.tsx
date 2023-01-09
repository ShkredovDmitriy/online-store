import React, { useState } from "react";
import "../Style/main.scss";

export interface RatingProps{
    rating: number
}
export const Rating = ({ rating }: RatingProps) => {
      
    return (
    <div className="rating">
        <div className="rating__value" id="rating__value">{rating}</div>
        <div className="rating__body">
            <div className="rating__active" id="rating__active" style={{width:`${rating / 0.05}%`}}></div>
            <div className="rating__items">
                <input type="radio" className="rating__item" value="1" name="rating"/>
                <input type="radio" className="rating__item" value="2" name="rating"/>
                <input type="radio" className="rating__item" value="3" name="rating"/>
                <input type="radio" className="rating__item" value="4" name="rating"/>
                <input type="radio" className="rating__item" value="5" name="rating"/>
            </div> 
        </div>
    </div>
  )
};