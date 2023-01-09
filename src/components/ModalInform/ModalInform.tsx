import React from "react";
import "../ModalPurchase/modalPurchase.scss";
import Modal from "react-modal";
import { useDispatch, action, useSelector, RootState } from "store";
import { ButtonModalClose } from "components";

export const ModalInform = () => {
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={useSelector((state: RootState) => state.modalInform)}
      portalClassName="modal__portal"
      overlayClassName="modal__overlay"
      className="modal__content"
      onRequestClose={() => {
        dispatch(action.showModalInform(false));
      }}
      contentLabel="Purchase Modal"
      ariaHideApp={false}
    >
      <div className="modal__body">
        <h2 className="modal__title">Success</h2>
        <ButtonModalClose
          onClick={() => {
            dispatch(action.showModalInform(false));
          }}
        />
        <p className="modal__message">
          Thank you. Оrder successfully completed.
        </p>
      </div>
    </Modal>
  );
};
