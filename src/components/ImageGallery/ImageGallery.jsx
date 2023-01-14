import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Gallery } from './ImageGallery.styled';
import { getImages } from 'components/Api/Api';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  succes: 'succes',
  error: 'error',
};

export const ImageGallery = ({page, searchImages, onStatusChange, onRecordingImagesList, onWriteTotalHits, children}) => {
  const [imagesList, setImagesList] = useState([]);

  useEffect(() => {
    if (!searchImages) {
      return;
    }
    onStatusChange(STATUS.loading);

    async function imagesCatch() {
      try {
        const data = await getImages(searchImages, page);
        if (data.hits.length === 0) {
          toast.warn(`Sorry! We didn't find anything, change your request`);
          return;
        }
        setImagesList(data);
        onRecordingImagesList(data.hits);
        onWriteTotalHits(data.totalHits);
        onStatusChange(STATUS.succes);
      } catch (error) {
        onStatusChange(STATUS.error);
        toast.error('Opps! Something went wrong');
      }
    }
    imagesCatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchImages]);

  useEffect(() => {
    if (imagesList.totalHits) {
      toast.success(`Hooray! We found ${imagesList.totalHits} images.`);
    }
  }, [imagesList.totalHits]);

  return <>{imagesList && <Gallery>{children}</Gallery>}</>;
};

ImageGallery.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  onRecordingImagesList: PropTypes.func.isRequired,
  onWriteTotalHits: PropTypes.func.isRequired,
  searchImages: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};