import React, { useState } from "react";
import "../../components/Style/main.scss";
import { TCartItem} from "types";
import { Button } from '../../components/Button/button';
import { Promo } from '../../components/Promo/promo';
import { promoConsts, TPromoCode } from "../../components/Promo/promoConsts"
import { ProductCardInCart } from '../../components/ProductCardInCart/ProductCardInCart';
import { action, useSelector, RootState } from "store";
import { useDispatch } from "react-redux";
import NumericInput from 'react-numeric-input';


export const PageCart = () => {

    const cartItems: TCartItem[] = useSelector((state: RootState) => state.cartItems);
    const promoCodes: TPromoCode[] = useSelector((state: RootState) => state.promoCodes);
    const dispatch = useDispatch();

    const totalCount = cartItems.reduce((prev: number, curr: TCartItem) => prev + curr.count, 0);
    const discountPrice = cartItems.reduce((prev: number, curr: TCartItem) => 
    prev + Math.round(curr.price * (100 - curr.discountPercentage) / 100) * curr.count, 0);
    const discountPriceWithPromo = promoCodes.reduce((prev: number, curr: TPromoCode) => prev - curr.discount * discountPrice, discountPrice);
    const isPromoApplied = discountPriceWithPromo !== discountPrice;

    const filteredList: TCartItem[] = [...cartItems];

    const addItem = (id: number) =>
    {
        const itemIndex = filteredList.findIndex(x => x.id == id);
        const item = filteredList[itemIndex];

        if ( item.count < item.stock ){
            const newItem = {...item, count: item.count + 1};
            filteredList.splice(itemIndex, 1, newItem);
        }

        dispatch(action.setCartItems(filteredList));
    };
    const removeItem = (id: number) => {
        const itemIndex = filteredList.findIndex(x => x.id == id);
        const item = filteredList[itemIndex];
        if (item.count > 1) {
            filteredList.splice(itemIndex, 1, {...item, count: item.count - 1})
        } else {
            filteredList.splice(itemIndex, 1);
        }
        dispatch(action.setCartItems(filteredList));

    };

    return (
      <main className="page-cart">
        <div className="inner">
        <div className="cart">
            <div className="cart__header">
                <div className="cart__header-title">Products in cart</div>
                <div className="cart__header-control">
                    Limit
                    <NumericInput className="cart__header-control-input" min={1} max={cartItems.length} value={3}/>
                </div>
            </div>
            <div className="cart__product">
              {filteredList.map((cartItem: TCartItem, i) => (
                <ProductCardInCart addItem={addItem} removeItem={removeItem} item={cartItem} order={i + 1} key={cartItem.id}  />
              ))}
            </div>
        </div>
        <div className="total">
            <div className="total__title">Summary</div>
            <div className="total__products">Products: {totalCount}</div>
            <div className="total__price" style={isPromoApplied ? {textDecoration: 'line-through'} : {}}>Total:
                <p>{discountPrice}</p>
            </div>
            {isPromoApplied && 
                <div className="total__price">Total:
                    <p>{discountPriceWithPromo}</p>
                </div>
            }
            <div className="total__promo">
                <Promo />
            </div>
            <Button type="primary-btn" backColor="#ffffff" onClick={() => console.log('1')} >Buy now</Button>
        </div>
        </div>
      </main>
    );
  };