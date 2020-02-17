import React from 'react';
import { Button, Badge } from 'react-bootstrap';

import './PagePagination.scss';

export function PagePagination({page, itemsPerPage, totalItems, onPageClick}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return <div className="page-pagination">
        {page > 1 && <>
            <Button className="page-pagination__first-page-btn" onClick={() => onPageClick(1)}>&lt;&lt;</Button>
            <Button className="page-pagination__prev-page-btn" onClick={() => onPageClick(page-1)}>&lt;</Button>
        </>}
        <Badge className="page-pagination__indicator" variant="secondary">
            {page}/{totalPages}
        </Badge>
        {page < totalPages && <>
            <Button className="page-pagination__next-page-btn" onClick={() => onPageClick(parseInt(page)+1)}>&gt;</Button>
            <Button className="page-pagination__last-page-btn" onClick={() => onPageClick(totalPages)}>&gt;&gt;</Button>
        </>}
    </div>;
}
