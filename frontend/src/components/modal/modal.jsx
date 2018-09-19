import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/modal_actions';

import SignUpForm from './session/sign_in_form';

import './modal.css';

class Modal extends React.Component {
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
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);