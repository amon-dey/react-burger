import { FC } from 'react';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item'
import { ingredientItem, ingredientItemTypes } from "../../../utils/types"

import styles from './styles.module.css';

type Props = {
    group: string
    items: ingredientItem[];
}

const translateIngridentType = (dataname: string): string => {
    const foundItem = ingredientItemTypes.find(item => item.type === dataname);
    return foundItem ? foundItem.translated_name : "не известный тип"
}

export const BurgerIngredientsGroup: FC<Props> = (props: Props) => {
    return (
        <div>
            <p className="text text_type_main-large mb-6">
                {translateIngridentType(props.group)}
            </p>
            <ul className={styles.ul}>
                {props.items.map((item) => (
                    <li key={item._id} className='li'>
                        <BurgerIngredientsItem item={item}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default BurgerIngredientsGroup