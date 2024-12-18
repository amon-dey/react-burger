import { FC } from 'react';
import styles from './styles.module.css'

type Props = {
    closeModal: () => void
}

export const ModalOverlay: FC<Props>= (props: Props) => {
    return (
        <div className={styles.modaloverlay} onClick={props.closeModal}></div>
    )
}

export default ModalOverlay