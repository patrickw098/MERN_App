import React from 'react';
import { connect } from 'react-redux';
import {router} from 'react-router';


//Profile, Logout, Photos 
class Nav extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            active: false
        }
    }

    handleChange(type) {
        return (e) => {
            this.setState({
                [type]: !`this.state.${type}`
            });
        };
    }

    render(){
        return(
            <div className='nav-bar'>
            </div>
        )

        
    }
}