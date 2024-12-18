import styles from './styles.module.css'

export const ModalOverlay = (props: {closeModal: () => void}) => {
    return (
        <div className={styles.modaloverlay} onClick={props.closeModal}></div>
    )
}

export default ModalOverlay