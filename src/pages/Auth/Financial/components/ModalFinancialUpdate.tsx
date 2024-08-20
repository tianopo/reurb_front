import { Modal } from "src/components/Modal/Modal";
import { IFinancialUpdateDto } from "src/interfaces/models";

interface IModalFinancialUpdate {
  onClose: () => void;
  financial?: IFinancialUpdateDto;
}

export const ModalFinancialUpdate = ({ onClose, financial }: IModalFinancialUpdate) => {
  return <Modal onClose={onClose}>h</Modal>;
};
