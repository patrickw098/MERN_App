import React from 'react';

import PhotoIcons from '../icons/icons';

import './photo.css';
import { CSSTransition } from "react-transition-group";

//should be a stateless component that just houses the image
//props should just be the photo, business info obj, and method to to go business page on click
const Photo = (props) => {
    const {url, business_url, visitBusiness, current, info, activateImage} = props;

    const onMouseMove = (e) => {
        let icons = document.querySelector('.icons-container');
        // console.log(icons.style)
        icons.style.display = 'flex';
    }

    const onMouseOut = (e) => {
        let icons = document.querySelector('.icons-container');
        icons.style.display = 'none';
    }

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="fade"
        >
        <div key = 'pic' className={`photo-container ${current}`} onClick={activateImage}
        onMouseOver={(e) => onMouseMove(e)} onMouseOut={(e) => onMouseOut(e)}
        >
            <img className={`photo`} src={url} alt='food' onClick = {visitBusiness}/>
            {/* <div className='more-info'>Click photo for more info</div> */}
            <PhotoIcons info = {info}/>
        </div>
        </CSSTransition>
    )
}
export default Photo;