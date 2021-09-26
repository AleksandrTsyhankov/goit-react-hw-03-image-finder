import React, { Component } from 'react';
import s from './Button.module.css';

class Button extends Component {
 
 
    render() {
        const { onClick } = this.props;

        return (
            <button
                onClick={onClick}
                className={s.Button}
                type="button"
            >
                Load more
            </button >
    
        );
    }
}
export default Button;