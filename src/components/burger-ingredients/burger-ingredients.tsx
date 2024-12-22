import { useState, useEffect, useRef, RefObject } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItem, ingredientItemTypes, ingredientItemGroupName } from "../../utils/types"
import { BurgerIngredientsGroup } from "./burger-ingredients-group/burger-ingredients-group"

import { groupBy } from "./utils"
import styles from './styles.module.css';

type Props = {
    data: ingredientItem[];
}

const isElementPartiallyVisible = (element: RefObject<HTMLElement | null>, prevItemsHeight: number) => {
    if (!element.current) return false;
    const rect = element.current.getBoundingClientRect();
    if (rect.top + prevItemsHeight > 0) {
        return true
    }
};

export const BurgerIngredients = (props: Props) => {
    const [currentActiveTab, setCurrentActiveTab] = useState(`${ingredientItemTypes[0].type}`);
    const groupedByGrade = groupBy(props.data, (item) => String(item.type));
    const groupedIng = Object.entries(groupedByGrade);
    const refGroups = useRef<HTMLDivElement>(null);
    const arrayOfGroupRefs = Array.from(
        { length: ingredientItemTypes.length },
        () => useRef<HTMLDivElement>(null),
    );

    useEffect(() => {

        const handleScroll = () => {
            let min = arrayOfGroupRefs.length - 1;
            let heighOffset = 0;
            for (let i = 0; i < arrayOfGroupRefs.length; i++) {
                const item = arrayOfGroupRefs[i];
                if (!item.current) {
                    continue
                }
                if (isElementPartiallyVisible(item, heighOffset)) {
                    if (min > i) {
                        min = i
                    }
                }
                heighOffset = heighOffset + item.current.getBoundingClientRect().height
            }

            setCurrentActiveTab(ingredientItemTypes[min].type)
        };

        if (refGroups.current) {
            refGroups.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (refGroups.current) {
                refGroups.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleTabClick = (tabItemType: string) => {
        
        const focusToCurrentTab = (tabItemType: string) => {
            const currentTabNumber = ingredientItemTypes.findIndex(item => item.type === tabItemType)
            const groupRef = arrayOfGroupRefs[currentTabNumber].current;

            if (groupRef !== null) {
                groupRef.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

        setCurrentActiveTab(tabItemType)
        focusToCurrentTab(tabItemType);
    }

    return (
        <section className={`${styles.row} mb-10`}>
            <p className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>
            <div className={`${styles.tab_block} mb-10}`}>
                {
                    ingredientItemTypes.map(
                        (item: ingredientItemGroupName) => (
                            <Tab value={item.type} active={currentActiveTab == item.type} onClick={() => handleTabClick(item.type)} key={item.type}>
                                {item.translated_name}</Tab>
                        ))
                }
            </div>
            <div className={styles.grouped_items} ref={refGroups}>
                {
                    groupedIng
                        .map(
                            (type, index) =>
                                <BurgerIngredientsGroup ref={arrayOfGroupRefs[index]} group={type[0]} items={type[1]} key={type[0]} />
                        )
                }
            </div>
        </section>
    )
}

export default BurgerIngredients
