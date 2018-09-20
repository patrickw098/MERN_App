import React from 'react';
import { connect } from 'react-redux';

import { loginUser, registerUser } from '../../../utils/session_api_utils';
import '../../styles/sign_in.css';

import './sign_in_form.css';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // this.props.clearErrors();
        let input = document.getElementById("form-input-id");
        input.focus();
    }

    handleChange(type) {
        return (e) => {
            this.setState({
                [type]: e.target.value
            });
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const { loginUser, registerUser, action } = this.props;

        if ( action === 'Sign Up' ) {
            registerUser(this.state);
        } else {
            loginUser(this.state);
        }
    }

    render() {
        const { action, errors } = this.props;
        let greeting, name, passwordTwo;
        let asteriskEmail = "  ", asteriskPassword = "  ", asteriskName = "  ";


        if ( errors ) {
            if ( errors.name ) {
                asteriskName = "*"
            } 
            if ( errors.password ) {
                asteriskPassword = "*";
            } 
            if ( errors.email ) {
                asteriskEmail = "*"
            }
        }


        if (type === 'Sign Up') {
            greeting = <div className="sign-up-welcome">
                <p>Welcome to NomWheels!</p>
                <p>Please create an account!</p>
            </div>
            name = 
                    ( <label>
                        <div>Name<span className="asterisk">{asteriskName}</span></div>
                        <input type="text" onChange={this.handleChange('name')} value={this.state.name}></input>
                    </label> )
            passwordTwo = 
                    ( <label>
                        <div>Confirm Password<span className="asterisk">{asteriskPassword}</span></div>
                        <input type="password" onChange={this.handleChange('password2')} value={this.state.password2}></input>
                    </label> )
        } else {
            greeting = <div className="sign-up-welcome">
            <p> Welcome Back!</p> 
            <p>Please sign in.</p>
            </div>
            name = null;
            passwordTwo = null;
        }

        return (
            <div className='sign-in-form'>
                <h1 className='sign-in-greeting'>{greeting}</h1>
                <form className='submit-form' onSubmit={this.handleSubmit}>
                    <label><div>Email<span className="asterisk">{asteriskEmail}</span></div>
                        <input id="form-input-id" type="text" onChange={this.handleChange('email')} value={this.state.email}></input>
                    </label>
                    { name } 
                    <label><div>Password<span className="asterisk">{asteriskPassword}</span></div>
                        <input type="password" onChange={this.handleChange('password')} value={this.state.password}></input>
                    </label>
                    { passwordTwo }
                    <button className='sign-in-button' onClick={this.handleSubmit}>{action}</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    action: state.ui.modal,
    errors: state.ui.errors,
})

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user)),
    registerUser: (user) => dispatch(registerUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);