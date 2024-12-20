
import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalHeader } from './modal-header/modal-header'
import { ModalOverlay } from "../modal-overlay/modal-overlay"

type Props = {
    children: React.ReactNode;
    closeModal: () => void;
    headerText?: string;
}

import styles from './styles.module.css'

export const Modal: FC<Props> = (props: Props) => {
    const modalBurger = document.getElementById("burgermodal");
    if (modalBurger === null) { return (<div />); }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    }

    useEffect(() => {
        const handleEscapeKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                props.closeModal();
            }
        };
        window.addEventListener('keydown', handleEscapeKeyDown);
        return () => {
            window.removeEventListener('keydown', handleEscapeKeyDown);
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={`${styles.modal}`} onClick={handleClick}>
                <div className="mt-10 mr-10 ml-10">
                    <ModalHeader closeModal={props.closeModal} headerText={props.headerText} />
                    {props.children}
                </div>
            </div>
            <ModalOverlay closeModal={props.closeModal} />
        </>,
        modalBurger
    );
}
export default Modal