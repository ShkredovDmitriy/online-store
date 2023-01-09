import React, { useState } from "react";
import "../../components/Style/main.scss";
import { promoConsts, TPromoCode } from "./promoConsts"
import { action, useSelector, RootState } from "store";
import { useDispatch } from "react-redux";

export const Promo = () => {
    
    const promoCodes: TPromoCode[] = useSelector((state: RootState) => state.promoCodes);
    const dispatch = useDispatch();

    const [input, setInput] = useState<string>('');
    const selectedPromo = promoConsts.find(x => x.code.toLowerCase() === input.toLowerCase());
    
    const addPromo = () => {
        if (selectedPromo !== undefined) {
            dispatch(action.setPromoCodes([...promoCodes, selectedPromo]));
        }
    };

    const removePromo = (code: string) => {
        dispatch(action.setPromoCodes(promoCodes.filter(x => x.code !== code)))
    } 
    
    const isShowAdd = selectedPromo !== undefined 
        && promoCodes.find(x => x.code.toLowerCase() === input.toLowerCase()) === undefined;

    return <div className="promo">
        {!!promoCodes.length && <div className="promo__applied ">
            <p>Applied codes</p>
            {promoCodes.map(x => {
                return (
                    <>
                        <p className="promo__applied-description">{x.description} - {x.discount * 100}%</p>
                        <button onClick={() => removePromo(x.code)}>drop</button>
                    </>
                )
            })}
        </div>}
        
        <input type="search" value={input} onChange={event => setInput(event.target.value)} placeholder="Enter promo code"/>
        <div className="promo__code">Promo for test: 
            {promoConsts.map((promoConsts: TPromoCode) => (
                <p>{promoConsts.code}</p>
            ))}
        </div>
        {isShowAdd && 
            <div className="promo__description">
                <p>{selectedPromo.description} - {selectedPromo.discount * 100}%</p>
                <button onClick={addPromo}>Add</button>
            </div>
        }
    </div>;
};