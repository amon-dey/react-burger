import { Modal } from "../../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { useModal } from "../../../hooks/useModal";

export const IngredientDetailsModal = () => {
    const { closeModal } = useModal();
    return (
        <Modal closeModal={closeModal}>
            <IngredientDetails />
        </Modal>
    )
}
export default IngredientDetailsModal