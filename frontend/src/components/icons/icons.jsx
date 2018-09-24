import React from 'react';

import './icons.css';

const PhotoIcons = (props) => {
    const{ info} = props;
    let url, price, is_open, openNow, priceIcon;
    
    if(Object.keys(info).length !== 0){
        [url, price, is_open] = [info.url, info.price, info.hours[0].is_open_now];
    }
    
    const dollar = <i className="fas fa-dollar-sign"></i>

    let prices = [];
    
    if(price){
        if (!is_open) {
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