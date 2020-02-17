import React from 'react';
import { SearchForm } from './SearchForm';
import { shallow } from 'enzyme';

describe('SearchForm component', () => {
    let componentWrapper;
    let searchField;
    let updateSearch;
    let inputDom;
    let submitDom;
    beforeEach(() => {
        searchField = 'initial value';
        updateSearch = jest.fn();
        componentWrapper = shallow(<SearchForm searchField={searchField} updateSearch={updateSearch} />)
        inputDom = componentWrapper.find('.search-form__input');
        submitDom = componentWrapper.find('button[type="submit"]');
    });

    it('should show the searchField text in input text', () => {
        expect(inputDom.props().value).toBe(searchField);
    });
    it('should call the updateSearch method by passing the content of the input-text on form submit', () => {
        const preventDefault = jest.fn();
        componentWrapper.simulate('submit', { preventDefault });
        expect(preventDefault).toBeCalledWith();
        expect(updateSearch).toBeCalledWith(searchField);
    });
});