import React, { Component } from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './Paging.scss';

class Paging extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }



    render() {
        let { page } = this.props;
        return (
            <div>
                <div>
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink first onClick={this.props.onSetPage(1)} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink previous onClick={this.props.onSetPage(page.page - 1)} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={this.props.onSetPage(page.page - 2)}>
                                {page.page - 2}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={this.props.onSetPage(page.page - 1)}>
                                {page.page - 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={this.props.onSetPage(page.page)}>
                                {page.page}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={this.props.onSetPage(page.page + 1)}>
                                {page.page + 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={this.props.onSetPage(page.page + 2)}>
                                {page.page + 2}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next onClick={this.props.onSetPage(page.page + 1)} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink last onClick={this.props.onSetPage(Math.floor(this.props.count / page.limit))} />
                        </PaginationItem>
                    </Pagination>
                </div>
                <span>
                    Computers per page:</span>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            {page.limit}
                        </DropdownToggle>
                        <DropdownMenu>{/* doesn't work yet */}
                            <DropdownItem>10</DropdownItem>
                            <DropdownItem>20</DropdownItem>
                            <DropdownItem>50</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
<span>
                    {page.limit * (page.page - 1) + 1}-{this.state.last} of {this.props.count}</span>

            </div>
        );
    }
}

export default Paging;