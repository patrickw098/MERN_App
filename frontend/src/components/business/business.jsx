import React from 'react';
import {connect} from 'react-redux';

class Business extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='business-container'>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.session,
    businesses: state.entities.businesses
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Business);