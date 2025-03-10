import { FC, useCallback } from 'react';
import styles from './styles.module.css';

type Props = {
    closeModal: () => void;
};

export const ModalOverlay: FC<Props> = (props: Props) => {
    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            props.closeModal();
            event.stopPropagation();
        }, [props]);

    return (
        <div  data-test="modal_overlay" className={styles.modaloverlay} onClick={handleClick}></div>
    );
};

export default ModalOverlay;