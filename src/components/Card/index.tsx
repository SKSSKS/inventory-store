import Image from "next/image";
import styles from "./style.module.css";

interface Props {
    title: string;
    value: number;
    iconPath: string;
}

export const Card = (props: Props) => {
    const {title, value, iconPath} = props;
    return (
        <div className={styles.card}>
            <Image
                aria-hidden
                src={iconPath}
                alt="Cart"
                width={32}
                height={32}
            />
            <div>
                <span className={styles.title}>{title}</span>
                <span className={styles.value}>{value}</span>
            </div>
        </div>
    );
}
