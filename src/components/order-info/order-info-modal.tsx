import { Modal } from "../modal/modal";

import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import OrderInfo from "./order-info";
import { useParams } from "react-router-dom";

export const OrderInfoModal = () => {
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const handleCloseModal = () => {
        closeModal()
        navigate(-1);
    }
    const { number } = useParams()
    
    return (
        <Modal closeModal={handleCloseModal} title={`#${number}`} modalHeaderStyle="text text_type_digits-default">
            <OrderInfo />
        </Modal>
    )
}
export default OrderInfoModal