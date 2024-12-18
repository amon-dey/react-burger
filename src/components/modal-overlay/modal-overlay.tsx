import ReactDOM from 'react-dom';
import { FC, useRef, useEffect, useCallback } from 'react';
import { Modal } from "../modal/modal"

type Props = {
    children: React.ReactNode
    closeModal: () => void
    showModal: boolean
    headerText?: string
}

import styles from './styles.module.css'

export const ModalOverlay: FC<Props> = (props: Props) => {
    const modalRoot = document.getElementById("burgermodal");
    if (modalRoot === null) { return (<div />); }

    const childRef = useRef<HTMLInputElement>(null);

    const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        props.closeModal()
    }

    const handleEscapeKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            props.closeModal()
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleEscapeKeyDown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeyDown);
        };
    }, []);

    useEffect(() => {
        if (childRef.current) {
            console.log(childRef.current)
            childRef.current.focus();
        }
    }, []);

    return ReactDOM.createPortal(
        <div className={styles.modaloverlay} onClick={handleClickOutside} ref={childRef}>
            <Modal closeModal={props.closeModal} showModal={props.showModal} headerText={props.headerText} >
                {props.children}
            </Modal>
        </div>,
        modalRoot
    );
}

export default ModalOverlay