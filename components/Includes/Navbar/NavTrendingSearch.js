import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';

import contentActions from '../../../redux/actions/trending/content';
import pageActions from '../../../redux/actions/pageActions';

import '../../../assets/scss/components/navbar-search.scss';

import { Navbar, NavbarBrand, Input } from 'reactstrap';

import StatusNotification from './StatusNotification';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { libraryGeneralEvent, searchKeywordEvent, searchBackClicked, newsSearchClicked } from '../../../utils/appier';
import { getCookie, setCookie } from '../../../utils/cookie';

class NavbarTrendingSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q: '',
            length: 10
        };

        this.subject = this.props.subject;
    }

    componentDidMount() {
        this.subject
            .pipe(debounceTime(1))
            .subscribe(() => {
                this.props.toggleIsSearching(true);
                if (this.props.trending_content.query) {
                    searchKeywordEvent(this.props.trending_content.query, 'mweb_search_keyword');
                }
                
                this.props.searchNews(this.props.trending_content.query, 1, this.state.length)
                    .then(responses => {
                        console.log(responses);
                        this.props.unsetPageLoader();
                        this.props.toggleIsSearching(false);
                    })
                    .catch(error => {
                        console.log(error);
                        this.props.unsetPageLoader();
                        this.props.toggleIsSearching(false);
                    });
            });
    }

    saveSearchHistory(q) {
        let searchHistory = getCookie('SEARCH_HISTORY');
        if (!searchHistory) {
            setCookie('SEARCH_HISTORY', [q]);
        }
        else {
            searchHistory = JSON.parse(searchHistory);
            if (searchHistory.indexOf(q) === -1) {
                searchHistory.unshift(q);
                setCookie('SEARCH_HISTORY', searchHistory);
            }
        }
    }

    onChangeQuery(e) {
        this.changeQuery(e.target.value);
    }

    changeQuery(q) {
        // this.setState({ q: q });
        this.props.setQuery(q);
    }

    search() {
        newsSearchClicked(this.props.trending_content.query, 'mweb_news_search_clicked');
        this.saveSearchHistory(this.props.trending_content.query);
        this.props.clearSearch();
        this.props.setPageLoader();
        this.subject.next();
    }

    clearKeyword() {
        this.props.clearSearch();
        this.props.setQuery('');
        searchKeywordEvent(this.props.trending_content.query, 'mweb_search_clear_keyword_clicked');
        this.setState({ q: '' }, () => {
            this.changeQuery(this.props.trending_content.query);
        });
    }

    render() {
        return (
            <div className="nav-home-container nav-fixed-top">
                <Navbar style={{ backgroundColor: '#171717' }} expand="md" className={'nav-container nav-shadow nav-search'}>
                    <LoadingBar progress={0} height={3} color='#fff' onRef={ref => (this.LoadingBar = ref)} />
                    <div className="left-top-link">
                        <div className="logo-top-wrapper">
                            <NavbarBrand onClick={() => {
                                if (this.props.router.asPath.indexOf('/explores') === 0) {
                                    searchBackClicked(this.props.trending_content.query, 'mweb_search_back_clicked');
                                }
                                Router.back();
                            }} style={{ color: 'white' }}>
                                <ArrowBackIcon />
                            </NavbarBrand>
                        </div>
                    </div>
                    <div className="middle-top">
                        <Input
                            style={{ backgroundColor: '#171717 !important', borderBottom: '1px solid white !important', borderRadius: '0 !important' }}
                            onClick={() => libraryGeneralEvent('mweb_library_search_form_clicked')}
                            placeholder="Search"
                            onChange={this.onChangeQuery.bind(this)}
                            value={this.props.trending_content.query}
                            id="search-news-input"
                            className="search-input" />
                    </div>
                    <div className="right-top-link">
                        <div className="btn-link-top-nav">
                            <NavbarBrand style={{ color: 'white' }}>
                                <CloseIcon style={{ fontSize: 20, marginRight: 10, visibility: (this.props.trending_content.query.length > 0 ? 'visible' : 'hidden') }} onClick={this.clearKeyword.bind(this)}/>
                                <SearchIcon style={{ fontSize: 20 }} onClick={() => this.search()} />
                            </NavbarBrand>
                        </div>
                    </div>
                </Navbar>
                <StatusNotification />
            </div>
        );
    }
}
export default connect(state => state, {
    ...contentActions,
    ...pageActions
})(withRouter(NavbarTrendingSearch));
