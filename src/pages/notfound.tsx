import { FC } from "react";
import { Button, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const NotFound: FC = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/", { replace: true })
    }

    return (
        <div className={styles.container}>
            <p className="text text_type_main-large p-10">
                Страница не найдена
            </p>
            <Button htmlType="button" type="primary" size="medium"
                onClick={handleOnClick}>
                Хочу есть
            </Button>
        </div>
    )
}
export default NotFound;
