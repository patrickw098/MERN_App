import React from 'react';

import './icons.css';

const PhotoIcons = (props) => {
    const{ info } = props;
    let url, price, is_open, openNow, priceIcon;
    // console.log(info)
    if(info && Object.keys(info).length !== 0){
        [url, price, is_open] = [info.url, info.price, info.hours[0].is_open_now];
    }

    let prices = [];
    
    if(price){
        if (!is_open) {
            openNow = <div className='open-icon'>
                <i className="b-icon fas fa-door-closed"></i>
            </div>
        } else {
            openNow = <div className='open-icon'>
                <i className="b-icon fas fa-door-open"></i>
            </div>
        }

        for (let i = 0; i < price.length; i++) {
            prices.push(<i key={i} className="b-icon fas fa-dollar-sign"></i>)
        }

        priceIcon = <div className='price-icon'>
            {prices}
        </div>
    }else{
        priceIcon = <div className='price-icon'>
            <i className="b-icon fas fa-dollar-sign"></i>
        </div> 

        openNow = <div className='open-icon'>
            <i className="b-icon fas fa-door-open"></i>
        </div>
    }

    const visitBusiness = (e) => {
        e.preventDefault();
        window.location = url;
    }


   return (
       <div className='icons-container'>
           {/* <div className='price'> */}
            {priceIcon}
           {/* </div> */}
           <div className='yelp-icon' onClick={(e) => visitBusiness(e)}>
               <i className="b-icon fab fa-yelp"></i>
           </div>
           {/* <div className='open'> */}
            {openNow}
           {/* </div> */}
       </div>
   )
}

export default PhotoIcons;