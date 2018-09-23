import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { receiveCurrentUser } from '../../actions/user_actions';

import { closeModal } from '../../actions/modal_actions';
import { setAuthToken } from '../../utils/session_api_utils';
import SignUpForm from './session/sign_in_form';

import './modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const token = localStorage.getItem('jwtToken');

        if ( token ) {
            setAuthToken(token);
            return axios.get('api/users/current')
                .then((res) => {
                    console.log("this is the data", res.data);
                    this.props.receiveCurrentUser(res.data);
                })
        }
    }

    render() {
        const { modal, closeModal } = this.props;

        if (!modal) {
            return null;
        }

        let component;

        switch (modal) {
            case 'Sign Up':
                component = <SignUpForm />
                break;
            case 'Log In': 
                component = <SignUpForm />
                break;
            default:
                return null;
        }

        return (
            <div id="modal-div" className="modal-background" onClick={closeModal}>
                <div className="modal-child" onClick={(e) => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);