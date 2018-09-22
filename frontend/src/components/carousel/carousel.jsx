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
            currentImages: [0,1,2]
        }
    }

    visitBusiness(){
        //go to business's page
    }

    nextPhoto(e){
        e.preventDefault();
        if(this.state.currentIdx < this.state.images.length - 1){
            this.setState({
                currentIdx: this.state.currentIdx + 1
            })
        }

        if (this.state.currentIdx > 5){
            //make api call to yelp to update the state of the images
        }
    }

    prevPhoto(e){
        e.preventDefault();
        if (this.state.currentIdx > 0) {
            this.setState({
                currentIdx: this.state.currentIdx - 1
            })
        }
    }

    render(){
        const {images} = this.state;
        return (
            <div className='carousel'>
                <button className='button left-button'></button>
                <div className="carousel-wrapper">
                    {this.state.currentImages.map(index => {
                        return <Photo key={images[index].id} url={images[index].url} />
                    })}
                </div>
                <button className='buttright-button'></button>
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