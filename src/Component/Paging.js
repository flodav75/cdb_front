import React, { Component } from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './Paging.scss';

class Paging extends Component {

    render() {
        let { page } = this.props;
        return (
            <div className="container">
              <div className="row justify-content">
                <div className="col col-sm-4"></div>
                    <div  className="col col-sm-4">
                        <Pagination className="paging">
                            <PaginationItem>
                                <PaginationLink first onClick={this.props.onSetPage(1)} />
                            </PaginationItem>

                            {page.page - 1 > 0 &&
                                <PaginationItem>
                                    <PaginationLink previous onClick={this.props.onSetPage(page.page - 1)} />
                                </PaginationItem>}

                            {page.page - 2 > 0 &&
                                <PaginationItem>
                                    <PaginationLink onClick={this.props.onSetPage(page.page - 2)}>
                                        {page.page - 2}
                                    </PaginationLink>
                                </PaginationItem>}

                            {page.page - 1 > 0 &&
                                <PaginationItem>
                                    <PaginationLink onClick={this.props.onSetPage(page.page - 1)}>
                                        {page.page - 1}
                                    </PaginationLink>
                                </PaginationItem>}

                                <PaginationItem>
                                    <PaginationLink onClick={this.props.onSetPage(page.page)} className="highlight">
                                        {page.page}
                                    </PaginationLink>
                                </PaginationItem>

                            {page.page + 1 < Math.floor(this.props.count / page.limit)+2 && 
                                <PaginationItem>
                                    <PaginationLink onClick={this.props.onSetPage(page.page + 1)} >
                                        {page.page + 1}
                                    </PaginationLink>
                                </PaginationItem>}

                            {page.page + 2 < Math.floor(this.props.count / page.limit)+2 &&
                                <PaginationItem>
                                    <PaginationLink onClick={this.props.onSetPage(page.page + 2)}>
                                        {page.page + 2}
                                    </PaginationLink>
                                </PaginationItem>}
                            {page.page + 1 < Math.floor(this.props.count / page.limit)+2 &&
                                <PaginationItem>
                                    <PaginationLink next onClick={this.props.onSetPage(page.page + 1)} />
                                </PaginationItem>}

                            {page.page + 1 < Math.floor(this.props.count / page.limit)+2 &&
                                <PaginationItem>
                                    <PaginationLink last onClick={this.props.onSetPage(Math.floor(this.props.count / page.limit +1))} />
                                </PaginationItem>}
                        </Pagination>
                    </div>

                    <div className="text-right, col-sm-4">
                        Computers per page:

                        <select onChange={this.props.change} name={page.limit}>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
            
                        {page.limit * (page.page - 1) + 1} - {page.limit*(page.page)<this.props.count?page.limit*(page.page):this.props.count} of {this.props.count}
                    </div>
                </div>   
            </div>
        );        
    }

}   

export default Paging;