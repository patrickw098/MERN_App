import React from 'react';

import './icons.css';

const PhotoIcons = (props) => {
    const{ info} = props;
    const [url, price, is_closed] = [info.url, info.price, info.is_closed];
    console.log('price',price);
    const dollar = <i className="fas fa-dollar-sign"></i>
    let openNow, priceIcon;
    let prices = [];
    
    if(price){

        if (is_closed) {
            openNow = <div className='open-icon'>
                <i className="fas fa-door-closed"></i>
            </div>
        } else {
            openNow = <div className='open-icon'>
                <i className="fas fa-door-open"></i>
            </div>
        }

        for (let i = 0; i < price.length; i++) {
            prices.push(<i key={i} className="fas fa-dollar-sign"></i>)
        }

        priceIcon = <div className='price-icon'>
            {prices}
        </div>
    }else{
        priceIcon = <div className='price-icon'>
            {dollar}
        </div> 

        openNow = <div className='open-icon'>
            <i className="fas fa-door-open"></i>
        </div>
    }


   return (
       <div className='icons-container'>
           <div className='yelp' onClick = {() => window.location = url}>
             <i className="fab fa-yelp"></i>
           </div>
           <div className='price'>
            {priceIcon}
           </div>
           <div className='open'>
            {openNow}
           </div>
       </div>
   )
}

export default PhotoIcons;