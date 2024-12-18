import styles from "./styles.module.css"

type Props = {
    name: string
    val: number
}

const formatNutrition = (val: number): string => {
    let valFloat = (val / 10).toString().replace(".", ",")
    if (!valFloat.includes(',')) {
        valFloat += ",0"
    }
    return valFloat
}

export const NutritionValue = (props: Props) => {
    return (
        <li className={`${styles.block} mr-5`}>
            {props.name}
            <p className="text_type_digits-default mt-2">
                {formatNutrition(props.val)}
            </p>
        </li>
    )
}
export default NutritionValue