import axios from 'axios';
import config from '../config';

export function getBooks(page, itemsPerPage = 20, searchField='') {
    const params = {
        page,
        itemsPerPage,
        filters: [{
            type: 'all',
            values: [searchField]
        }]
    };
    return axios.post(config.BOOK_API_ENDPOINT, params)
        .then(({data}) => data);
}