'use client';
import React from 'react';
// @ts-ignore
import Modal from 'react-modal';
import { setModal, setModalType } from '@/features/global/globalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import CreateJobForm from './CreateJobForm';
import DisplayJob from './EditJob';
import EditJob from './EditJob';
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

//Tells typescript that our key will be a string, otherwise it wont work.
interface ModalChildren {
  addjob: React.JSX.Element;
  editjob: React.JSX.Element;
  [key: string]: any;
}

const DashboardModal = () => {
  const { isModal, modalType } = useSelector(
    (state: RootState) => state.global
  );
  const { selectedJob } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();
  const onModalClose = () => {
    dispatch(setModal(false));
    dispatch(setModalType(''));
  };

  const modalChildren: ModalChildren = {
    addjob: <CreateJobForm />,
    editjob: <EditJob id={selectedJob} />,
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

export default DashboardModal;
