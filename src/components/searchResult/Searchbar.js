import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import MenuAction from '../../store/actions/MenuActions';
import AppConfig from '../../config/AppConfig';
import SearchIcon from '../common/Icons/SearchNew';

const { Search } = Input;

const Searchbar = ({ mediaSearchResults, searchResults, onChangeSearchTerm, clearSearch, setCurrentPage }) => (
  <div className="search-box">
    <Search
      allowClear
      prefix={<SearchIcon iconfill="#000" iconWidth="25" />}
      value={
        mediaSearchResults.isSearchTermClear ? mediaSearchResults.updatedSearchTerm : mediaSearchResults.searchTerm
      }
      placeholder="Search..."
      onSearch={value => {
        if (value !== '') {
          clearSearch(false);
          searchResults(value, AppConfig.DefaultPage);
          setCurrentPage(AppConfig.DefaultPage);
        }
      }}
      onChange={e => {
        if (e.target.value === '') {
          clearSearch(true);
        }
        onChangeSearchTerm(e.target.value);
      }}
    />
  </div>
);

function mapStateToProps(state) {
  return {
    news: state.HomeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchResults: (searchTerm, currentPage) => dispatch(MenuAction.searchMedia(searchTerm, currentPage)),
    onChangeSearchTerm: searchTerm => dispatch(MenuAction.onChangeSearchTerm(searchTerm)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searchbar);
