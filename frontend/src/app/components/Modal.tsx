'use client';
import React from 'react';
// @ts-ignore
import Modal from 'react-modal';
import { setModal } from '@/features/global/globalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import CreateJobForm from './CreateJobForm';
const customStyles = {
  content: {
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#app');

const DashboardModal = () => {
  const { isModal, modalType } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(setModal(false));
  };
  return (
    <Modal
      isOpen={isModal && modalType ? true : false}
      onRequestClose={onModalClose}
      style={customStyles}
      contentLabel="Modal">
      {modalChildren[modalType]}
    </Modal>
  );
};

//Tells typescript that our key will be a string, otherwise it wont work.
interface ModalChildren {
  addjob: React.JSX.Element;
  [key: string]: any;
}

const modalChildren: ModalChildren = {
  addjob: <CreateJobForm />,
};

export default DashboardModal;
