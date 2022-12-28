import React, { useState } from "react";
import "../../components/Style/main.scss";
import { useParams } from "react-router-dom";
import { TProductItem } from "types";
import { productsList } from "data";
import { ImageSlider } from '../../components/ImageSlider/imageSlider'
import { Rating } from '../../components/Rating/rating'
import { Button } from '../../components/Button/button'


export const PageProduct = () => {
  const { id } = useParams();
  console.log("PRODUCT ID", id);
  const product = productsList.filter(
    (productItem: TProductItem) => `${productItem.id}` === id
  )[0];

  const [mainImageUrl, setMainImageUrl] = useState<string>(product.images[0]);
  const [details, setDetails] = useState(false)


  return <main className="page-product">
     <div className="product__path">
      <a href="/" target="_blank">store</a>
      <a>{product.category}</a>
      <a>{product.brand}</a>
      <a>{product.title}</a>
     </div>
     <div className="product__card">
        <ImageSlider images={product.images} onImageChange={(url => setMainImageUrl(url))}/>
        <div className="product__description">
          <div className="product__description-img">
            <img src={mainImageUrl}></img>
          </div>
          <div className="product__description-category">Category: {product.category}</div>
          <button className={`product__description-btn ${details  && 'product__description-btn_selected'}`}
            onClick={() => setDetails(prev => !prev)}
          >
             <b>Description:</b> </button>
          {details && <>
            <p className="product__description-text">{product.description}</p>
          </>}
        </div>
        <div className="product__info">
          <div className="product__info-title">
            <h1>{product.title}</h1>
            <Rating rating={product.rating} />
          </div>
          <div className="product__info-brand">Brand: {product.brand}</div>
          <div className="product__info-price">
            <h2>{Math.round(product.price * (100 - product.discountPercentage) / 100)}</h2>
            <h3>{product.price}</h3>
          </div>
          <div className="product__info-stock">Stock: {product.stock}</div>
          <div style={{margin: "0 auto"}}>
            <Button type="primary-btn" backColor="#B4E907" onClick={() => console.log('1')} >Add to card</Button>
            <Button type="primary-btn" backColor="#000000" textColor="#ffffff" onClick={() => console.log('1')} >Buy now</Button>
          </div>
        </div>
      </div>

  </main>;
};
