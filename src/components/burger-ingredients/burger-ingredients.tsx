import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientItem, ingredientItemTypes, ingredientItemGroupName } from "../../utils/types";
import { BurgerIngredientsGroup } from "./burger-ingredients-group/burger-ingredients-group";

import { getVisibleGroup, groupBy } from "./utils";
import styles from './styles.module.css';

type Props = {
    ingredients: ingredientItem[];
};


export const BurgerIngredients = (props: Props) => {
    const [currentActiveTab, setCurrentActiveTab] = useState(`${ingredientItemTypes[0].type}`);

    const groupedItems = useMemo(() => {
        const groupedByGrade = groupBy(props.ingredients, (item) => String(item.type));
        return Object.entries(groupedByGrade);
    }, [props.ingredients]);

    const refGroups = useRef<HTMLDivElement>(null);
    const arrayOfGroupRefs = Array.from(
        { length: ingredientItemTypes.length },
        // eslint-disable-next-line react-hooks/rules-of-hooks
        () => useRef<HTMLDivElement>(null),
    );

    useEffect(() => {
        const refGroupCopy = refGroups.current;
        if (!refGroupCopy) return;
        const handleScroll = () => {
            const min = getVisibleGroup(arrayOfGroupRefs);
            setCurrentActiveTab(ingredientItemTypes[min].type);
        };

        refGroups.current.addEventListener('scroll', handleScroll);
        return () => {
            if (refGroupCopy) {
                refGroupCopy.removeEventListener('scroll', handleScroll);
            }
        };
    }, [arrayOfGroupRefs]);

    const handleTabClick = useCallback((tabItemType: string) => {
        const scrollToGroup = (tabItemType: string) => {
            const currentTabNumber = ingredientItemTypes.findIndex(item => item.type === tabItemType);
            const groupRef = arrayOfGroupRefs[currentTabNumber].current;

            if (groupRef !== null) {
                groupRef.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        };
        setCurrentActiveTab(tabItemType);
        scrollToGroup(tabItemType);
    }, [arrayOfGroupRefs]);

    return (
        <section className={`${styles.row} mb-10`}>
            <p className="text text_type_main-large mt-10 mb-5">
                Собери бургер
            </p>
            <div className={`${styles.tab_block} mb-10}`}>
                {
                    ingredientItemTypes.map(
                        (ingredient: ingredientItemGroupName) => (
                            <Tab value={ingredient.type} active={currentActiveTab == ingredient.type} onClick={() => handleTabClick(ingredient.type)} key={ingredient.type}>
                                {ingredient.translated_name}</Tab>
                        ))
                }
            </div>
            <div className={styles.grouped_items} ref={refGroups}>
                {
                    groupedItems.map(
                        (type, index) =>
                            <BurgerIngredientsGroup ref={arrayOfGroupRefs[index]} group={type[0]} ingredients={type[1]} key={type[0]} />
                    )
                }
            </div>
        </section>
    );
};

export default BurgerIngredients;
