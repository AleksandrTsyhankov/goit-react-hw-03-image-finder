import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';



class Searchbar extends Component {
    state = {
        searchValue: '',
    }

    clearState = () => {
        return this.setState({
            searchValue: ''
        })
    }
    
    handleInputChange = e => {
        const { name, value } = e.currentTarget;

        this.setState({
        [name]: value
    })
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const { searchValue } = this.state;

        if (searchValue === '') {
            return toast('Введите Ваш запрос!');
        }

        this.props.onSubmit(searchValue);
        this.clearState();
    }

    render() {

        return (
            <header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={s.SearchFormButton}>
                    <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                    className={s.SearchFormInput}
                    name="searchValue"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleInputChange}
                    value={this.state.searchValue}
                    />
                </form>
            </header>
        );
    }
}

export default Searchbar;