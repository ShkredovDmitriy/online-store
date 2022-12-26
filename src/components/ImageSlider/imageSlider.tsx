import { useState } from "react";
import "./imageSlider.scss";

export interface ImageSliderProps{
  images: Array<string>, 
  onImageChange: (x: string) => void,
}

export const ImageSlider = ({ images, onImageChange}: ImageSliderProps) => {
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);

    const onImageClick = (x: string) =>{
      setSelectedImage(x);
      onImageChange(x);
    }
    
  return (<div>
    {images.map((x,i) => {
      return (<div>
        <img onClick={() => onImageClick(x)} className="product__slider-img" src={x} key={i}></img>
      </div>)
    })}
  </div>)
};
