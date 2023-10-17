
import { ImageGalleryList } from "./ImageGallery.styled"
import { GalleryItem } from "components/GalleryItem/GalleryItem"


export const ImageGallery = ({images}) => {
    return(
        <ImageGalleryList >
            {images.map(item => 
                <GalleryItem key={item.id} image={item} />                
            )} 
        </ImageGalleryList>
    )
};
