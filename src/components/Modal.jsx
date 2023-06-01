import React from "react";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";

const CustomModal = (props) => {
  return (
    <BootstrapModal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title id="contained-modal-title-vcenter">
          Modal heading
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default CustomModal;
