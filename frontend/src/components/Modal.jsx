import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Modal = ({ onClose, onConfirm, children }) => {
  return (
    <Dialog open={true} size="xs" handler={onClose}>
      <DialogHeader>
        <p className="text-red-600">⚠️ Atención ⚠️</p>
      </DialogHeader>
      <DialogBody className="text-black">{children}</DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="blue-gray"
          onClick={onClose}
          className="mr-1 text-black"
        >
          <span>Cancelar</span>
        </Button>
        <Button
          variant="gradient"
          color="red"
          onClick={onConfirm}
          className="text-black"
        >
          <span>Confirmar</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
