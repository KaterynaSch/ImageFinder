import  { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { MainContainer } from './MainContainer.styled';
import { ImageGallery } from './Gallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { fetchImages } from './Api/Api';
import { Loader } from './Loader/Loader';
import { SearchBar } from './SearchBar/SearchBar';

export const App =() => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(0)

  const handleChangeQuery = (inputValue) => {      
    setQuery(inputValue);
    setPage(1);
    setImages([]);   
  };

  useEffect(() => {
    if (query === ""){
        return;
    };
    setLoading(true);
    async function getImages(){      
      try {     

        const {totalHits, hits} = await fetchImages(query, page);  
        setImages(prevState => [...prevState,...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));         
        
        if (totalHits === 0) {
          toast.error(`Sorry, there are no images matching your search query. Please try again.`);
          setLoading(false);
          return;
        };
  
        if (page === 1) {          
          toast.success(`Hooray! We found ${totalHits} for you.`) 
        };
               
        if (page >= Math.ceil(totalHits / 12)) {
          toast('You`ve reached the end of search results.', { icon: '🎨' });
        };
        
      } catch (error) {
        toast.error('Error while fetching images. Please try again.');
      } finally {
        setLoading(false);
      }
      
    };
    getImages();
  }, [query, page]);

  
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <MainContainer>
      <SearchBar onSubmit= {handleChangeQuery}/>
      {images.length > 0 && 
      <ImageGallery images={images}/>}    
      {loading && <Loader /> }      
      {loadMore > 0 &&  <LoadMoreBtn onLoadMore={handleLoadMore}/>}
      <Toaster position="top-right" />
    </MainContainer>
  )
};
