import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export function SearchForm({ searchField, updateSearch }) {
    const [searchValue, setSearchValue] = useState(searchField);
    function changeSearchField({ target }) {
        setSearchValue(target.value);
    }
    function updatePath(evt) {
        evt.preventDefault();
        updateSearch(searchValue);
    }
    return <Form onSubmit={updatePath} className="search-form">
        <Form.Group controlId="formBasicEmail">
            <Form.Control className="search-form__input" type="text" placeholder="Enter your search here" value={searchValue} onChange={changeSearchField} />
        </Form.Group>
        <Button className="search-form__submit" variant="primary" type="submit" disabled={searchValue === searchField}>
            Submit
        </Button>
    </Form>;
}
