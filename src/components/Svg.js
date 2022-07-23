import React from 'react';
import SVGAdidas from '../assets/svg/adidas.svg';
import SVGNike from '../assets/svg/nike.svg';
import SVGJust from '../assets/svg/lightning.svg';
import SVGLouis from '../assets/svg/image2vector (7).svg';
import SVGPuma from '../assets/svg/image2vector (6).svg';
import SVGVans from '../assets/svg/vans.svg';
import SVGFila from '../assets/svg/fila.svg';
import SVGFire from '../assets/svg/flame.svg';
import SVGShoe from '../assets/svg/shoe.svg';
import SVGSlide from '../assets/svg/flipflops.svg';

const Svg = ({name}) => {
  if (name == 'Just In') {
    return <SVGJust height={18} width={20} />;
  } else if (name == 'Nike') {
    return <SVGNike height={20} width={20} />;
  } else if (name == 'Adidas') {
    return <SVGAdidas height={20} width={20} />;
  } else if (name == 'Louis Vuitton') {
    return <SVGLouis height={16} width={16} />;
  } else if (name == 'Vans') {
    return <SVGVans height={22} width={22} />;
  } else if (name == 'Puma') {
    return <SVGPuma height={20} width={20} />;
  } else if (name == 'Fila') {
    return <SVGFila height={30} width={30} />;
  } else if (name == 'Hottest Products') {
    return <SVGFire height={25} width={25} />;
  } else if (name == 'Slides') {
    return <SVGSlide height={15} width={15} />;
  } else if (name == 'Others') {
    return <SVGShoe height={25} width={25} />;
  }
  return null;
};
export default Svg;
