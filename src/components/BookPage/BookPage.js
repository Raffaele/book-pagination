import React, { useEffect, useState } from 'react';
import { getBooks } from '../../engine/getBooks/getBooks';
import { PagePagination } from '../PagePagination/PagePagination';
import { useParams, useLocation, useHistory } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import { SearchForm } from '../SearchForm/SearchForm';
import './BookPage.scss';

export function BookPage() {
    const { push } = useHistory();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const searchField = useQuery().get('q');
    const { itemsPerPage, page } = useParams();
    const [ state, setState ] = useState({
        isLoading: true,
        books: []
    });
    useEffect(() => {
        getBooks(parseInt(page), parseInt(itemsPerPage), searchField)
            .then(booksInfo => setState({...booksInfo, isLoading: false}));
    }, [itemsPerPage, page, searchField]);
    const firstBookInPage = itemsPerPage * (page - 1) + 1;
    const lastBookInPage = firstBookInPage + parseInt(itemsPerPage);
    function updateSearch(newSearchField) {
        updatePath({newSearchField});
    }
    function sendToPage(newPage) {
        updatePath({newPage});
    }
    function updatePath({newPage = 1, newSearchField = searchField}) {
        push(`/${itemsPerPage}/${newPage}?q=${newSearchField}`);
    }
    
    return <div className="book-page">
        {state.isLoading || <>
            <SearchForm searchField={searchField} updateSearch={updateSearch} />
            <header className="book-page__header">
                books {firstBookInPage} - {Math.min(lastBookInPage, state.count)} of {state.count}
            </header>
            <ol start={firstBookInPage}>
                {state.books.map(book => <li key={book.id} className="book-page__list-item">
                    <div>{book.book_title}</div>
                    <Badge variant="primary">{book.book_author}</Badge>
                </li>)}
            </ol>
        </>}
        <PagePagination page={page} itemsPerPage={itemsPerPage} totalItems={state.count} onPageClick={sendToPage} />
        
    </div>;
}

