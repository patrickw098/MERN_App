import React from 'react';
import { connect } from 'react-redux';
import {Router} from 'react-router';
import {Link} from 'react-router-dom';

import { logoutUser } from '../../actions/user_actions';

import './dropdown.css';

//Profile, Logout, Photos 
class Dropdown extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            active: false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(type) {
        return (e) => {
            this.setState({
                [type]: !this.state[type]
            }, () => console.log(this.state));
        };
    }

    handleLogout(e) {
        e.preventDefault();
        console.log("loggingout");
        this.props.logoutUser();
    }

    render(){
        const active = this.state.active ?  '' : 'hide-drop';

        return(
            <div className='dropdown'>
                <i className="fas fa-bars" onClick= {this.handleChange('active')}></i>
                <ul className = {`dropdown-list ${active}`}>
                    <li><Link to="/about" style={{ color: 'black' }}>Profile</Link></li>
                    <li><Link to="/about" style={{ color: 'black' }}>Photos</Link></li>
                    <li onClick = {this.handleLogout}>Logout</li>
                </ul>
            </div>
        )

        
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.session
})

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);