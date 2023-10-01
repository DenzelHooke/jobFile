'use client';
import React from 'react';
import Modal from 'react-modal';
import { setModal } from '@/features/global/globalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#app');

const DashboardModal = ({ children }: any) => {
  const { isModal } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(setModal(false));
  };
  return (
    <Modal
      isOpen={isModal}
      onRequestClose={onModalClose}
      style={customStyles}
      contentLabel="Modal">
      {children}
    </Modal>
  );
};

export default DashboardModal;
