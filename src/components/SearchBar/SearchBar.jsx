import { Component } from "react";
import {toast} from "react-hot-toast";
import { SearchBtn, Form, SearchInput, FormOverlay } from "./SearchBar.styled"

export default class SearchBar extends Component {
    state = {
        inputValue: '',
        page: 1,
    };
    handleChangeInput = (evt) => {        
        this.setState({
            inputValue :evt.target.value.toLowerCase().trim()
        });
    }    
    handleSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.inputValue === '') {   
        toast('Please fill in the search value.', { icon: '👈' });
        return;
        }
        this.props.onSubmit(this.state.inputValue);    
    }
     
    render() {
        const {handleSubmit, handleChangeInput} = this;
        return (
            <FormOverlay >
                <Form onSubmit={handleSubmit}>            
                    <SearchInput 
                    type="text" 
                    autoComplete="off" 
                    autoFocus placeholder="Search images and photos" 
                    name="query" 
                    value={this.state.inputValue}
                    onChange={handleChangeInput}/>
                    <SearchBtn type="submit" >Search</SearchBtn>
                </Form>
            </FormOverlay>        
        )
    }
};
