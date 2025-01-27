import { FC } from 'react';
import styles from './styles.module.css';

interface Props {
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children: React.ReactNode;
}

const CustomTab: FC<Props> = ({ active, value, children, onClick }) => {
    const textClass = active ? styles.tab_type_current : "text text_type_main-default text_color_inactive";

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick(value);
        }
    };

    return (
        <div className={`${styles.tab} ${textClass} active`} onClick={handleClick}>
            {children}
        </div>
    );
};

export default CustomTab;