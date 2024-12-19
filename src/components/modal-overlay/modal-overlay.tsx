import { FC } from 'react';
import styles from './styles.module.css'

type Props = {
    closeModal: () => void;
}

export const ModalOverlay: FC<Props> = (props: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        props.closeModal();
        event.stopPropagation();
    }

    return (
        <div className={styles.modaloverlay} onClick={handleClick}></div>
    )
}

export default ModalOverlay