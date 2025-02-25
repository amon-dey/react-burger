import { FC } from 'react';

import styles from './styles.module.css'

type Props = {
    title: string
}

<p className="text text_type_main-medium">
    The quick brown fox jumps over the lazy dog.
</p>
export const Spinner: FC<Props> = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
            <p className="text text_type_main-medium mt-10 mb-10">
                {props.title}
            </p>
        </div>
    );
};

export default Spinner;