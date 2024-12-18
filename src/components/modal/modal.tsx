
import { FC } from 'react';
import { ModalHeader } from './modal-header/modal-header'

type Props = {
    children: React.ReactNode
    closeModal: () => void
    showModal: boolean
    headerText?: string
}

import styles from './styles.module.css'

export const Modal: FC<Props> = (props: Props) => {

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    }

    return (
        <div className={`${styles.modal}`} onClick={handleClick}>
            <div className="mt-10 mr-10 ml-10">
                <ModalHeader closeModal={props.closeModal} headerText={props.headerText} />
                {props.children}
            </div>
        </div>
    );
}
export default Modal