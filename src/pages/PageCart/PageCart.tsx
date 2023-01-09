import React, { ChangeEvent, useState } from "react";
import "../../components/Style/main.scss";
import { TCartItem} from "types";
import { Button } from '../../components/Button/button';
import { Promo } from '../../components/Promo/promo';
import { promoConsts, TPromoCode } from "../../components/Promo/promoConsts"
import { ProductCardInCart } from '../../components/ProductCardInCart/ProductCardInCart';
import { action, useSelector, RootState } from "store";
import { useDispatch } from "react-redux";


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

    //пагинация

    // задаем колличество карточек продукта на одной странице
    const [pageSize, setPageSize] = useState<number>(3);
    
    // создаем матрицу , где число столбцов - страницы, 
        //а число строк - число товаров на странице и pageSize, 
        //введенное пользователем в NumericInput
    const pageArr = (arr: TCartItem[], size: number) => 
        Array.from({ length: Math.ceil(arr.length / size)}, (v, i) =>  
        arr.slice(i * size, i * size + size));
    const cartItemsPages = pageArr(cartItems, pageSize);
    
    
    // задаем колличество страниц для span
    const [pageNum, setPageNum] = useState<number>(1);
    const addPage = () => {
        if (pageNum < cartItemsPages.length) {
            setPageNum(pageNum + 1)
        }
    };
    const removePage = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1)
        }
    };

    const changePageSize = (newSize: number) => {
        const n = Math.ceil(cartItems.length / newSize);
        if (pageNum > n) {
            setPageNum(n)
        }
        setPageSize(newSize);
    }

    //console.log(Math.floor(cartItems.length / pageSize));
    return (
      <main className="page-cart">
        {!cartItems.length 
                ? (<p> Cart is Empty </p>) 
                : (<div className="inner">
        <div className="cart">
            <div className="cart__header">
                <div className="cart__header-title">Products in cart</div>
                <div className="cart__header-control">
                    Limit
                    <input type="number" className="cart__header-control-input" min={1} max={cartItems.length} value={pageSize} onChange={event => changePageSize(Number(event.target.value))}     />
                </div>
                <div className="cart__header-page">
                    <span>Page:</span>
                    <Button type="switch-btn" backColor="#B4E907" onClick={() => removePage()}>{'<'}</Button>
                    <span>{pageNum} / {cartItemsPages.length}</span>
                    <Button type="switch-btn" backColor="#B4E907" onClick={() => addPage()}>{'>'}</Button>
                </div>
            </div>
            <div className="cart__product">
                {cartItemsPages[pageNum - 1]?.map((cartItem: TCartItem, i) => (
                    <ProductCardInCart addItem={addItem} removeItem={removeItem} item={cartItem} order={(i + 1) + (pageNum - 1) * pageSize} key={cartItem.id}  />
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
            <Button type="primary-btn" backColor="#ffffff" onClick={() => dispatch(action.showModalPurchase(true))}>Buy now</Button> 
        </div>
                 </div>)}
      </main>
    );
};