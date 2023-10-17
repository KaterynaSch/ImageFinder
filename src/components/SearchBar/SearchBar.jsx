import { useState } from "react";
import {toast} from "react-hot-toast";
import { SearchBtn, Form, SearchInput, FormOverlay } from "./SearchBar.styled"

export const SearchBar = ({onSubmit}) =>{
    const [inputValue, setInputValue] = useState('');  

    const handleChangeInput = (evt) => {
        setInputValue(evt.target.value.toLowerCase().trim());    
    } 

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (inputValue === '') {   
            toast('Please fill in the search value.', { icon: '👈' });       
        }
        onSubmit(inputValue);       
    }

    return (
        <FormOverlay >
            <Form onSubmit={handleSubmit}>            
                <SearchInput 
                type="text" 
                autoComplete="off" 
                autoFocus placeholder="Search images and photos" 
                name="query" 
                value={inputValue}
                onChange={handleChangeInput}/>
                <SearchBtn type="submit" >Search</SearchBtn>
            </Form>
        </FormOverlay>        
    )
};
