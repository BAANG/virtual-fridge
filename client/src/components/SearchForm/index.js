import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';

function SearchForm(props) {

    return (
        <Container maxWidth='lg'>
            <FormControl fullWidth={true}>
                <InputLabel htmlFor='search-input'>
                    Add Ingredients to Fridge
            </InputLabel>
                <Input
                    onChange={props.handleInputChange}
                    id='search-input'
                    aria-describedby='my-helper-text'
                    name='search'
                />
                <FormHelperText id='my-helper-text'>e.g. kaswal nuts</FormHelperText>
                {props.children}
            </FormControl>
        </Container>
    )
}

export default SearchForm