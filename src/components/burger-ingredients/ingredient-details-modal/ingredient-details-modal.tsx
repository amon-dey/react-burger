import { Modal } from "../../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { useModal } from "../../../hooks/useModal";
import { useNavigate } from "react-router-dom";

export const IngredientDetailsModal = () => {
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const handleCloseModal = () => {
        closeModal()
        navigate(-1);
    }

    return (
        <Modal closeModal={handleCloseModal} title="Детали ингедиента"
            modalHeaderStyle="text text_type_main-large"
            dataTest="modal_ingredient_details">
            <IngredientDetails />
        </Modal>
    )
}
export default IngredientDetailsModal