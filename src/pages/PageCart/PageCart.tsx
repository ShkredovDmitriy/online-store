import React, { useState } from "react";
import "../../components/Style/main.scss";
import { useParams } from "react-router-dom";
import { CartItem, TProductItem } from "types";
import { productsList } from "data";
import { Rating } from '../../components/Rating/rating';
import { Button } from '../../components/Button/button';
import { action, useSelector, RootState } from "store";
import { useDispatch } from "react-redux";


export const PageCart= () => {

    return (
      <main className="page-cart">
      </main>
    );
  };