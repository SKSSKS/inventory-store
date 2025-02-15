import styles from "./style.module.css";

interface Props {
    name: string;
    category: string;
    price: string;
    quantity: number;
    value: string
}

export const ProductTableRow = (props: Props) => {
    const { name, category, price, quantity, value } =  props;

    return (
        <>
            <span className={styles.tableColumn}>
                <span className={styles.tableName}>{name}</span>
            </span>
            <span className={styles.tableColumn}>
                <span className={styles.tableValue}>{category}</span>
            </span>
            <span className={styles.tableColumn}>
                <span className={styles.tableValue}>{price}</span>
            </span>
            <span className={styles.tableColumn}>
                <span className={styles.tableValue}>{quantity}</span>
            </span>
            <span className={styles.tableColumn}>
                <span className={styles.tableValue}>{value}</span>
            </span>
        </>
    )
}
