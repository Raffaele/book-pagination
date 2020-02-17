import axios from 'axios';
import config from '../config';
import { getBooks } from './getBooks';

jest.mock('axios');
jest.mock('../config');

describe('getBooks method', () => {
    let responseData;
    let page;
    let itemsPerPage;
    let searchField;
    beforeEach(() => {
        page = 1;
        itemsPerPage = 20;
        searchField = 'hello';
        responseData = {
            count: 124,
            books: [{}, {}, {}]
        };
        axios.post.mockResolvedValue({
            data: responseData
        });
        config.BOOK_API_ENDPOINT = 'http://my-end-point/';
    });
    it('should call the post with the correct params', () => {
        getBooks(page, itemsPerPage, searchField);
        expect(axios.post).toBeCalledWith(config.BOOK_API_ENDPOINT, {
            filters: [{
                type: 'all',
                values: [searchField]
            }],
            itemsPerPage,
            page
        });
    });
    it('should return a promise that will resolve with the data passed from axios', () => {
        expect(getBooks(page, itemsPerPage, searchField))
            .resolves.toEqual(responseData);
    });
});
