import React from "react";
import styles from "./FotoModal.module.css"

export function FotoModal(props) {
    return(
        <div className={styles.container}>
            <div className={styles.exitButton} onClick={props.closeModal}>
                &#10006;
            </div>
            <img className={styles.image} src={props.linkFoto} alt="FOTO"/>
        </div>
    )
}