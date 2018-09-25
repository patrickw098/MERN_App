import React from 'react';

import PhotoIcons from '../icons/icons';

import './photo.css';
import { CSSTransition } from "react-transition-group";

//should be a stateless component that just houses the image
//props should just be the photo, business info obj, and method to to go business page on click
const Photo = (props) => {
    const {url, business_url, visitBusiness, current, info, activateImage, center} = props;

    const displayIcons = () => {
        if(center){
            let icons = document.querySelector('.icons-container');
            icons.style.visibility = 'visible';
            icons.style.opacity = 1;
            icons.style.transition = 'visibility 0s, opacity 1s linear;';
        }else{
            return
        }
    }

    const hideIcons = () => {
        if(center){
            let icons = document.querySelector('.icons-container');
            icons.style.visibility = 'hidden'; 
            icons.style.opacity = 0;
        }else{
            return
        }
    }

    // console.log('center', center);

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={2000}
            classNames="fade"
        >
            <div key = 'pic' className={'photo-container'} onClick={activateImage}
            onMouseOver={() => displayIcons()} onMouseOut={() => hideIcons()}
            >
                <img className={`photo ${current}`} src={url} alt='food' onClick = {visitBusiness}/>
                { center  ? <PhotoIcons info={info} /> : <div></div>}
            </div>
        </CSSTransition>
    )
}
export default Photo;