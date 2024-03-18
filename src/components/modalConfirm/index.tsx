import React, { useContext, useState, FC } from "react";
import { Button, Modal,} from "antd";

type Props = {
    isModalOpen: boolean 
    setIsModalOpen: (isOpen: boolean) => void
}



export const ModalConfirm:FC<Props> = ({isModalOpen, setIsModalOpen}) => {
    

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button key="submit" type="primary"  onClick={handleOk}>
            Yes
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  )
}
