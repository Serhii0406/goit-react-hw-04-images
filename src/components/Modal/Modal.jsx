import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modalwindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImg, onToggle }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDowm = event => {
    // console.log('срабатывает');
    if (event.code === 'Escape') {
      onToggle();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDowm);
    return () => {
      window.removeEventListener('keydown', handleKeyDowm);
    };
  }, [handleKeyDowm]);

  const handleClose = event => {
    if (event.target === event.currentTarget) {
      onToggle();
    }
  };

  return createPortal(
    <Overlay onClick={handleClose}>
      <Modalwindow>
        <img src={largeImg} alt="" />
      </Modalwindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onToggle: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};