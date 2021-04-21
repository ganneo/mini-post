import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

interface ModalProps {
  active: boolean;
  modalClickHandler: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const classList = [classes.Modal];

  if (props.active) {
    classList.push(classes.Show);
  }

  return (
    <React.Fragment>
      <div className={classList.join(" ")}>
        {props.children}
        <button
          type="button"
          className={classes.CloseBtn + " close mr-3 mt-3 text-danger"}
          aria-label="Close"
          onClick={props.modalClickHandler}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <Backdrop show={props.active} clickEvent={props.modalClickHandler} />
    </React.Fragment>
  );
};

export default Modal;
