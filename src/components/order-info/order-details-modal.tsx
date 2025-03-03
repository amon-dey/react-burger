import { Modal } from "../modal/modal";

import { useModal } from "../../hooks/useModal";
import { useLocation, useNavigate } from "react-router-dom";
import OrdersDetails from "./order-details";
import { useParams } from "react-router-dom";

export const OrdersDetailsModal = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { closeModal } = useModal();
    const handleCloseModal = () => {
        if (location.state && location.state.from) {
            const to = location.state.from.pathname
            navigate(to);
        } else {
            navigate(-1);
        }
        closeModal();
    }

    const { number } = useParams()
    return (
        <Modal closeModal={handleCloseModal} title={`#${number}`} modalHeaderStyle="text text_type_digits-default">
            <OrdersDetails />
        </Modal>
    )
}
export default OrdersDetailsModal