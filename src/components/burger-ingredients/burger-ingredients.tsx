import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientItemTypes, ingredientItemGroupName } from "../../utils/types";
import { BurgerIngredientsGroup } from "./burger-ingredients-group/burger-ingredients-group";
import { Modal } from "../modal/modal";
import { fetchIngredients } from "../../services/thunks/burgeringredients";
import { resetSelected } from '../../services/burger-ingredients/slice';
import { IngredientDetails } from "./ingredient-details/ingredient-details";
import { AppDispatch, RootState } from './../../services/store';
import { getVisibleGroup, groupBy } from "./utils";
import styles from './styles.module.css';

export const BurgerIngredients = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isError, isLoading, ingredients, selectedIngredient } = useSelector((state: RootState) => state.burgerIngredients);

    const [currentActiveTab, setCurrentActiveTab] = useState(`${ingredientItemTypes[0].type}`);

    const refGroups = useRef<HTMLDivElement>(null);
    const arrayOfGroupRefs = Array.from(
        { length: ingredientItemTypes.length },
        // eslint-disable-next-line react-hooks/rules-of-hooks
        () => useRef<HTMLDivElement>(null),
    );

    const groupedItems = useMemo(() => {
        if (!ingredients) return [];
        const groupedByGrade = groupBy(ingredients, (item) => String(item.type));
        return Object.entries(groupedByGrade);
    }, [ingredients]);

    //грузим ингредиенты
    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    //отрабатываем события скрола в списке ингредиентов
    useEffect(() => {
        const refGroupCopy = refGroups.current;
        if (!refGroupCopy) return;
        const handleScroll = () => {
            setCurrentActiveTab(ingredientItemTypes[getVisibleGroup(arrayOfGroupRefs)].type);
        };

        refGroups.current.addEventListener('scroll', handleScroll);
        return () => {
            if (refGroupCopy) {
                refGroupCopy.removeEventListener('scroll', handleScroll);
            }
        };
    }, [arrayOfGroupRefs]);

    // скролим до необходимой группы ингредиентов
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

    if (isError) {
        return <section className={`${styles.row} mb-10`}>
            <p className={`${styles.isloading} text text_type_main-large m-10`}>
                Печалька, ингредиенты не загрузились
            </p>
        </section >;
    }

    if (isLoading) {
        return <section className={`${styles.row} mb-10`}>
            <p className={`${styles.isloading} text text_type_main-large`}>
                Загрузка списка ингредиентов...</p>
        </section>
    }

    const handleCloseModal = () => {
        dispatch(resetSelected());
    }

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
                            <BurgerIngredientsGroup
                                ref={arrayOfGroupRefs[index]}
                                group={type[0]}
                                ingredients={type[1]}
                                key={type[0]} />
                    )
                }
            </div>
            {
                selectedIngredient && (
                    <Modal closeModal={handleCloseModal} headerText="Детали ингедиента">
                        <IngredientDetails />
                    </Modal>
                )
            }
        </section>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(BurgerIngredients);