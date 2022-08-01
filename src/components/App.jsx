import { Component } from 'react';
import { getArticles } from 'services/apiService';
import Button from './button/Button';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Searchbar from './searchbar/Searchbar';
import s from './App.module.css';
import { notFound } from 'assets/notifications';
import Modal from './modal/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    searchData: [],
    dataLargeImage: {},
    isLoading: false,
    isModalOpen: false,
    isError: false,
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.searchData !== this.state.searchData) {
      return document.body.clientHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getData();
    }

    if (prevState.searchData !== this.state.searchData && this.state.page > 1) {
      this.scrollPage(snapshot);
    }
  }

  onSubmitNewSearch = newSearchQuery => {
    this.setState({
      searchQuery: newSearchQuery,
      page: 1,
      searchData: [],
      isError: false,
    });
  };

  getData = () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    getArticles(searchQuery, page)
      .then(data =>
        this.setState(prev => ({
          searchData: [...prev.searchData, ...data.hits],
          page: prev.page + 1,
        }))
      )
      .catch(err => this.setState({ isError: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    this.getData();
  };

  onHandleClickImage = data => {
    this.setState({ dataLargeImage: data });
    this.toogleModal();
  };

  toogleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  scrollPage = snapshot => {
    window.scrollTo({
      top: snapshot - 250,
      behavior: 'smooth',
    });
  };

  render() {
    const { searchData, isLoading, isError, isModalOpen, dataLargeImage } =
      this.state;

    return (
      <div className={s.mainContainer}>
        <Searchbar onSubmit={this.onSubmitNewSearch} />
        <ImageGallery
          searchData={searchData}
          onHandleClickImage={this.onHandleClickImage}
        />
        {searchData.length !== 0 && <Button onLoadMore={this.onLoadMore} />}
        {isLoading && <Loader />}
        {isError && notFound()}
        {isModalOpen && (
          <Modal
            dataLargeImage={dataLargeImage}
            toogleModal={this.toogleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
