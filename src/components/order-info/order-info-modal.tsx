import { Modal } from "../modal/modal";

import { useModal } from "../../hooks/useModal";
import { useLocation, useNavigate } from "react-router-dom";
import OrderInfo from "./order-info";
import { useParams } from "react-router-dom";

export const OrderInfoModal = () => {
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
    if (location.state && location.state.from)
        return (
            <Modal closeModal={handleCloseModal} title={`#${number}`} modalHeaderStyle="text text_type_digits-default">
                <OrderInfo />
            </Modal>
        )
    else {
        return
    }
}
export default OrderInfoModal