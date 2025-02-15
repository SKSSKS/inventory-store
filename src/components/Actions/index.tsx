import styles from "./style.module.css";
import Image from "next/image"

interface Props {
  isAdminUser: boolean;
  isDisabledProduct: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onDisable: () => void;
}

export const Actions = (props: Props) => {
  const { isAdminUser, isDisabledProduct, onEdit, onDelete, onDisable } = props;
  const actionClass = isAdminUser ? styles.action : styles.disabledAction;

  return (
    <div className={styles.actions}>
      <span className={actionClass}>
        <Image
          width={24}
          height={24}
          onClick={(isAdminUser && !isDisabledProduct) ? onEdit : undefined}
          alt="Edit Product"
          src={(isAdminUser && !isDisabledProduct) ? "/edit-50.png" : "/disabled-edit-50.png"}
        />
      </span>
      <span className={actionClass}>
        <Image
          width={24}
          height={24}
          alt="View Product"
          onClick={isAdminUser ? onDisable : undefined}
          src={(isAdminUser && !isDisabledProduct) ? "/view-50.png" : "/hide-50.png"}
        />
      </span>
      <span className={actionClass}>
        <Image
          width={24}
          height={24}
          onClick={isAdminUser ? onDelete : undefined}
          alt="Delete Product"
          src={isAdminUser ? "/delete-48.png" : "/delete-50.png"}
        />
      </span>
    </div>
  )
}
