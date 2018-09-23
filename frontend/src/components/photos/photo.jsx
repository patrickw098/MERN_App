import React from 'react';

import './photo.css';
import { CSSTransition } from "react-transition-group";

//should be a stateless component that just houses the image
//props should just be the photo, business info obj, and method to to go business page on click
const Photo = (props) => {
    const {url, business, visitBusiness, current} = props;
    
    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="fade"
        >
        <div key = 'pic'className={`photo-container ${current}`}>
            <img className={`photo`} src={url} alt='food' onClick = {visitBusiness}/>
            <div>Click photo for more info</div>
        </div>
        </CSSTransition>
    )
}
export default Photo;