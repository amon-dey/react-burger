import ReactDOM from 'react-dom';
import { FC, useRef, useEffect } from 'react';
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
        console.log(event)
        event.stopPropagation();
        props.closeModal()
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
      };

    const handleKeyboardPress = (event: React.KeyboardEvent<HTMLElement>) => {
        console.log(event)
    };

    useEffect(() => {
        if (childRef.current) {
            console.log(childRef.current)
            childRef.current.focus();
        }
    }, []);

    return ReactDOM.createPortal(
        <div className={styles.modaloverlay} onClick={handleClickOutside}
        onKeyDown={handleKeyboardPress} onKeyUp={handleKeyboardPress} onKeyPress={handleKeyboardPress}
            ref={childRef}
          >
            <Modal closeModal={props.closeModal} showModal={props.showModal} headerText={props.headerText} >
                {props.children}
            </Modal>
        </div>,
        modalRoot
    );
}

export default ModalOverlay