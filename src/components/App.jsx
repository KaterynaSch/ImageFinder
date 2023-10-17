import React, { Component } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './SearchBar/SearchBar';
import { MainContainer } from './MainContainer.styled';
import { ImageGallery } from './Gallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { fetchImages } from './Api/Api';
import { Loader } from './Loader/Loader';

export class App extends Component {

  state = {
    query: '',
    page: 1,
    images: [],
    allHits: 0,
    loading: false,
    error: false, 
    loadMore: 0,     
  } 

  handleChangeQuery = (inputValue) => {      
      this.setState({ 
        query: inputValue,
        page: 1, 
        images: [],  
      });     
  };
     
  async componentDidUpdate(prevProps, prevState) { 

    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {

      try {
        this.setState({
          loading: true,
        });

        const { query, page} = this.state;
        const {totalHits, hits} = await fetchImages(query, page);

        this.setState(prev =>({
        images: [...prev.images, ...hits],
        loadMore:  this.state.page < Math.ceil(totalHits / 12), 
             
        }))
        
        if (totalHits === 0) {
          toast.error(`Sorry, there are no images matching your search query. Please try again.`);
          this.setState({ loading: false });
          return;
        };

        if (page === 1) {          
          toast.success(`Hooray! We found ${totalHits} for you.`) 
        };
               
        if (this.state.page >= Math.ceil(totalHits / 12)) {
          toast('You`ve reached the end of search results.', { icon: '🎨' });
        };
        
      } catch (error) {
        toast.error('Error while fetching images. Please try again.');
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }));
  };

   render() {
    const {images, loading} = this.state;
 
      return (
        <MainContainer>
          <SearchBar onSubmit= {this.handleChangeQuery}/>
          {this.state.images.length > 0 && 
          <ImageGallery images={images}/>}    
          {loading && <Loader /> }      
          {this.state.loadMore > 0 &&  <LoadMoreBtn onLoadMore={this.handleLoadMore}/>}
          <Toaster position="top-right" />
        </MainContainer>
      )
  };
};

