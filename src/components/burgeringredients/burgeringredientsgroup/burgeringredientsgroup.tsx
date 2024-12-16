import { FC } from 'react';
import BurgerIngredientsItem from '../burgeringredientsitem/burgeringredientsitem'
import { Ingredient, ingredientTypes } from "../../../utils/types"

import styles from './styles.module.css';

type Props = {
    group: string
    items: Ingredient[];
}

const translateIngridentType = (dataname: string): string => {
    const foundItem = ingredientTypes.find(item => item.type === dataname);
    return foundItem ? foundItem.translated_name : "не известный тип"
}

export const BurgerIngredientsGroup: FC<Props> = (props: Props) => {
    return (
        <div>
            <p className="text text_type_main-large">
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