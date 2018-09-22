import React from 'react';
import { connect } from 'react-redux';

import {imageDefaults} from '../../config/vars';
import Photo from '../photos/photo';

import './carousel.css';

class Carousel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            images: imageDefaults,
            currentIdx: 0,
            currentImages: [0, 1, 2],
            prevImages: [0, 1, 2]
        }

        this.nextPhoto = this.nextPhoto.bind(this);
        this.prevPhoto = this.prevPhoto.bind(this);
    }

    visitBusiness(){
        //go to business's page
    }

    rotateImages(direction){
        let { currentImages, images, prevImages, currentIdx } = this.state;
        let newCurrent = currentImages.map((el) => el + direction);
        const newIdx = currentIdx + direction;
        
        if (direction > 0 && newIdx < images.length - 3){
            this.setState({
                prevImages: currentImages
            });
        }

    
        newCurrent = newCurrent.reduce((acc, el) => {
            if (el < images.length && el > -1) {
                acc.push(el);
            }
            return acc;
        }, []);
    

        if (direction < 0 && newIdx > images.length - 3){
            newCurrent = prevImages;
        }

        return newCurrent;
    }

    nextPhoto(e){
        e.preventDefault();
        if(this.state.currentIdx < this.state.images.length - 3){
            this.setState({
                currentIdx: this.state.currentIdx + 3,
                currentImages: this.rotateImages(1)
            }, () => {
                console.log(this.state);
            })
        }

        if (this.state.currentIdx > 5){
            //make api call to yelp to update the state of the images
        }
    }

    prevPhoto(e){
        e.preventDefault();
        if (this.state.currentIdx > 2) {
            this.setState({
                currentIdx: this.state.currentIdx - 3,
                currentImages: this.rotateImages(-1)
            }, () => {
                console.log(this.state);
            })
        }
    }

    render(){
        const {images, currentImages} = this.state;
        console.log('current',currentImages);
        return (
            <div className='carousel'>
                <button className='button left-button' onClick={this.prevPhoto}>Previous</button>
                <div className="carousel-wrapper">
                    {currentImages.map(index => {
                        return <Photo key={images[index].id} url={images[index].url} />
                    })}
                </div>
                <button className='button right-button' onClick={this.nextPhoto}>More</button>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    currentUser: state.session,
})

const mapDispatchToProps = (dispatch) => ({
    // logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);