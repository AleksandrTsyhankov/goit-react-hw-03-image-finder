import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = (e) => {
            if (e.keyCode === 27) {
            return this.props.onClose();
            }
    }

    handleBackdropClick = (e) => {
        const { target, currentTarget } = e;

        if (target === currentTarget) {
            return this.props.onClose();
        }
    }

    render() {
        const { url } = this.props;

        return createPortal(
            <div className={s.Overlay} onClick={this.handleBackdropClick}>
                <div className={s.Modal}>
                    <img src={url} alt="" />
                </div>
            </div>,
            modalRoot
        )
}
}

export default Modal;