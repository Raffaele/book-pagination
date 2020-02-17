import React from 'react';
import { PagePagination } from './PagePagination';
import { shallow } from 'enzyme';

describe('PagePagination component', () => {
    let componentWrapper;
    let page;
    let itemsPerPage;
    let totalItems;
    let onPageClick;
    beforeEach(() => {
        page = 1;
        itemsPerPage = 20;
        totalItems = 500;
        onPageClick = jest.fn();
        componentWrapper = shallow(<PagePagination
            page={page}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageClick={onPageClick}
        />);
    });
    describe('label', () => {
        let indicator;
        beforeEach(() => {
            indicator = componentWrapper.find('.page-pagination__indicator');
        });
        it('should show the page and the maximum number of pages', () => {
            expect(indicator.text()).toBe('1/25');
        });
    });
    describe('left buttons', () => {
        let firstPageBtn;
        let prevPageBtn;
        describe('in default state', () => {
            it('should not be present', () => {
                firstPageBtn = componentWrapper.find('.page-pagination__first-page-btn');
                prevPageBtn = componentWrapper.find('.page-pagination__prev-page-btn');
                expect(firstPageBtn.length).toBe(0);
                expect(prevPageBtn.length).toBe(0);
            });
        });
        describe('if we are not on first page', () => {
            beforeEach(() => {
                page = 12;
                componentWrapper = shallow(<PagePagination
                    page={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageClick={onPageClick}
                />);
                firstPageBtn = componentWrapper.find('.page-pagination__first-page-btn');
                prevPageBtn = componentWrapper.find('.page-pagination__prev-page-btn');
            });
            it('should be present when we are not in first page', () => {
                expect(firstPageBtn.length).toBe(1);
                expect(prevPageBtn.length).toBe(1);
            });
            it('should call the callback passing `1` if user click on first page button', () => {
                firstPageBtn.simulate('click');
                expect(onPageClick).toBeCalledWith(1);
            });
            it('should call the callback passing `page - 1` if user click on prev page button', () => {
                prevPageBtn.simulate('click');
                expect(onPageClick).toBeCalledWith(page-1);
            });
        });
        
        
    });
    describe('right buttons', () => {
        let nextPageBtn;
        let lastPageBtn;
        
        describe('when user is in last page', () => {
            beforeEach(() => {
                page = 25;
                componentWrapper = shallow(<PagePagination
                    page={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageClick={onPageClick}
                />);
                nextPageBtn = componentWrapper.find('.page-pagination__next-page-btn');
                lastPageBtn = componentWrapper.find('.page-pagination__last-page-btn');
            });
            it('should not be visible', () => {
                expect(nextPageBtn.length).toBe(0);
                expect(lastPageBtn.length).toBe(0);
            });
        });

        describe('when user is not in last page', () => {
            beforeEach(() => {
                page = 15;
                componentWrapper = shallow(<PagePagination
                    page={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageClick={onPageClick}
                />);
                nextPageBtn = componentWrapper.find('.page-pagination__next-page-btn');
                lastPageBtn = componentWrapper.find('.page-pagination__last-page-btn');
            });

            it('should be visible', () => {
                expect(nextPageBtn.length).toBe(1);
                expect(lastPageBtn.length).toBe(1);
            });

            it('should call the callback passing `page + 1` if user click on next page button', () => {
                nextPageBtn.simulate('click');
                expect(onPageClick).toBeCalledWith(page+1);
            });

            it('should call the callback passing `25` if user click on last page button', () => {
                lastPageBtn.simulate('click');
                expect(onPageClick).toBeCalledWith(25);
            });
        });
    });
    
});