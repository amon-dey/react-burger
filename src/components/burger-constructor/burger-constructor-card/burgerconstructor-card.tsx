import { FC, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItemType } from "../../../utils/types";
import { useDrag, useDrop } from "react-dnd";
import { removeIngredient } from "../../../services/burger-constructor/burger-constructor-ingredients";
import { useDispatch } from './../../../services/store';
import { swapIngredient, hoverDropIndex } from "../../../services/burger-constructor/burger-constructor-ingredients";
import type { Identifier, XYCoord } from 'dnd-core';
import styles from './styles.module.css';

type Props = {
    ingredient: IngredientItemType,
    cardType?: "top" | "bottom" | undefined,
    index: number;
};

interface DragItem {
    index: number;
    _id: string;
}

export const BurgerConstructorCard: FC<Props> = ({ ingredient: ingredient, cardType: cardType, index: index }) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);

    let bunLocationText: string = ingredient !== null ? ingredient.name : "";

    const dragVisible = cardType === undefined ? styles.default : styles.hidden;
    const isLocked = cardType !== undefined ? true : undefined;
    if (cardType === "top") {
        bunLocationText += "\n(верх)";
    }
    if (cardType === "bottom") {
        bunLocationText += "\n(низ)";
    }

    const [isDragging, dragRef] = useDrag({
        type: "burger-ingredients",
        item: { ingredient },
        collect(monitor) {
            return {
                isDragging: monitor.isDragging(),
            }
        }
    });

    const [{ handlerId, isHover }, dropRef] = useDrop<DragItem, void, { handlerId: Identifier | null, isHover: boolean; }>({
        accept: "burger-ingredients",
        collect(monitor) {
            return {
                isHover: monitor.isOver({ shallow: true }),
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            dispatch(hoverDropIndex(hoverIndex));
        },
        drop(item) {
            dispatch(swapIngredient(item));
        },
    });

    const hoverClass = isHover ? styles.ishover : '';
    const opacityClass = isDragging.isDragging ? styles.isopacity : '';

    if (!cardType) {
        dragRef(dropRef(ref));
    }

    const handleClose = () => {
        dispatch(removeIngredient(ingredient));
    };

    return (
        <li className={`${styles.li} p-4 ${hoverClass} ${opacityClass}`} ref={ref} data-handler-id={handlerId}>
            <DragIcon type="primary" className={dragVisible} />
            <ConstructorElement
                type={cardType}
                text={bunLocationText}
                thumbnail={ingredient.image}
                price={ingredient.price}
                isLocked={isLocked}
                extraClass={styles.nowrap}
                handleClose={handleClose}
            />
        </li>
    );
};

export default BurgerConstructorCard;
