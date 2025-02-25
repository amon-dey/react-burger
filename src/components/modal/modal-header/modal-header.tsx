
import { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
    closeModal: () => void;
    title?: string;
    noClosable?: boolean;
};

import styles from './styles.module.css';

export const ModalHeader: FC<Props> = (props: Props) => {
    return (
        <div className={styles.header}>
            <a className="text text_type_main-large">{props.title}</a>
            {
                !!props.noClosable === false &&
                <CloseIcon type="primary" onClick={props.closeModal} className={styles.headerclose} />
            }
        </div>
    );
};

export default ModalHeader;