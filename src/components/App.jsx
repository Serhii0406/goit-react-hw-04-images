import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import { AppStyled } from './App.styled';
import { Loader } from './Loader';
import { ButtonLoadMore } from './Button';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [imagesList, setImagesList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [totalhits, setTotalhits] = useState(0);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = search => {
    setPage(1);
    setSearch(search);
    setImagesList(null);
  };

  const recordingImagesList = data => {
    if (!imagesList) {
      setImagesList(data);
      return;
    }
    if (imagesList) {
      setImagesList(prevImagesList => [...prevImagesList, ...data]);
      return;
    }
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        page={page}
        searchImages={search}
        onStatusChange={setStatus}
        onRecordingImagesList={recordingImagesList}
        onWriteTotalHits={setTotalhits}
      >
        {imagesList?.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image.webformatURL}
            onToggle={toggleModal}
            writeLargeImage={setLargeImage}
            bigImg={image.largeImageURL}
          ></ImageGalleryItem>
        ))}
      </ImageGallery>
      {status === 'loading' && <Loader />}
      <ToastContainer autoClose={2000} />
      {showModal && <Modal largeImg={largeImage} onToggle={toggleModal} />}
      {imagesList && status !== 'loading' && imagesList.length < totalhits && (
        <ButtonLoadMore loadMore={loadMore} />
      )}
    </AppStyled>
  );
};