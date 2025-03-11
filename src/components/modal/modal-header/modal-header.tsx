
import { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
    closeModal: () => void;
    title?: string;
    noClosable?: boolean;
    modalHeaderStyle: string
};

import styles from './styles.module.css';

export const ModalHeader: FC<Props> = (props: Props) => {
    return (
        <div className={styles.header}>
            <a className={props.modalHeaderStyle}>{props.title}</a>
            {
                !!props.noClosable === false &&
                <div data-test="modal_close_buttin" onClick={props.closeModal} className={styles.headerclose}>
                    <CloseIcon type="primary" />
                </div>
            }
        </div>
    );
};

export default ModalHeader;