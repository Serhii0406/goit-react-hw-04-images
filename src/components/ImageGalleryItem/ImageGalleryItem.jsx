import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  writeLargeImage,
  bigImg,
  onToggle,
  image,
  children,
}) => {
  const toggleModal = () => {
    writeLargeImage(bigImg);
    onToggle();
  };

  return (
    <GalleryItem onClick={toggleModal}>
      <img src={image} alt="" />
      {children}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  onToggle: PropTypes.func.isRequired,
  writeLargeImage: PropTypes.func.isRequired,
  bigImg: PropTypes.string.isRequired,
};