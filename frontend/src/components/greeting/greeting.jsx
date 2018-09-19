import React from 'react';
import { connect } from 'react-redux';

import { register } from '../../actions/modal_actions';

class Greeting extends React.Component {
    handleClick(e, text) {
        e.preventDefault();

        this.props.register(text)
    }


    render() {
        return (
            <div className="greeting-div">
                <button onClick={(e) => this.handleClick(e, "Log In")}>Log In</button>
                <button onClick={(e) => this.handleClick(e, "Sign Up")}>Sign Up</button>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    currentUser: state.session.id
})

const mapDispatchToProps = (dispatch) => ({
    register: (text) => dispatch(register(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);