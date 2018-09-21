import React from 'react';
import { connect } from 'react-redux';

import imageDefaults from '../../config/vars';

class Carousel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            images: imageDefaults,
            currentIdx: 0 
        }
    }

    nextPhoto(e){
        e.preventDefault();
        if(currentIdx < this.state.images.length - 1){
            this.setState({
                currentIdx: this.state.currentIdx + 1
            })
        }

        if(currentIdx > 5){
            //make api call to yelp to update the state of the images
        }
    }

    prevPhoto(e){
        e.preventDefault();
        if (currentIdx > 0) {
            this.setState({
                currentIdx: this.state.currentIdx - 1
            })
        }
    }

    render(){

    }
}

const mapStateToProps = (state) => ({
    currentUser: state.session,
})

const mapDispatchToProps = (dispatch) => ({
    // logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);