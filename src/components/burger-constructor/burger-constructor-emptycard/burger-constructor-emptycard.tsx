import { FC } from 'react';

import styles from './styles.module.css';

type PropsEmpty = {
    cardType?: "top" | "bottom" | undefined,
};

export const EmptyItem: FC<PropsEmpty> = ({ cardType: cardType }) => {

    let className = `constructor-element ml-4 text text_type_main-medium text_color_inactive ${styles.fix}`;
    if (cardType === "top") {
        className += " constructor-element_pos_top";
    }
    if (cardType === "bottom") {
        className += " constructor-element_pos_bottom";
    }

    return (
        <li className={`${styles.li} p-4 `}>
            <div className={className}>
                <div className={styles.empty_list}>
                    Перетащи сюда {!cardType ? "начинку или соус" : "Булку"}
                </div>
            </div>
        </li>
    );
};