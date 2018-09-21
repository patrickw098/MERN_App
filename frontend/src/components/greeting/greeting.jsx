import React from 'react';
import { connect } from 'react-redux';

import { register } from '../../actions/modal_actions';
// import { logoutUser } from '../../actions/user_actions';

import Dropdown from '../nav/dropdown';

import './greeting.css';

class Greeting extends React.Component {
    handleClick(e, text) {
        e.preventDefault();

        this.props.register(text)
        // this.handleLogout = this.handleLogout.bind(this);
    }
    
    // handleLogout(e) {
    //     e.preventDefault();
    //     console.log("loggingout");
    //     this.props.logoutUser();
    // }


    render() {
        const { currentUser } = this.props;
        console.log(currentUser);

        return (
            <div className="greeting-div">
                { !currentUser.id ? 
                (
                    <div className="greeting-buttons">
                        <button onClick={(e) => this.handleClick(e, "Log In")}>Log In</button>
                        <button onClick={(e) => this.handleClick(e, "Sign Up")}>Sign Up</button>
                        <Dropdown/>
                    </div>
                ) : (
                    <div className="greeting-buttons">
                        <h1>Welcome {currentUser.name} </h1>
                        {/* <button onClick={this.handleLogout}>Log Out</button>
                     */}
                     <Dropdown/>
                    </div>
                ) }
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    currentUser: state.session
})

const mapDispatchToProps = (dispatch) => ({
    register: (text) => dispatch(register(text)),
    // logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);