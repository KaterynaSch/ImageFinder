import { ImageGalleryList } from "./ImageGallery.styled";
import { GalleryItem } from "components/GalleryItem/GalleryItem";

export const ImageGallery = ({images}) => {
    return(
        <ImageGalleryList >
            {images.map(image => 
                <GalleryItem key={image.id} image={image} />                
            )} 
        </ImageGalleryList>
    )
};
