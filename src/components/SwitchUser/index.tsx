import React, { ChangeEvent } from "react";
import styles from "./style.module.css";

interface Props {
    isAdminUser: boolean;
    setIsAdminUser: (val: boolean) => void;
} 

export const SwitchUser = (props: Props) => {

    const handleUserChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        props.setIsAdminUser(evt.target.checked)
    }

    return (
        <div className={styles.switchWrp}>
          <span>Admin</span>
          <label className={styles.switch}>
            <input type="checkbox" onChange={handleUserChange} checked={props.isAdminUser}/>
            <span className={styles.slider}></span>
          </label>
          <span>User</span>
        </div>
    )
}
