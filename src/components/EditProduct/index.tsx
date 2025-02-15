import React, { useState } from "react";
import styles from "./style.module.css";
import { Product } from "@/utils/utilsFunctionAndConst";

interface Props {
  id: number;
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

interface InputGroupProps {
  label: string,
  value: string;
  onChange: (value: string) => void
}

const InputGroup = (props: InputGroupProps) => {
  const { label, value, onChange } = props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value)
  }

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={label} className={styles.label}>{label}</label>
      <input id={label} type="text" className={styles.input} value={value} onChange={handleChange} />
    </div>
  )
}

export const EditProductModal = (props: Props) => {
  const { id, name, onSave, onCancel } = props;
  const priceWithSign = props.price.split("$");
  const onlyPrice = priceWithSign[1] ?? priceWithSign[0]

  const valueWithSign = props.value.split("$");
  const onlyValue = valueWithSign[1] ?? valueWithSign[0]

  const [category, setCategory] = useState(props.category);
  const [price, setPrice] = useState(onlyPrice);
  const [quantity, setQuantity] = useState(props.quantity?.toString());
  const [value, setValue] = useState(onlyValue);

  const handlePriceChange = (priceValue: string) => {
    if (+priceValue >= 0 && typeof (+priceValue) === "number") {
      setPrice(priceValue || "0")
    }
  }

  const handleValueChange = (newValue: string) => {
    if (+newValue >= 0 && typeof (+newValue) === "number") {
      setValue(newValue || "0")
    }
  }

  const handleSaveProduct = () => {
    onSave({
      id,
      name,
      category,
      price: `$${+price}`,
      quantity: +quantity,
      value: `$${+value}`
    })
  }

  return (
    <div className={styles.editProductModal}>
      <div className={styles.modalContent}>
        <span className={styles.crossIcon} onClick={onCancel}>X</span>
        <h6 className={styles.title}>Edit product</h6>
        <div className={styles.productName}>{name}</div>
        <div className={styles.form}>
          <InputGroup label="Category" value={category} onChange={setCategory} />
          <InputGroup label="price" value={price} onChange={handlePriceChange} />
          <InputGroup label="quantity" value={quantity?.toString()} onChange={setQuantity} />
          <InputGroup label="value" value={value} onChange={handleValueChange} />
          <div className={styles.formButtons}>
            <button className={`${styles.button} ${styles.cancel}`} onClick={onCancel}>Cancel</button>
            <button className={`${styles.button} ${styles.save}`} onClick={handleSaveProduct}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
